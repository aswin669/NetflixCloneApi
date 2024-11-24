const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all origins

app.get('/your-endpoint', (req, res) => {
  res.json({ message: 'CORS enabled' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
