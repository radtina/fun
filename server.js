const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML and CSS)
app.use(express.static(path.join(__dirname, '/')));

// POST route to handle form submission
app.post('/submit-response', (req, res) => {
  const userResponse = req.body.response;  // Capture the response
  const timestamp = new Date().toISOString();
  const data = `Response: ${userResponse}, Timestamp: ${timestamp}\n`;

  // Save response to a text file
  fs.appendFile('responses.txt', data, (err) => {
    if (err) throw err;
    console.log('Response saved!');
  });

  // Send a simple confirmation message back to the client
  res.send('<h2>Thank you for your response!</h2>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
