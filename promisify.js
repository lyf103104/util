function promisify(fn, ctx) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			let allArgs = args.concat(function(err, data) {
				if (err) reject(err)
				resolve(data)
			})
			fn.apply(ctx || this, allArgs)
		})
	}
}

module.exports = promisify