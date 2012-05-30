//
//  ar-queue.js
//  ar-queue
//
//  Created by Max Meier on 5/24/12.
//  Copyright (c) 2012 Another Reality. All rights reserved.
//

var database = require('./database');
var _interval = 60000; //defaults to 1 minute between dispatching

var activeQueue = exports.activeQueue = function(callback)
{
	// get all active tasks from database
	database.activeTasks(callback);
}

function run(){
	//begin popping off items and dispatching tasks at set interval
}

function halt(){
	//stop queue from dispatching any further items
	// if something has already been triggered, it will complete. this is not abort.
}

exports.start = function(callback){
	database.connect(function(error) {
		if (error) throw error;
	});
	run();
}

exports.stop = function(callback){
	database.disconnect(function(error) {
		if (error) throw error;
	});
	halt()
	// close database
}

exports.setDispatchInterval = function(interval, callback){
	_interval = interval;
}

exports.addTask = function(name, description, priority, scheduledTime, archive, action, callback){
	// add to db
	database.addTask(name, description, priority, scheduledTime, archive, action,
		function(error) {
			if (error) {
				throw error;
			} else {
				callback(null);
			}
		}
	);
	// push onto _queue
}

exports.removeTask = function(id, callback){
	database.deleteTask(id, callback);	
}

exports.getTask = function(id, callback){
	database.findTaskById(id, callback);
}

exports.updateTask = function(id, name, description, priority, scheduledTime, archive, action, callback){
	database.updateTask(id, name, description, priority, scheduledTime, archive, action, callback);
}
