// index.js
const express = require('express');
const app = express();
const path = require('path');

const url = process.env.BACKEND_URL || 'http://127.0.0.1:5000'; // Replace with your API URL

// Middleware to parse JSON data
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Sample data storage
let messages = [];

// POST /predict
app.post('/api/predict', async (req, res) => {
  console.log(`req=${JSON.stringify(req.body)}`)

  const message = req.body;
  messages.push(message);

  console.log(`${url}/predict`);
  console.log(`message=${JSON.stringify(message)}`)

  try {
    const predictResult = await fetch(`${url}/predict`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(message), // body data type must match "Content-Type" header
    });
    if (predictResult.ok) {
      const data = await predictResult.json();
      console.log('API response:', data);
      res.status(201).json(data);
    } else {
      console.error('Error:', predictResult);
      res.status(500).json({ status: 'error', explanation: predictResult.error });
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', explanation: error });
  }
});

// Handles get /poll
app.get('/api/predictions/:predictionId', async (req, res) => {
  const { predictionId } = req.params;
  if (predictionId) {
    try {
      const prediction = await fetch(`${url}/predictions/${predictionId}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      if (prediction.ok) {
        const data = await prediction.json();
        console.log('API response:', data);
        res.status(201).json(data);
      } else {
        console.error('Error:', prediction);
        res.status(500).json({ status: 'error', explanation: prediction.error });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', explanation: error });
    }
  } else {
      console.error('Error: no predictionId provided');
      res.status(500).json({ status: 'error', explanation: 'No predictionId provided' });
  }
  
});


// Serve files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Endpoint that returns an HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
