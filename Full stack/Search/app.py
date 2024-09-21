from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('search.html')

@app.route('/search')
def search():
    query = request.args.get('query')
    if not query:
        return "Please enter a search query."

    google_search_url = f"https://www.google.com/search?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(google_search_url, headers=headers)

    if response.status_code != 200:
        return f"Failed to fetch Google results, status code: {response.status_code}"

    soup = BeautifulSoup(response.text, 'html.parser')

    # Parse search results from Google
    results = []
    for g in soup.find_all('div', class_='g'):
        anchors = g.find_all('a')
        if anchors:
            link = anchors[0]['href']
            title = g.find('h3')
            if title:
                results.append((title.get_text(), link))

    return render_template('search.html', query=query, results=results)

if __name__ == "__main__":
    app.run(debug=True)
