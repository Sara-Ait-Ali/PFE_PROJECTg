def generate_summary(df):
    summary = {
        "total_days": len(df),
        "avg_temperature": round(df["temperature"].mean(), 2),
        "max_temperature": round(df["temperature"].max(), 2),
        "min_temperature": round(df["temperature"].min(), 2),
    }
    return summary