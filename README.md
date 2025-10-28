# canvas-scaper
An idea for a canvas scraper that will scrape your courses and display all assignments for each course in a combined interface with deadlines etc, as I find the canvas interface bad.

I may also have to add support for other sites, since some courses don't use Canvas.

Just an idea atm, will see if and when I have time to implement.

[Canvas API](https://developerdocs.instructure.com/services/canvas)

## How to use
Create a `.env` file and add the following variable:
```
CANVAS_ACCESS_TOKEN = ""
CANVAS_API_URL = "https://canvas.education.lu.se/api/v1"
NEXT_PUBLIC_CANVAS_BASE_URL = "https://canvas.education.lu.se"
```
The access token can be found by going to your [Canvas profile settigs](https://canvas.education.lu.se/profile/settings) and scrolling down to `Approved integrations` -> `+ New access token`.
