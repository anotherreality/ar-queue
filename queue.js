//
//  ar-queue.js
//
//  Created by Max Meier on 5/24/12.
//  Copyright (c) 2012 Another Reality. All rights reserved.
//

var _queue = [];
var _interval = 60000; //defaults to 1 minute

_run = function(){

}

_stop = function(){

}

exports.start = function(callback){
	//begin popping off items and running at set interval
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

exports.addTask = function(callback){
	
	//return task id or error
}

exports.removeTask(id, callback(){
	
}
