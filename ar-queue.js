//
//  ar-queue.js
//  ar-queue
//
//  Created by Max Meier on 5/24/12.
//  Copyright (c) 2012 Another Reality. All rights reserved.
//

var queue = [];
var interval = 60000; //defaults to 1 minute

run = function(){
	//begin popping off items and dispatching tasks at set interval
}

halt = function(){

}

exports.start = function(callback){
	run();
}

exports.stop = function(callback){
	
}

exports.setDispatchInterval = function(interval, callback){
	_interval = interval;
	callback(null);
}

exports.loadData = function(data, callback){
	
}

exports.exportData = function(database, callback){
	
}

exports.addTask = function(task, callback){
	
	//return task id or error
}

exports.removeTask = function(id, callback){
	
}
