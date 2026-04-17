const path = require('path');

// Phusion Passenger-compatible server
// This MUST NOT call server.listen() at module load time
// Passenger will inject requests directly into the exported handler

let nextServer;

async function initializeServer() {
  if (nextServer) return nextServer;
  
  try {
    const NextServer = require('next/dist/server/next-server').default;
    const requiredServerFiles = require(path.join(__dirname, '.next/required-server-files.json'));
    
    nextServer = new NextServer({
      hostname: 'localhost',
      port: process.env.PORT || 3000,
      dir: __dirname,
      dev: false,
      conf: requiredServerFiles.config,
    });
    
    console.log('Next.js server initialized successfully');
    return nextServer.getRequestHandler();
  } catch (err) {
    console.error('Failed to initialize Next.js server:', err);
    throw err;
  }
}

// Main request handler - works with both Passenger and direct HTTP
async function handleRequest(req, res) {
  try {
    const handler = await initializeServer();
    await handler(req, res);
  } catch (err) {
    console.error('Request error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

// For Phusion Passenger
module.exports = handleRequest;

// For local testing with `npm start`
if (require.main === module) {
  const http = require('http');
  const server = http.createServer(handleRequest);
  const port = process.env.PORT || 3000;
  
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}