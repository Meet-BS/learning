const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const serveStaticFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const url = req.url.toLowerCase();

    switch (url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to my Node.js server!');
            break;

        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is a simple HTTP server built with Node.js.');
            break;

        case '/contact':
            serveStaticFile(res, path.join(__dirname, 'contact.html'), 'text/html');
            break;

        case '/static/image.jpg': // Example static file
            serveStaticFile(res, path.join(__dirname, 'static', 'image.jpg'), 'image/jpeg');
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});