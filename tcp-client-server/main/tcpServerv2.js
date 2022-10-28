const net = require('net');

const tcpServer = net.createServer();

const PORT = 8000;
const HOSTNAME = '192.168.1.23';

tcpServer.on('listening', () => {
    console.log(`Server listening on port ${PORT}`, tcpServer.address());
})

tcpServer.on('connection', socket => {
    console.log(`Server connected to client on localport ${socket.localPort} and remotePort ${socket.remotePort}`);
    socket.on('error', err => {
        console.log(`error occured ${err.message}`);
    })

    socket.write('Hi Welcome');
});

tcpServer.once('close', () => {
    console.log('connection closed');
});

tcpServer.on('error', err => {
    console.log(`error occured ${err.message}`);
});

tcpServer.listen(PORT, HOSTNAME);