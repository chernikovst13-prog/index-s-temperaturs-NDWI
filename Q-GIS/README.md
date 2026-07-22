
This QGIS Python script processes METEOR-M satellite imagery for the Petrun region (Komi Republic, Russia). It performs automated cloud masking, vegetation filtering, and NDWI (Normalized Difference Water Index) calculation within a 20 km buffer zone around a weather station. The script is designed for batch processing of multiple satellite images and integrates with QGIS for visualization

Key Features

Cloud Masking: Implements a robust northern-region cloud detection algorithm using multiple spectral bands
Vegetation Filtering: Applies land cover mask to isolate shrub vegetation classes (11, 12, 14)
NDWI Calculation: Computes NDWI using bands 2 (green) and 3 (near-infrared)
Buffer Zone Processing: Restricts analysis to a 20 km radius around the weather station
Batch Processing: Handles multiple satellite images automatically
QGIS Integration: Automatically loads processed layers into QGIS project

Input Data
Satellite Images: METEOR-M .tiff files (multispectral with at least 6 bands)
Vegetation Raster: Land cover classification rasters (spbu_{year}.tif)
Buffer Vector: GeoPackage file containing the 20 km buffer polygon

Output Files
Cropped Images: Satellite images masked to show only vegetation within the buffer
NDWI Rasters: Calculated NDWI index for each processed image
CSV Report: Summary table with NDWI values and pixel statistics

Installation and Usage
Place the script in your QGIS Python path or run directly from the QGIS Python console
Configure the file paths in the main() function:
input_rasters: List of METEOR-M .tiff files to process
buffer_gpkg: Path to the buffer GeoPackage file
output_dirs: Directories for cropped images and NDWI rasters
Run the script

Configuration Parameters
<img width="512" height="206" alt="unnamed" src="https://github.com/user-attachments/assets/31148f14-7bbf-4681-8920-c6c6644a4af2" />

Output Format
The script generates a CSV file with the following columns:
Image name
File path
Mean NDWI (within 20 km buffer)
Pixel count
Processing status
Error messages (if any)

Usage Notes
The script automatically checks for the existence of all required files
If no valid NDWI pixels exist, the script continues processing and notes this in the report
All intermediate masks are created in memory; only final results are saved to disk
For correct operation, image names must contain the year in the format Петрунь_2020

Code Structure
Main Functions
_night_cloud_mask_northern()
Implements cloud masking algorithm for northern regions. Uses multi-band analysis with threshold values based on robust statistics (median and MAD).
_read_shrub_mask_aligned()
Reads and aligns vegetation mask to the input image's coordinate system. Extracts shrub vegetation classes (11, 12, 14).
_rasterize_vector_to_mask()
Rasterizes the buffer zone vector layer into a binary mask.
_calculate_ndwi_mean_in_buffer()
Calculates the mean NDWI value within the buffer zone, considering the vegetation mask.
_write_ndwi_raster_in_buffer()
Creates an NDWI raster file with buffer and vegetation masks applied.
process_single_image()
Main function for processing a single image, combining all steps:
Open image and check band availability
Rasterize buffer
Create cloud mask
Align and apply vegetation mask
Crop image
Calculate and save NDWI
main()
Main function for batch processing. Performs:
Check for all input files
Sequential processing of the image list
Statistics collection and output
CSV report saving

Example Usage
<img width="512" height="348" alt="unnamed (1)" src="https://github.com/user-attachments/assets/8d8c7fd8-b372-4b81-a0b0-bc5d6bea66d6" />

Application Context
This script was developed for Earth remote sensing data processing as part of a project to determine vegetation seasons in the Komi Republic. It uses machine learning approaches to predict vegetation growing seasons by analyzing NDWI indices, making it particularly useful when direct temperature data is unavailable due to the lack of local weather stations.

Performance Considerations
The script uses memory-efficient processing with intermediate masks stored in memory
GDAL Warp operations are optimized with multithreading
Cloud detection uses robust statistical methods to handle outliers and varying atmospheric conditions

License and Authorship
This script was developed for processing Earth remote sensing data as part of research on vegetation season determination in the Komi Republic region.

