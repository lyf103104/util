function Promise() {
	this.callbacks = [];
	this.oncatch   = null;
}

Promise.prototype.then = function(success, fail) {
	this.callbacks.push({
		resolve: success,
		reject : fail
	});

	return this;
};

Promise.prototype.resolve = function(result) {
	this.complete('resolve', result);
};

Promise.prototype.reject = function(result) {
	this.complete('reject', result);
};

Promise.prototype.complete = function(type, result) {
	if (tyep == 'reject' && this.oncatch) {
		this.callbacks = [];
		this.oncatch(result);
	} else if (this.callbacks[0]) {
		var handler = this.callbacks.shift();
		if (handler[type]) handler[type](result);
	}
};

Promise.prototype.catch = function(failFn) {
	this.oncatch = failFn;
	return this;
};

var promise = new Promise();