import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()

CANVAS_ACCESS_TOKEN: str = os.getenv("CANVAS_ACCESS_TOKEN") or ""
CANVAS_API_URL: str = "https://canvas.education.lu.se/api/v1"

def main():
    endpoint = f"{CANVAS_API_URL}/courses"
    headers = {
        "Authorization": f"Bearer {CANVAS_ACCESS_TOKEN}"
    }
    params = {
        "enrollment_state": "active",  # Only active courses
        "include[]": ["students", "term"],  # Include additional data
        "per_page": 5  # Limit results to 5 courses
    }
    
    response = requests.get(endpoint, headers=headers, params=params)
    print(json.dumps(response.json(), indent=4))

    return

if __name__ == "__main__":
    main()
