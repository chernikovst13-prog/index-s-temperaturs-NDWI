// 1. Определение границ исследования (буфер от точки с заданными координатами)
var centerPoint = ee.Geometry.Point([40.7559, 66.5733]); // долгота, широта
var geometry = centerPoint.buffer(10000);

Map.centerObject(geometry, 9.5);
Map.addLayer(geometry, {color: 'black'}, '1. Границы исследования (буфер 100 км)', true);

// ==========================================
// 2. ЗАДАЕМ ВРЕМЕННОЙ ДИАПАЗОН НА ВЕСЬ ГОД
// ==========================================
var startDate = '2022-01-01';
var endDate = '2023-01-01'; // Весь 2025 год (365 дней)

// 3. Функция маскировки только ОБЛАКОВ и ТЕНЕЙ (MODIS state_1km)
function maskModisClouds(image) { 
  var qa = image.select('state_1km'); 
  var cloudBitMask = 1 << 0; 
  var shadowBitMask = 1 << 2; 
  
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
             .and(qa.bitwiseAnd(shadowBitMask).eq(0)); 
             
  return image.updateMask(mask); 
}

// ==========================================
// 4. ПОДГОТОВКА МАСКИ КУСТАРНИКОВ MODIS (MCD12Q1)
// ==========================================
// Класс 6 = Closed Shrublands, Класс 7 = Open Shrublands
var modisLcCollection = ee.ImageCollection('MODIS/061/MCD12Q1').filterDate('2022-01-01', '2022-12-31'); 
var modisLc = modisLcCollection.first().select('LC_Type1');
var shrubMaskModis = modisLc.eq(10).or(modisLc.eq(7));

// ==========================================
// 5. ФУНКЦИЯ РАСЧЕТА NDWI С ЖЕСТКИМ СОХРАНЕНИЕМ ДАТЫ
// ==========================================
var processDailyNdwi = function(image) {
  // Расчет NDWI: (B2 [NIR] - B6 [SWIR]) / (B2 [NIR] + B6 [SWIR])
  var ndwiRaw = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b05']).rename('NDWI');
  
  // Накладываем маску кустарников MODIS
  var ndwiMasked = ndwiRaw.updateMask(shrubMaskModis);
  
  // Метод добавления канала к исходному снимку на 100% сохраняет 'system:time_start'
  return image.addBands(ndwiMasked).select('NDWI');
};

// ==========================================
// 6. СБОРКА И ФИЛЬТРАЦИЯ КОЛЛЕКЦИИ ЗА ВЕСЬ ГОД
// ==========================================
var dailyCollection = ee.ImageCollection('MODIS/061/MOD09GA')
  .filterDate(startDate, endDate)
  .filterBounds(geometry)
  .map(maskModisClouds)
  .map(processDailyNdwi);

var chartOptions = {
  title: 'Суточный ход NDWI кустарников MODIS за 20xx год',
  hAxis: {
    title: 'Дата',
    format: 'MMM yyyy',
    gridlines: {count: 12}
  },
  vAxis: {
    title: 'Среднее значение NDWI по буферу',
    viewWindow: {min: -0.7, max: 0.7}
  },
  lineWidth: 1.5,
  pointSize: 2, 
  colors: ['#4285F4'], // Синяя линия для MODIS
  legend: {position: 'none'}
};

var ndwiTimeSeries = ui.Chart.image.series({
  imageCollection: dailyCollection,
  region: geometry,
  reducer: ee.Reducer.mean(), // Усреднение пикселей кустарников внутри 100-км буфера
  scale: 500,                 // Разрешение MODIS
  xProperty: 'system:time_start'
}).setChartType('LineChart')
  .setOptions(chartOptions);

print('--- РЕЗУЛЬТАТЫ СУТОЧНОГО МОНИТОРИНГА ЗА 20xx ГОД ---');
print(ndwiTimeSeries);

// Дополнительно: выведем маску кустарников на карту для проверки их наличия в буфере
Map.addLayer(shrubMaskModis.updateMask(shrubMaskModis).clip(geometry), {palette: ['blue']}, 'Карта кустарников MODIS в буфере');
