MODIS Shrub NDWI Monitoring (Google Earth Engine)

This Google Earth Engine (GEE) JavaScript script is designed for the automated collection and processing of MODIS satellite imagery. The script calculates the Normalized Difference Water Index (NDWI) for shrublands within a specified radius from a target point. 

The resulting daily time series are ideal for analyzing phenological changes, determining the exact start and end dates of vegetation seasons, and can serve as features for machine learning predictive models. By default, the analysis is configured for the area around the Petrun weather station (Komi Republic, Russia).

Key Features

Automated Cloud Masking:** Uses the `state_1km` quality band to mask clouds and shadows.
Target Vegetation Filtering:** Applies the MODIS Land Cover classification to strictly isolate shrub vegetation (Class 10 — Closed Shrublands and Class 7 — Open Shrublands).
NDWI Calculation:** Utilizes the Near-Infrared (NIR, Band 2) and Shortwave Infrared (SWIR, Band 5) bands.
Spatial Analysis:** Restricts calculations to a buffer zone (default is a 10 km radius around the specified coordinates).
Visualization:** Generates an interactive annual chart of the daily NDWI variation and displays map layers (buffer boundary, shrub mask) in the GEE interface.

Data Sources

MOD09GA (Daily Surface Reflectance):** Daily surface spectral reflectance data (500 m resolution).
MCD12Q1 (Land Cover Type):** Annual global land cover classification.

Installation and Usage

1. Open the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Sign in with your Google account.
3. Copy the script code below and paste it into the central editor window.
4. Modify the basic configuration parameters at the beginning of the script if necessary:
   - `centerPoint`: central point coordinates (currently `[40.7559, 66.5733]`).
   - `geometry`: buffer radius (currently `10000` meters).
   - `startDate` / `endDate`: time range (currently set to the entire year of 2022).
5. Click the **Run** button in the top panel.
6. The interactive time series chart will appear in the **Console** panel (on the right), and the buffer and vegetation mask layers will be displayed on the map.

NDWI Value Interpretation

| NDWI Value | Condition Interpretation |
| :--- | :--- |
| **> 0.2** | High vegetation moisture / healthy shrubs (peak growing season). |
| **0.0 ... 0.2** | Moderate moisture. |
| **-0.2 ... 0.0** | Dry vegetation or sparse cover (start/end of the season). |
| **< -0.2** | Bare soil, very dry conditions, or snow cover. |
