//
//  database.js
//  ar-queue
//
//  Created by Max Meier on 5/29/12.
//  Copyright (c) 2012 Another Reality. All rights reserved.
//

var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set dburl to running instance of MongoDB
var dburl = 'mongodb://localhost/my_automation_app';
var taskModel = 'Ar-queue.task';

exports.connect = function(callback) {
	mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
	mongoose.disconnect(callback);
}

exports.setup = function(callback) {callback(null); }

var ARTaskSchema = new Schema({
	created_ts : { type: Date, default: Date.now },
	updated_ts : { type: Date, default: Date.now },
	dispatched_ts : { type: Date, default: null },
	name : { type: String, default: "new task" },
	description: { type: String, default: ""},
	priority : { type: String, default: "normal" },
	scheduledTime : { type : Date, default: Date.now },
	archive : { type : Boolean, default: true },
	action : { type: {}, default: "function(){}"}
});

mongoose.model(taskModel, ARTaskSchema);
var ARTask = mongoose.model(taskModel);

exports.addTask = function(name, description, priority, scheduledTime, archive, action, callback) {
	var newTask = new ARTask();
	newTask.name = name;
	newTask.description = description;
	newTask.priority = priority;
	newTask.scheduledTime = new Date(scheduledTime);
	newTask.archive = archive;
	newTask.action = action;
	newTask.save(function(err) {
		if (err) {
			util.log('FATAL '+err);
			callback(err);
		} else {
			callback(null);
		}
	});
}

exports.updateTask = function(id, name, description, priority, scheduledTime, archive, action, callback) {
	findTaskById(id, function(err, doc) {
		if (err)
			callback(err);
		else {
			doc.updated_ts = new Date();
			doc.name = name;
			doc.description = description;
			doc.priority = priority;
			doc.scheduledTime = new Date(scheduledTime);
			doc.archive = archive;
			doc.action = action;
			doc.save(function(err) {
				if (err) {
					util.log('FATAL '+ err);
					callback(err);
				} else
					callback(null);
			});
		}
	});   
}

exports.deleteTask = function(id, callback) {
	 findTaskById(id, function(err, doc) {
		if (err) 
			callback(err);
		else {
			util.log(util.inspect(doc));
			doc.remove();
			callback(null);
		}
	});
}

exports.activeTasks = function(callback) {
	//ARTask.find({dispatchTime: null}, callback);
	ARTask.find({}, callback);
}

exports.archivedTasks = function(callback) {

}

exports.allTasks = function(callback) {

}

var findTaskById = exports.findTaskById = function(id, callback) {
	ARTask.findOne({ _id: id }, function(err, doc) {
		if (err) {
			util.log('FATAL '+ err);
			callback(err, null);
		}
		callback(null, doc);
	});
}

exports.findTasksByPriority = function(priority, callback) {

}