// index.js
const express = require('express');
const app = express();
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const url = 'http://127.0.0.1:5000'; // Replace with your API URL

// Middleware to parse JSON data
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Sample data storage
let messages = [];

// POST /predict
app.post('/predict', async (req, res) => {
  // Generate a random UUID
  let uuid = uuidv4();

  const { message } = req.body;
  messages.push(message);


  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message),
  // };
  console.log(`${url}/predict`);
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
    res.status(201).json({ status: 'success', jobId: uuid, data: data });
  } else {
    console.error('Error:', predictResult.error);
    res.status(500).json({ status: 'error', error: predictResult.error });
  }

  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('API response:', data);
  //     res.status(201).json({ status: 'success', jobId: uuid, data: data });
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     res.status(201).json({ status: 'error', error: error });
  //   });



});

// Handles get /poll
app.get('/prediction/<jobId>', (req, res) => {
  const data = {
    price: 10000,
  };
  res.json(data);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
