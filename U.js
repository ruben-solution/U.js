var U = (function() {
	/**
	 * Adds a 0 in front of a number smaller than 10
	 * 
	 * @param {int} n
	 * 
	 * @returns {string}
	 */
	function addZ(n) {
		return n < 10 ? '0' + n : '' + n;
	}

	/**
	 * Formats date to CH format
	 * 
	 * @param {Date} date
	 * 
	 * @returns {string}
	 */
	function formatDate(date) {
		var day = date.getDate();
		var month = addZ(date.getMonth() + 1);
		var year = date.getFullYear();

		return day + '.' + month + '.' + year;
	}

	/**
	 * Checks whether moment.js is available
	 * 
	 * @returns {boolean}
	 */
	function isMomentAvailable() {
		return !!window.moment;
	}

	/**
	 * Determines browser. This function is not reliable, since everyone can change their user agent string.
	 * 
	 * @returns {string}
	 */
	function determinBrowser()
	{
		// Opera 8.0+
		var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

		// Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';

		// Safari 3.0+ "[object HTMLElementConstructor]" 
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

		// Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;

		// Edge 20+
		var isEdge = !isIE && !!window.StyleMedia;

		// Chrome 1+
		var isChrome = !!window.chrome && !!window.chrome.webstore;

		if (isOpera) return 'opera';
		else if (isFirefox) return 'firefox';
		else if (isSafari) return 'safari';
		else if (isEdge) return 'edge';
		else if (isChrome) return 'chrome';
	}

	return {
		/** @var {int} iWidth inner width */
		iWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,

		/** @var {int} iHeight inner height */
		iHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,

		/** @var {string} url full URL */
		url: window.location.href,

		/** @var {string} url requested pathname */
		path: window.location.pathname,

		/**
		 * Returns browser. This function is not reliable, since everyone can change their user agent string.
		 * 
		 * @returns {string}
		 */
		browser: function() {
			return determinBrowser();
		},

		/**
		 * Get query sting
		 * 
		 * @param {string} name
		 * @param {string} url
		 * 
		 * @returns {string}
		 */
		queryString: function(name, url) {
			if (!url) {
				url = window.location.href;
			}

			name = name.replace(/[\[\]]/g, '\\$&');
			var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
				results = regex.exec(url);

			if (!results) {
				return null;
			}

			if (!results[2]) {
				return '';
			}

			return decodeURIComponent(results[2].replace(/\+/g, ' '));
		},

		/**
		 * Replace every occurence of a given string
		 * 
		 * @param {string} str
		 * @param {string} find
		 * @param {string} replace
		 * 
		 * @returns {string}
		 */
		replace: function(str, find, replace) {
			return str.split(find).join(replace);
		},

		/**
		 * Checks whether string is numeric
		 * 
		 * @param {string} n
		 * 
		 * @returns {boolean}
		 */
		isNumeric: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		/**
		 * Formats number to CH-format
		 * 
		 * @param {string} n
		 * 
		 * @returns {string}
		 */
		formatNumberCH: function(n) {
			return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1\'');
		},

		/**
		 * Is user agent mobile
		 * 
		 * @returns {boolean}
		 */
		isMobile: function() {
			return navigator.userAgent.match(/(iPhone|iPod|iPad|blackberry|android|Kindle|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i) !== null;
		},

		/**
		 * Checks whether the var holds an array
		 * 
		 * @param {object} obj
		 * 
		 * @returns {boolean}
		 */
		isArray: function(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		},

		/**
		 * Escape HTML characters
		 * 
		 * @param {string} text
		 * 
		 * @returns {string}
		 */
		escape: function(text) {
			return text
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;');
		},

		/**
		 * Unescape HTML characters
		 * 
		 * @param {string} text
		 */
		unescape: function(text) {
			return text
				.replace(/&amp;/g, '&')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
				.replace(/&#039;/g, '\'');
		},

		/**
		 * Get timestamp
		 * 
		 * @returns {int}
		 */
		timestamp: Date.now || function() {
			return new Date().getTime();
		},

		/**
		 * Get current date in CH format
		 * 
		 * @returns {string}
		 */
		date: function() {
			return formatDate(new Date());
		},

		/**
		 * Get current time
		 * 
		 * @returns {string}
		 */
		time: function() {
			var now = new Date();
			return now.getHours() + ':' + now.getMinutes();
		},

		/**
		 * Generates random number
		 * 
		 * @param {int} min
		 * @param {int} max
		 * 
		 * @returns {int}
		 */
		random: function(min, max) {
			if (max === null || max === undefined) {
				max = min;
				min = 0;
			}

			return min + Math.floor(Math.random() * (max - min + 1));
		},

		/**
		 * Returns first element of array
		 * 
		 * @param {object} arr
		 * 
		 * @returns {string|number|boolean|object|Array}
		 */
		first: function(arr) {
			if (isArray(arr)) {
				if (arr.length > 0) {
					return arr.shift();
				} else {
					throw 'Array must have at least one element';
				}
			} else {
				throw 'Parameter must be array';
			}
		},

		/**
		 * Formats date
		 * 
		 * @param {Date} date
		 * @param {string} format
		 * 
		 * @returns {string} formatted date
		 */
		datetimeFormat: function(date, format) {
			if (isMomentAvailable()) {
				if (format === null || format === undefined) {
					format = 'DD.MM.YYYY';
				}

				return moment(date).format(format);
			} else {
				throw 'This function requires moment.js';
			}
		},

		/**
		 * Gets cookie by name
		 * 
		 * @param {string} name
		 * 
		 * @returns {string}
		 */
		getCookie: function(name) {
			var mName = name + '=';
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');

			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];

				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}

				if (c.indexOf(mName) == 0) {
					return c.substring(mName.length, c.length);
				}
			}

			return undefined;
		},

		/**
		 * Sets a cookie
		 * 
		 * @param {string} name
		 * @param {string} value
		 * @param {int} days
		 */
		setCookie: function(name, value, days) {
			var d = new Date();
			d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = 'expires=' + d.toUTCString();
			document.cookie = name + '=' + value + ';' + expires + ';path=/';
		},

		/**
		 * @param {int} len
		 */
		randomString: function(len) {
			var rdmString = "";
			for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
			return  rdmString.substr(0, len);
		}
	}
})();
