const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Initialize Google Indexing API
const auth = new google.auth.GoogleAuth({
  keyFile: 'apiindex-476405-3c7e48ba4c22.json',
  scopes: ['https://www.googleapis.com/auth/indexing'],
});
const indexing = google.indexing({
  version: 'v3',
  auth: auth,
});

// Endpoint to submit URL for indexing
app.post('/index', async (req, res) => {
  try {
    const { url, type } = req.body;
    
    if (!url || !type) {
      return res.status(400).json({
        error: 'URL and type are required'
      });
    }
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type || 'URL_UPDATED',
      },
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Endpoint to get URL notification metadata
app.get('/status', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        error: 'URL is required'
      });
    }
    
    const response = await indexing.urlNotifications.getMetadata({
      url: url
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
