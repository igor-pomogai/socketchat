var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');
var path = require('path');

app.use('/', serveStatic(path.join(__dirname, 'public'), {}));

require('./routes.js')(app);

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected')
    });
});

http.listen(3001, function() {
    console.log('listening on *:3001');
});