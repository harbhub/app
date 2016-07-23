var util = require('util');
var uuid = require('uuid').v4;

var users = {};
var games = {};
var queue = [];
var room = uuid();

module.exports = function (ioServer) {
	ioServer.sockets.on('connection', function (socket) {

		console.log('Socket', socket.id, 'Connected');
		
		socket.on('disconnect', function () {
			console.log('Socket', socket.id, 'Disconnected');
		});
		
		socket.on('quick', function (data) {
			console.log('Quick Play');
			data.id = data.id || uuid();
			data.socket = socket.id;
			data.room = room;
			users[data.id] = data;
			queue.push(data);
			socket.join(room);
			if (queue.length === 4) {
				console.log('Starting Game');
				var game = {
					id: uuid(),
					room: room,
					players: queue
				};
				ioServer.to(room).emit('start', {game: game, queue: queue, user: data});
				queue = [];
				room = uuid();
			} else {
				console.log('Waiting');
				socket.emit('wait', {queue: queue, user: data});
			}
		});

	});	
};