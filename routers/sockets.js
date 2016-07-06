var util = require('util');
var users = {};

module.exports = function (ioServer) {
	ioServer.sockets.on('connection', function (socket) {
		
		console.log('Socket', socket.id, 'Connected');
		socket.emit('Initialize', {user: socket.request.session.user || null});
		socket.on('AttemptLogIn', function (data) {
			console.log('AttemptLogIn Received from Socket', socket.id, util.inspect(data));
			var user;
			if (!users[data.email]) {
				users[data.email] = {
					password: data.password
				};
				socket.request.session.user = users[data.email];
				socket.request.session.save();
				socket.emit('LogInResults', {
					user: {email: data.email}
				});
			} else if (users[data.email] && users[data.email].password === data.password) {
				socket.request.session.user = users[data.email];
				socket.request.session.save();
				socket.emit('LogInResults', {
					user: {email: data.email}
				});
			} else {
				socket.request.session.user = undefined;
				socket.request.session.save();
				socket.emit('LogInResults', {
					error: 'Invalid Credentials'
				});
			}
		});
		socket.on('AttemptLogOut', function (data) {
			console.log('AttemptLogOut Received from Socket', socket.id, util.inspect(data));
			socket.request.session.user = undefined;
			socket.request.session.save();
			socket.emit('LogOutResults', {error: null})
		});

	});	
};