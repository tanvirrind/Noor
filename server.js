'use strict';

const http = require('http');

const requestHandler = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!');
};

if (require.main === module) {
    const server = http.createServer(requestHandler);
    server.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
} else {
    module.exports = requestHandler;
}