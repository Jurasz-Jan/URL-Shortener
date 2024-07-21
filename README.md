
# URL Shortener Microservice

A simple Node.js microservice for shortening URLs. Users can convert long URLs into short codes and retrieve the original URLs. Data is stored in a JSON file.

## Features
- Shorten URLs and get a short code.
- Validate and redirect to the original URL.

## Endpoints
- `POST /api/shorturl` - Shorten a URL.
- `GET /api/shorturl/:shortUrl` - Redirect to the original URL.

## Tech Stack
- Node.js
- Express
- JSON for data storage

## Setup
1. Clone the repo.
2. Run `npm install` and `npm start`.
3. Access at `http://localhost:3000`.

Badge received:

![image](https://github.com/user-attachments/assets/3051e1d5-c3e8-4f80-bc69-37d722abaa9b)
