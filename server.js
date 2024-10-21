const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML and CSS)
app.use(express.static(path.join(__dirname, '/')));

// Endpoint to handle form submissions
app.post('/submit-response', (req, res) => {
  const userResponse = req.body.response;
  const timestamp = new Date().toISOString();
  const data = `Response: ${userResponse}, Timestamp: ${timestamp}\n`;

  // Append the response to a text file
  fs.appendFile('responses.txt', data, (err) => {
    if (err) throw err;
    console.log('Response saved!');
  });

  // Send a confirmation back to the user
  res.send('<h2>Thank you for your response!</h2>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
