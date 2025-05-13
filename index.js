const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'crypter.html'));
});
app.get('/decrypter', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'decrypter.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
