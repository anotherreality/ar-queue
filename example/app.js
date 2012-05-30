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

var parseUrlParams = function(req, res, next) {
	req.urlP = url.parse(req.url, true);
	next();
}

app.get('/', function(req, res) { res.redirect('/example'); });

app.get('/example', function(req, res) {
	queue.activeQueue(function(err, activeQueue) {
		if (err) {
			util.log('ERROR ' + err);
			throw err;
		} else {
			res.render('example.html', {
				title: "ar-queue.js Example",
				postpath: '/addTask',
				queue: activeQueue
			});
		}
	});
});


//queue.addTask(name, description, priority, scheduledTime, archive, action, callback)
app.post('/addTask', function(req, res){
	queue.addTask(
		req.body.taskName, 
		req.body.taskDescription,
		req.body.taskPriority,
		req.body.taskScheduledTime,
		req.body.archiveTask,
		req.body.taskAction,
		function(error) {
			if (error) throw error;
			res.redirect('/example');
		}
	);
});

app.get('/edit', parseUrlParams, function(req, res) {
	queue.getTask(req.urlP.query.id,
		function(error, task) {
			if (error) throw error;
			res.render('edit.html', {
				title: "Edit Task",
				postpath: '/updateTask',
				task: task
			});
		}
	);
});

//queue.updateTask = function(id, name, description, priority, scheduledTime, archive, action, callback)
app.post('/updateTask', function(req, res){
	queue.updateTask(
		req.body.id, 
		req.body.taskName, 
		req.body.taskDescription,
		req.body.taskPriority,
		req.body.taskScheduledTime,
		req.body.archiveTask,
		req.body.taskAction,
		function(error) {
			if (error) throw error;
			res.redirect('/');
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