# URL Shortener Microservice
A simple Node.js microservice for shortening URLs. Users can convert long URLs into short codes and retrieve the original URLs. Data is stored in a JSON file.

### Features:

- Shorten URLs and get a short code.
- Validate and redirect to the original URL.
### Endpoints:

POST /api/shorturl - Shorten a URL.
GET /api/shorturl/:shortUrl - Redirect to the original URL.
Tech Stack:

- Node.js
- Express
- JSON for data storage
- 
Setup:
Clone the repo.
Run npm install and npm start.
Access at http://localhost:3000.
