// Import express
const express = require("express");

// Create app
const app = express();

// Simple route
app.get("/", (req, res) => {
  res.send("Environment Setup Successful");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});