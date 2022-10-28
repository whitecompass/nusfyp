var net = require(‘net’);

var server = net.createServer();

server.listen(port, host, () => { 
	console.log(`TCP server listening on ${host}:${port}`); 
});

server.on(‘connection’,  (socket) => { 
	var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
	console.log(`new client connected: ${clientAddress}`); 
});

socket.on('data', (data) => { 
	console.log(`${clientAddress}: ${data}`); 
}); 

socket.on('close',  () => { 
	console.log(`connection closed: ${clientAddress}`); 
}); 

socket.on('error', (err) => { 
	console.log(`Error occurred in ${clientAddress}: ${err.message}`); 
}); 

(socket) => { 
	var clientAddress = `${sock.remoteAddress}:${sock.remotePort}`; 
	console.log(`new client connected: ${clientAddress}`); 
	sockets.push(socket);  
}

socket.on('data', (data) => { 
	console.log(`${clientAddress}: ${data}`); 
	sockets.forEach((sock) => { 
		sock.write(`${sock.remoteAddress}:${sock.remotePort} said ${data}\n`); 
	}); 
});

socket.on('close', (data) => { 
	const index = sockets.findIndex( (o) => { 
		return (o.remoteAddress===socket.remoteAddress) && (o.remotePort === socket.remotePort); 
	}); 
	if (index !== -1) sockets.splice(index, 1); 
	sockets.forEach((sock) => { 
		sock.write(`${clientAddress} disconnected\n`); 
	}); 
	console.log(`connection closed: ${clientAddress}`); 
});