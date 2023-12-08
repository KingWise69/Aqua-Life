const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, and client-side scripts)
app.use(express.static(path.join(__dirname, 'public')));

// Store user data in memory (replace this with a database in a production environment)
const userData = [];

app.post('/saveUserData', (req, res) => {
  const formData = req.body;
  userData.push(formData);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
