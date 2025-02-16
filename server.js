const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const itemsRouter = require('./routes/items');

// Use routes
app.use('/', itemsRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
