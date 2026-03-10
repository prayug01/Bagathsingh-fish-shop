const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Bagathsingh Fish Shop server running at http://localhost:${port}`);
});
