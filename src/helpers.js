/** API helpers */

"use strict";

var ARRAY = require('nor-array');
var debug = require('nor-debug');
var URL = require('url');

var helpers = module.exports = {};

/** */
helpers.parse_both_params = function parse_both_params(req, keys) {
	keys = keys || [];
	var url_params = URL.parse(req.url, true).query;
	var params;
	ARRAY(keys).forEach(function(key) {
		if(req.body && req.body[key] !== undefined) {
			if(!params) { params = {}; }
			params[key] = req.body[key];
			return;
		}
		if(url_params && url_params[key] !== undefined) {
			if(!params) { params = {}; }
			params[key] = url_params[key];
			return;
		}
	});
	return params;
};

/** */
helpers.parse_body_params = function parse_body_params(req, keys) {
	debug.assert(req.body).typeOf('object');

	var data = {};
	ARRAY(keys).forEach(function(key) {
		if(req.body[key] !== undefined) {
			data[key] = req.body[key];
		}
	});
	//debug.log("data = ", data);
	return data;
};

/* */
helpers.get_param = function get_param(req, key) {
	debug.assert(req.params).typeOf('object');
	debug.assert(req.params[key]).typeOf('string');
	return req.params[key];
};

/** Returns an object with all items in the array mapped by their property $id */
helpers.map_by_id = function map_by_id(list) {
	debug.assert(list).is('array');
	var map = {};
	ARRAY(list).forEach(function(item) {
		debug.assert(item).is('object');
		debug.assert(item.$id).is('uuid');
		map[item.$id] = item;
	});
	return map;
};

/** Map an array into object by one property */
helpers.map_by_key = function map_by_key(list, key) {
	debug.assert(list).is('array');
	debug.assert(key).is('string');
	var obj = {};
	ARRAY(list).filter(function(i) {
		return i[key] !== undefined;
	}).forEach(function(i) {
		obj[ i[key] ] = i;
	});
	return obj;
};

/* EOF */
