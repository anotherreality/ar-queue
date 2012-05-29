//
//  ar-queue.js
//  ar-queue
//
//  Created by Max Meier on 5/24/12.
//  Copyright (c) 2012 Another Reality. All rights reserved.
//

var database = require('./database');
var _queue = [];
var _interval = 60000; //defaults to 1 minute

function active()
{
	return _queue;
}

function run(){
	//begin popping off items and dispatching tasks at set interval
}

function halt(){
	//stop queue from dispatching any further items
	// if something has already been triggered, it will complete. this is not abort.
}

exports.start = function(callback){
	run();
}

exports.stop = function(callback){
	halt()
}

exports.setDispatchInterval = function(interval, callback){
	_interval = interval;
	callback(null);
}

exports.data = function(){
	currentQueue();
}

exports.loadData = function(data, callback){
	// load data from database into _queue
}

exports.saveData = function(database, callback){
	// save data from _queue into database
}

exports.addTask = function(task, callback){
	_queue.push(task);
	callback(null);
}

exports.removeTask = function(id, callback){
	
}
