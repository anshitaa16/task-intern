import http from 'http';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]):\//, '$1:/');


const server = http.createServer((req, res) => {
  // Routing
  if (req.url === '/' || req.url === '/index') {
    serveHTML('index.html', res);
  } else if (req.url === '/about') {
    serveHTML('about.html', res);
  } else if (req.url === '/content') {
    serveHTML('content.html', res);
  } else if (req.url === '/ending') {
    serveHTML('ending.html', res);
  } else if (req.url === '/style.css') {
    serveCSS('style.css', res);
  } else {
    // Handle other requests, e.g., images, scripts, etc.
    serveStaticFile(req.url, res);
  }
});

// Function to serve HTML files
// Function to serve HTML files
// Function to serve HTML files
function serveHTML(filename, res) {
  const filePath = path.join(__dirname, filename);
  console.log('HTML File Path:', filePath); // Add this line for debugging
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error serving HTML file:', err); // Add this line for debugging
      // If the file doesn't exist, return a 404 Not Found response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      // Serve the HTML file
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}



// Function to serve CSS files
function serveCSS(filename, res) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file doesn't exist, return a 404 Not Found response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      // Serve the CSS file
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    }
  });
}

// Function to serve static files (e.g., images, scripts)
function serveStaticFile(url, res) {
  const filePath = path.join(__dirname, url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file doesn't exist, return a 404 Not Found response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      // Determine the content type based on the file extension
      const contentType = getContentType(url);
      // Serve the file with appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Function to determine content type based on file extension
function getContentType(url) {
  const extension = path.extname(url);
  switch (extension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
