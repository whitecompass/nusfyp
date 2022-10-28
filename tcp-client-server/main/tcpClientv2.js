const net = require('net');

const PORT = 8000;
const HOSTNAME = '192.168.1.23';

const tcpClient = net.createConnection(PORT, HOSTNAME, () => {
    console.log(`connected to server on port ${PORT}`, tcpClient.address());
});


tcpClient.on('error', err => {
    console.log(`error occured: ${err.message}`);
})

tcpClient.on('close', err => {
    console.log(`connection closed ${err ? 'with' : 'without'} error`);
})

tcpClient.on('data', data => {
    console.log('%s', data);
})