require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path=require('path');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const fs= require('fs');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



//my code
const dataFilePath = path.join(__dirname, 'data.json');

const loadData = () => {
  if (!fs.existsSync(dataFilePath)) { //Does it exist?
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
  }
  const fileContent = fs.readFileSync(dataFilePath);
  return JSON.parse(fileContent);
};

const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const addUrl = (originalUrl) => {
  const data = loadData();
  
 
  const existingEntry = data.find(entry => entry.original_url === originalUrl);
  if (existingEntry) {
    return existingEntry;
  }
  
  const newId = data.length ? data[data.length - 1].short_url + 1 : 1;
  

  const newEntry = { original_url: originalUrl, short_url: newId };
  data.push(newEntry);
  saveData(data);
  
  return newEntry;
};

const getUrlById = (id) => {
  const data = loadData();
  return data.find(entry => entry.short_url === id);
};

const isValidUrl = (url, callback) => {
  try {
    
    const { hostname } = new URL(url);

    
    dns.resolve(hostname, (err) => {
      if (err) {
        callback(false)
        console.log("${hostname} is invalid");
        ; // Domain resolution failed
      } else {
        callback(true); // Domain resolved successfully
      }
    });
  } catch (err) {
    callback(false);
    console.log(err); // Invalid URL format
  }
};

isValidUrl('https://google.com', (valid) => {
  console.log('URL is valid:', valid);
});

dns.resolve('google.com', (err, addresses) => {
  if (err) {
    console.error('DNS resolution failed:', err);
  } else {
    console.log('Resolved IP addresses:', addresses);
  }
});

app.post('/api/shorturl', (req, res) => {
  
  const originalUrl = req.body.url?.trim();

  if (!originalUrl) {
    console.log("no url")
    return res.json({ error: 'invalid url' }) // If i set status(400), it won't pass the tests
  }

  isValidUrl(originalUrl, (valid) => {
    if (!valid) {
      res.json({ error: 'invalid url' })
    }

  
    const result = addUrl(originalUrl);
    
    
    res.json({
      original_url: result.original_url,
      short_url: result.short_url
    });
  });
});




app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrlId = parseInt(req.params.shortUrl, 10); // Extract short URL ID from URL parameters

  // Validate the ID
  if (isNaN(shortUrlId) || shortUrlId <= 0) {
    return res.status(400).json({ error: 'Invalid short URL ID' });
  }

  // Retrieve the original URL by ID
  const entry = getUrlById(shortUrlId);

  if (entry) {
    // Redirect to the original URL
    return res.redirect(entry.original_url);
  } else {
    // Short URL ID not found
    return res.status(404).json({ error: 'No URL found for the given short URL ID' });
  }
});



//end of my code 

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
