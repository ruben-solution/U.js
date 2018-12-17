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
    function determinBrowser() {
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        switch (true) {
            case isOpera:
                return 'opera';
            case isFirefox:
                return 'firefox';
            case isSafari:
                return 'safari';
            case isEdge:
                return 'edge';
            case isChrome:
                return 'chrome';
            default:
                return undefined;
        }
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
         * Is password strong enough?
         * Has to be 8 characters long and must have at least one letter, one number and one special character.
         *
         * @param {string} password
         *
         * @returns {boolean}
         */
        testPassword: function (password) {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
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
        currencyf: function(n) {
            return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1\'');
        },

        /**
         * Is user agent mobile
         *
         * @returns {boolean}
         */
        isMobile: function() {
            var check = false;

            (function(a) {
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
            })(navigator.userAgent||navigator.vendor||window.opera);

            return check;
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
        timestamp: function() {
            if (!Date.now) {
                Date.now = function() {
                    return new Date().getTime();
                }
            }

            return Date.now();
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
         * Generates random alpha-numerical string
         *
         * @param {int} len
         *
         * @returns {string}
         */
        randomString: function(len) {
            var rdmString = "";
            for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
            return rdmString.substr(0, len);
        },

        /**
         * Formats date from one format to another
         *
         * @param {string} date
         * @param {string} format
         * @param {string} newFormat
         *
         * @returns {string}
         */
        reformatDate: function(date, format, newFormat) {
            return moment(moment(date, format).toDate()).format(newFormat);
        },

        /**
         * Generate an integer Array containing an arithmetic progression
         *
         * @param {int} start
         * @param {int} stop
         * @param {int} step
         *
         * @returns {Array}
         */
        range: function(start, stop, step) {
            if (stop == null) {
                stop = start || 0;
                start = 0;
            }

            if (!step) {
                step = stop < start ? -1 : 1;
            }

            var length = Math.max(Math.ceil((stop - start) / step), 0);
            var range = Array(length);

            for (var idx = 0; idx < length; idx++, start += step) {
                range[idx] = start;
            }

            return range;
        },

        /**
         * Get all get parameters
         *
         * @returns {object}
         */
        getUrlVars: function() {
            var vars = [], hash;

            if (window.location.href.indexOf('?') !== -1) {
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
            }

            return vars;
        },

        /**
         * Converts hex format to rgb format
         *
         * @param {string} hex
         *
         * @returns {object}
         */
        hexToRgb: function(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },

        /**
         * Converts rgb format to hex format
         *
         * @param {int} r
         * @param {int} g
         * @param {int} b
         *
         * @returns {string}
         */
        rgbToHex: function (r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },

        /**
         * Encodes string to base64
         *
         * @param {string} str
         *
         * @returns {string}
         */
        base64encode: function (str) {
            return btoa(str);
        },

        /**
         * Desodes base64 string
         *
         * @param {string} base64
         *
         * @returns {string}
         */
        base64decode: function (base64) {
            return atob(base64);
        }
    }
})();
