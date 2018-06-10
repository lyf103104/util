var Util = {
	/****   验证数据类型   ****/

	isNumber: function (el) {
		return typeof el === 'number';
	},
	isString: function (el) {
		return typeof el === 'string';
	},
	isBoolean: function (el) {
		return typeof el === 'boolean';
	},
	isFunction: function (el) {
		return typeof el === 'function';
	},
	isArray: function (el) {
		return (typeof el === 'object') && (el instanceof Array);
	},
	isJSON: function (el) {
		return (typeof el === 'object') && (el.toString() === '[object Object]');
	},
	isSimpleType: function (el) {
		return this.isNumber(el) || this.isString(el) || this.isBoolean(el);
	},
	isEmptyObject: function (obj) {
		if (!this.isJSON(obj)) {
			throw obj + 'is not Object';
		}
		if (Object.keys(obj).length > 0) {
			return false;
		}
		// 兼容不支持ES5的浏览器
		for (var key in obj) {
			return false;
		}
		return true;
	},

	/****   深拷贝   ****/

	cloneJSON: function (json) {
		var self = this, newJSON = {};

		if (!self.isJSON(json)) return {};

		for (var key in json) {
			var val = json[key];

			if (self.isSimpleType(val)) {
				newJSON[key] = val;
			} else if (self.isJSON(val)) {
				newJSON[key] = self.cloneJSON(val);
			} else if (self.isArray(val)) {
				newJSON[key] = self.cloneArray(val);
			}
		}

		return newJSON;
	},
	cloneArray: function(arr) {
		var self = this, newArr = [];

		if (!self.isArray(arr)) return [];

		for (var i = 0; i < arr.length; i++) {
			var val = arr[i];

			if (self.isSimpleType(val)) {
				newArr[i] = val;
			} else if (self.isJSON(val)) {
				newArr[i] = self.cloneJSON(val);
			} else if (self.isArray(val)) {
				newArr[i] = self.cloneArray(val);
			}
		}

		return newArr;
	},
	deepClone: function (obj) {
		var output, self = this;

		if (self.isArray(obj)) {
			output = self.cloneArray(obj);
		} else {
			output = self.cloneJSON(obj);
		}

		return output;
	},

	/****   extend   ****/
	extend: function(defaults, options) {
		for(var prop in options) {
			if (options.hasOwnProperty(prop)) {
				defaults[prop] = options[prop];
			}
		}
		return defaults;
	},

	/****   数组操作   ****/

	/**
	 * 获取数组里面的最大值
	 * @param  {Array}  arr 数组里面的值必须全部都是数字
	 * @return {Number}     最大值
	 */
	arrayMax: function (arr) {
		return Math.max.apply(null, arr);
		// ES6 syntax: Math.max(...arr);
	},
	/**
	 * 获取数组里面的最小值
	 * @param  {Array}  arr 数组里面的值必须全部都是数字
	 * @return {Number}     最小值
	 */
	arrayMin: function (arr) {
		return Math.min.apply(null, arr);
		// ES6 syntax: Math.min(...arr);
	},
	arraySortRaise: function (arr) {
		arr.sort(function (a, b) {
			return a > b;
		});
		return arr;
	},
	arraySortDrop: function (arr) {
		arr.sort(function (a, b) {
			return a < b;
		});
		return arr;
	},
	arrayUnique: function (arr) {
		var dict = {};

		for (var i = 0; i < arr.length; i++) {
			if (dict[arr[i]] === undefined) {
				dict[arr[i]] = i;
			}
		}

		return Object.keys(dict);
	},
	isInArray: function (val, arr) {
		if (!this.isArray(arr)) {
			throw 'arguments 2 is not Array';
		}

		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] === val) {
				return true;
			}
		}

		return false;
	},

	/****   字符串操作   ****/

	/**
	 * 去除字符串两侧的空格
	 * @return {[type]}  [description]
	 */
	trim: function (str) {
		return str.replace(/^\s*|\s*$/g, '');
	},
	strReverse: function (str) {
		return str.split('').reverse().join('');
	},
	searchParse: function(str) {
		if (str.length < 3) return;
        var ret = {};
        str.substring(1).split('&').forEach(function (it) {
            var arr = it.split('=');
            ret[arr[0]] = arr[1];
        });
        return ret;
	},

	/****   日期操作   ****/

	/**
	 * 格式化输出日期
	 * @param  {Date}   date 日期对象
	 * @return {[tyoe]}      [description]
	 * @eg: dateFormat(date, '%y年%M月%d日 %h时%m分%s秒 星期%w')  2016年2月21日 20时19分1秒 星期二
	 * @eg: dateFormat(date, '%y-%M-%d %h:%m:%s', 'ch')
	 */
	dateFormat: function (date, fmtStr, lang) {
		var y = date.getFullYear(),
			M = date.getMonth() + 1,
			d = date.getDate(),
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds(),
			w = date.getDay();

		var ten = '十',
			twenty = '二十',
			thirty = '三十',
			week = '日',
			cn = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

		var result,
			tmp = fmtStr || '%y-%M-%d %h:%m:%s';

		if (w !== 0) {
			week = cn[w];
		}

		if (!lang) {
			result = tmp.replace('%y', y).replace('%M', M).replace('%d', d).replace('%h', h).replace('%m', m).replace('%s', s).replace('%w', week);
		} else {
			dateArr = [];

			for (var i = 0, Y = y.toString(); i < Y.length; i++) {
				dateArr.push(cn[Y.charAt(i)]);
			}

			dateArr.push('年');

		if (M < 9) {
			dateArr.push(cn[M+1]);
		} else if (M === 9) {
			dateArr.push(ten);
		} else {
			dateArr.push(ten + cn[(MM+1) % 10]);
		}

		dateArr.push('月');

		if (d < 10) {
			dateArr.push(cn[d]);
		} else if (d === 10) {
			dateArr.push(ten);
		} else if (d > 10 && d < 20) {
			dateArr.push(ten + cn[d % 10]);
		} else if (d === 20) {
			dateArr.push(twenty);
		} else if (d > 20 && d < 30) {
			dateArr.push(twenty + cn[d % 10]);
		} else if (d === 30) {
			dateArr.push(thirty);
		} else {
			dateArr.push(thirty + cn[d % 10]);
		}

		dateArr.push("日");

		result = dateArr.join('');
		}

		return result;
	},
	/**
	 * 两个日期差
	 * @param  {Date}   dateStart 开始日期
	 * @param  {Date}   dateEnd   结束日期
	 * @return {[tyoe]}           [description]
	 */
	dateFriendly: function (dateStart, dateEnd) {
		var dateEnd = dateEnd || new Date();
		var result  = ((dateEnd - dateStart) / 1000 / 60).toFixed();
		var describe,
			terms = {
				just: '刚刚',
				minutes: '分钟之前',
				hours: '小时之前'
			};

		if (result < 1) {
			describe = terms.just;
		} else if (1 < result && result <= 59) {
			describe = result + terms.minutes;
		} else if (result > 59 && result < 1440) {
			describe = (result / 60).toFixed() + terms.hours;
		} else {
			describe = this.dateFormat(dateStart);
		}

		return describe;
	},

	/****   随机   ****/

	rand: function (min, max) {
		return Math.random() * (max - min) + min;
	},
	/*
	 * 随机字符串
	 * @param  {Number} len    字符串长度
	 * @return {String} result
	 */
	randStr: function (len) {
		var self = this, result = '';
		var chars  = 'abcdefghrjklmnopqrstuvwxyzABCDEFGHRJKLMNOPQRSTUVWXYZ0123456789';

		for (var i = 0; i < len; i++) {
			var rand = Math.floor(self.rand(0, 62));
			result += chars.charAt(rand);
		}

		return result;
	},

	/****   验证表单相关   ****/

	email: function (val) {
		var regEmail = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
		if (regEmail.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	phone: function (val) {
		var regMobile = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
		if (regMobile.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	username: function (val) {
		var regName = /((^[\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
		if (regName.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 验证表单  此方法依赖jQuery
	 * @param  {String} '#from'   当前表单'id'
	 * @parma  {String} selector  需要验证的元素
	 * @param  {Object} errMsg    错误描述
	 * @return {Object}           {valid: false, errName: 'username', errValue: '', errMassage: '用户名错误'}
	 * @eg: fromVerify('#from', ['input[type=text], input[type=hidden]', {username: '用户名错误'}])
	 */
	fromVerify: function (fromId, selector, errMsg) {
		var selector = selector || 'input[type=text], input[type=hidden], input[type=radio], input[type=checkbox], input[type=password]',

			errMsg = errMsg || {
				username: '用户名格式不正确',
				email: '邮箱格式不正确',
				phone: '手机号码格式不正确'
			},

			$from = $(fromId);

		var nameList = $from.find(selector).map(function (index, node) {
			return node.getAttribute('name');
		}).toArray();

		var allValues = {},
			returnObj = {};

		$from.find(selector).each(function (index, node) {
			var name = node.getAttribute('name');
			var type = node.getAttribute('type');

			if (type === 'radio' && !$(this).attr('checked')) return;

			if (type === 'checkbox' && !!$(this).attr('checked')) {
				allValues[name] = $('#from').find('[name=' + name + ']').filter('input:checked').map(function(){ return this.value}).get().join(',');
			} else {
				allValues[name] = node.value;
			}
		});

		for (var key in allValues) {
			var val = allValues[key];

			if (!!Util[key]) {
				if (!Util[key](val)) { // fail..

					returnObj.valid = false;
					returnObj.errName = key;
					returnObj.errValue = val;

					for (var k in errMsg) {
						if (k === key) {
							returnObj.errMassage = errMsg[k];
						}
					}

					return returnObj;
				}
			}
		}

		returnObj.valid = true;
		return returnObj;
	},

	/****   Dom相关   ****/
	hasClass: function (el, cls) {
		return el.className.search(new RegExp('\\b' + cls + '\\b')) > -1;
	},
	addClass: function (el, cls) {
		if (!this.hasClass(el, cls)) {
			return el.className += ' ' + cls;
		}
	},
	removeClass: function (el, cls) {
		if (!!this.hasClass(el, cls)) {
			el.className = el.className.replace(new RegExp('\\b' + cls + '\\b'), '');
			return true;
		}
		return false;
	},

	/****   ajax   ****/
	ajax: function (opts) {
		var url      = opts.url,
			type     = opts.type,
			data     = opts.data,
			dataType = opts.dataType || 'json',
			success  = opts.success  || function () {},
			error    = opts.errop    || function () {};

		var self = this,
			xmlhttp = new XMLHttpRequest();

		if (type.toLowerCase() === 'get') {
			xmlhttp.open(type, url + '?' + self.serialize(data));
			xmlhttp.send();
		} else if (type.toLowerCase() === 'post') {
			xmlhttp.open(type, url);
			xmlhttp.send(data);
		}

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				if (dataType === 'json') {
					success(JSON.parse(xmlhttp.responseText));
				} else {
					success(xmlhttp.responseText);
				}
			} else if (xmlhttp.status === 404) {
				error();
			}
		};
	},
	serialize: function (data) {
		var str = '';

		for (var key in data) {
			str += key + '=' + data[key] + '&';
		}

		return str.replace(/&$/, '');
	}
};