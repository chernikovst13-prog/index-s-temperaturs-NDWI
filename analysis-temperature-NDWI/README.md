This project is designed to process temperature graphs and determine the start dates of vegetation seasons based on temperature
threshold values. Additionally, it analyzes NDWI (Normalized Difference Water Index) graphs to estimate vegetation season
timelines.

To run the analysis successfully, input files must follow specific formats:

1. Temperature Input Format (`.txt`)
The script processes the average temperature in column index 5 (using zero-based indexing).
Temperature data should be provided as text files structured as shown below:

<img width="333" height="406" alt="Снимок экрана 2026-07-22 111807" src="https://github.com/user-attachments/assets/40f8df9e-6394-4350-aaba-4908621f8920" />


3. NDWI Input Format (`.csv`)
NDWI index data should be formatted as CSV files matching the following structure:

<img width="234" height="381" alt="Снимок экрана 2026-07-22 112322" src="https://github.com/user-attachments/assets/4803cad8-dfdf-477f-916b-3cfdf22628c0" />

The script outputs calculated key dates (phenophases and index intersections) along with generated trend plots.

Temperature:

<img width="1200" height="600" alt="2009" src="https://github.com/user-attachments/assets/9e8c2890-cb3c-49e2-a734-eae4148285ee" />

NDWI:

<img width="1300" height="700" alt="ee-chart (2009)" src="https://github.com/user-attachments/assets/3b5413af-ee56-40ed-bd74-b6f64a74b55a" />
