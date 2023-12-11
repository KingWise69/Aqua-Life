const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGODB_URI = 'YOUR_MONGODB_URI'; // Replace with your MongoDB connection string
const MONGODB_DB = 'YOUR_DB_NAME'; // Replace with your MongoDB database name

app.prepare().then(() => {
  const server = express();
  const PORT = process.env.PORT || 3000;

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.post('/api/saveUserData', async (req, res) => {
    try {
      const formData = req.body;

      // Connect to MongoDB
      const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      // Access the database
      const db = client.db(MONGODB_DB);

      // Insert the user data into the "userData" collection
      const result = await db.collection('userData').insertOne(formData);

      // Close the MongoDB connection
      await client.close();

      res.json({ success: true, insertedId: result.insertedId });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    return handle(req, res, parsedUrl);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
