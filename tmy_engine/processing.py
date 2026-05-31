import requests
import pandas as pd
import os

def fetch_climate_data(latitude, longitude, start_date='2000-01-01', end_date='2024-12-31'):
    url = (
        f"https://archive-api.open-meteo.com/v1/archive?"
        f"latitude={latitude}&longitude={longitude}"
        f"&start_date={start_date}"
        f"&end_date={end_date}"
        f"&daily=temperature_2m_mean"
        f"&timezone=auto"
    )
    response = requests.get(url)
    data = response.json()
    
    df = pd.DataFrame({
        "date": data["daily"]["time"],
        "temperature": data["daily"]["temperature_2m_mean"]
    })
    
    os.makedirs("media/results", exist_ok=True)
    output_path = f"media/results/climate_{latitude}_{longitude}.csv"
    df.to_csv(output_path, index=False)
    
    return output_path