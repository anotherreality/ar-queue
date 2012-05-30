var util = require('util');
var url = require('url');
var express = require('express');
var queue = require('../ar-queue');

var app = express.createServer();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.errorHandler({ dumpExceptions: true }));
app.register('.html', require('ejs'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) { res.redirect('/example'); });

app.get('/example', function(req, res) {
	res.render('example.html', {
		title: "ar-queue.js Example",
		postpath: '/addTask',
		queueData: queue.activeQueue()
	});
});

app.post('/addTask', function(req, res){
	queue.addTask(
		req.body.taskName, 
		queue.queueStatus("normal"), 
		Date.now, 
		function(){
			console.log('task:'+req.body.taskName+'dispatched');
		},
		function(error) {
			if (error) throw error;
			res.redirect('/example');
		}
	);
});

// 500 Error
app.error(function(err, req, res) {
	res.render('500.html', {
		title: "ERROR", error: err
	});
});

queue.start(function(error) {
	if (error) throw error;
});

app.on('close', function(errno) {
	queue.stop(function(err) { });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});