const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Use CORS to allow requests from the frontend
app.use(cors());

// Simulate data that changes over time
let latestData = { message: "Initial message" };

// Endpoint for long polling
app.get('/poll', (req, res) => {
  console.log('Client connected, waiting for new data...');

  // Function to simulate data changes
  function checkForNewData() {
    const randomNum = Math.random();
    
    // Simulate condition to send new data (for example, a 50% chance of new data)
    if (randomNum > 0.5) {
      latestData = { message: `New data received at ${new Date().toLocaleTimeString()}` };
      res.json(latestData);
    } else {
      // If no new data, continue polling after a short delay
      setTimeout(checkForNewData, 2000);  // Check again after 2 seconds
    }
  }

  // Start checking for new data
  checkForNewData();
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});