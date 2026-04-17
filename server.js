const path = require('path');
const http = require('http');

// This line is the "magic" that tells Hostinger to look inside the Next.js build
const NextServer = require('next/dist/server/next-server').default;

// We point the server to the current directory
const conf = require(path.join(__dirname, '.next/required-server-files.json'));

const nextServer = new NextServer({
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  dir: __dirname,
  dev: false,
  conf: conf.config,
});

const handle = nextServer.getRequestHandler();

const server = http.createServer(async (req, res) => {
  try {
    await handle(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
