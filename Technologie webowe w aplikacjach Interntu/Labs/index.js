const http = require('http');

const server = http.createServer();
server.on('connection', ( socket ) => {
   console.log(`new connection at ${socket.address().address}:${socket.address().port} from ${socket.localAddress}`);
   socket.destroy();
});

server.listen(3000);
console.info('Server is running on port 3000');