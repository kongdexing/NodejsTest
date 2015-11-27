var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/registe'] = requestHandlers.registe;
handle['/login'] = requestHandlers.login;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;
handle['/sum'] = requestHandlers.sum;

server.start(router.route,handle);