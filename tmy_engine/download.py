import requests

def download_climate_data(latitude, longitude, start_date, end_date):
    url = (
        f"https://archive-api.open-meteo.com/v1/archive?"
        f"latitude={latitude}&longitude={longitude}"
        f"&start_date={start_date}"
        f"&end_date={end_date}"
        f"&daily=temperature_2m_mean"
        f"&timezone=auto"
    )
    response = requests.get(url)
    return response.json()