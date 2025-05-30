const http = require('http');
const fs = require('fs');
const path = require('path');

// const web_page = 'index.html'
const web_page = 'functional_test.html'

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, web_page);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
