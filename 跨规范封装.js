(function (name, definition, context) {

	var Sample = definition();

	if (typeof module != 'undefined' && module.exports) {
		// 在 CommonJS 规范下（node）
		module.exports = definition();
	} else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define']['cmd'])) {
		// 在 AMD 规范下（RequireJS）或者 CMD 规范下（SeaJS）
		define(definition);

	} else {
		// 在浏览器环境下
		context[name] = definition();
	}

})('sample', function () {
	'use strict'
	var Sample = (function () {
		var count = 1;

		function getter () {
			console.log(count);
		}

		function setter (n) {
			count = n;
		}

		function operation () {
			count++;
		}

		return {
			getter: getter,
			setter: setter,
			operation: operation
		}
	})();

	return Sample;
}, this);