// Source: .build/oofUtil.js
/**
 * User: linweilong(TGL)
 * Date: 2014-01-14 14:06
 */
(function() {
    var toString = Object.prototype.toString, /*hasOwn = Object.prototype.hasOwnProperty,
     push = Array.prototype.push,
     slice = Array.prototype.slice,*/
    trim = String.prototype.trim, //indexOf = Array.prototype.indexOf,
    // Used for trimming whitespace
    trimLeft = /^\s+/, trimRight = /\s+$/, class2type = {};
    (function() {
        var arr = "Boolean Number String Function Array Date RegExp Object".split(" "), name;
        for (var i = 0; i < arr.length; i++) {
            name = arr[i];
            class2type["[object " + name + "]"] = name.toLowerCase();
        }
    })();
    var core_hasOwn = class2type.hasOwnProperty;
    var _type = function(obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    }, isFunction = function(obj) {
        return _type(obj) === "function";
    }, isArray = Array.isArray || function(obj) {
        return _type(obj) === "array";
    }, isWindow = function(obj) {
        return obj != null && obj == obj.window;
    }, isPlainObject = function(obj) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || _type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
            return false;
        }
        try {
            // Not own constructor property must be Object
            if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {}
        return key === undefined || core_hasOwn.call(obj, key);
    };
    var extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }
        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }
        for (;i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };
    var getNamespace = function(namespace, orgObj) {
        namespace = namespace.split(".");
        var obj = orgObj || window, key;
        while (key = namespace.shift()) {
            if (!obj[key]) return undefined;
            obj = obj[key];
        }
        return obj;
    };
    var createNamespace = function(namespace, orgObj, object) {
        namespace = namespace.split(".");
        var obj = orgObj || window, key, last = namespace.pop();
        object = object || {};
        while (key = namespace.shift()) {
            if (!obj[key]) obj[key] = {};
            obj = obj[key];
        }
        if (!obj[last]) obj[last] = object; else extend(obj[last], object);
        return obj[last];
    };
    /** @namespace oofUtil*/
    var oofUtil = createNamespace("oofUtil");
    oofUtil = extend(oofUtil, /** @lends oofUtil */
    {
        /**
         * 获取obj的类型
         * @param obj
         * @returns {string}
         * @function
         */
        type: _type,
        /**
         * 判断obj是否为数组
         * @param obj
         * @returns {boolean}
         * @function
         */
        isArray: isArray,
        /**
         * 是否为数字（数字字符串）
         * @param obj
         * @returns {boolean}
         */
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        /**
         * 是否为函数
         * @param obj
         * @returns {boolean}
         * @function
         */
        isFunction: isFunction,
        /**
         * 是否为普通对象
         * @param obj
         * @returns {boolean}
         * @function
         */
        isPlainObject: isPlainObject,
        /**
         * 是否为window对象
         * @param obj
         * @returns {boolean}
         * @function
         */
        isWindow: isWindow,
        /**
         * 创建命名空间
         * @param namespace 命名空间串
         * @param orgObj 相对对象（默认为window）
         * @param object 初始对象（默认为{}）
         * @returns {object}
         * @function
         */
        createNamespace: createNamespace,
        getNamespace: getNamespace,
        /**
         * 合并对象到第一个参数 (摘抄自jQuery)
         * @returns {*|{}}
         * @function
         */
        extend: extend,
        /**
         * 去除字符串两端空字符
         * @param text
         * @returns {string}
         * @function
         */
        trim: trim ? function(text) {
            return text == null ? "" : trim.call(text);
        } : // Otherwise use our own trimming functionality
        function(text) {
            return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
        },
        /**
         * 获取一个唯一ID
         * @param str 前缀
         * @returns {string}
         * @function
         */
        getGUID: function() {
            var guid_id = 0;
            return function(str) {
                return (str || "") + "_" + +new Date() + "_" + guid_id++;
            };
        }(),
        uniqid: function(prefix, more_entropy) {
            if (typeof prefix == "undefined") {
                prefix = "";
            }
            var retId;
            var formatSeed = function(seed, reqWidth) {
                seed = parseInt(seed, 10).toString(16);
                // to hex str
                if (reqWidth < seed.length) {
                    // so long we split
                    return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) {
                    // so short we pad
                    return Array(1 + (reqWidth - seed.length)).join("0") + seed;
                }
                return seed;
            };
            if (!this.php_js) {
                this.php_js = {};
            }
            if (!this.php_js.uniqidSeed) {
                // init seed with big random int
                this.php_js.uniqidSeed = Math.floor(Math.random() * 123456789);
            }
            this.php_js.uniqidSeed++;
            retId = prefix;
            // start with prefix, add current milliseconds hex string
            retId += formatSeed(parseInt(new Date().getTime() / 1e3, 10), 8);
            retId += formatSeed(this.php_js.uniqidSeed, 5);
            // add seed hex string
            if (more_entropy) {
                // for more entropy we add a float lower to 10
                retId += (Math.random() * 10).toFixed(8).toString();
            }
            return retId;
        },
        loadCss: function(src, key, callback) {
            if (oofUtil.type(key) == "function") {
                callback = key;
                key = false;
            }
            if (!key || !document.getElementById(key)) {
                var link = document.createElement("link");
                link.id = key || "";
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = src;
                link.onreadystatechange = link.onload = function(e) {
                    if (!link.readyState || /loaded|complete/.test(link.readyState)) {
                        link.onload = link.onreadystatechange = null;
                        callback && callback();
                    }
                };
                document.getElementsByTagName("head")[0].appendChild(link);
            } else {
                callback && callback();
            }
        },
        /**
         * 输出信息到控制台
         * @param obj
         * @param msg
         */
        log: function(obj, msg) {
            try {
                if (window.console) {
                    if (msg) {
                        console.log(obj, msg);
                    } else {
                        console.log(obj);
                    }
                }
            } catch (e) {}
        }
    });
    (function() {
        var doms = [], labs = [], timer = null;
        /**
         * 文本框有内容的时候隐藏对应的label
         * @param domIds jquery对象   #id数组   #id逗号分隔
         * @memberOf oofUtil
         */
        oofUtil.bindLabelHide = function(domIds, labLs) {
            var tmp = domIds.jquery ? domIds : domIds.join ? $(domIds.join(",")) : $(domIds);
            if (labLs) {
                labLs = labLs.jquery ? labLs : labLs.join ? $(labLs.join(",")) : $(labLs);
                for (var i = 0, c = tmp.length; i < c; i++) {
                    doms.push(tmp.eq(i));
                    labs.push(labLs.eq(i));
                }
            } else {
                tmp.each(function() {
                    var lab = $("[for=" + this.id + "]");
                    if (lab.length > 0) {
                        doms.push($(this));
                        labs.push(lab);
                    }
                });
            }
            if (!timer) {
                timer = setInterval(function() {
                    for (var i = 0, c = doms.length; i < c; i++) {
                        try {
                            labs[i][doms[i].val() == "" ? "show" : "hide"]();
                        } catch (e) {}
                    }
                }, 50);
            }
        };
    })();
    (function() {
        var _cache = {
            queryValues: {}
        };
        /**
         * 将地址栏查询参数转为json对象
         * @param url
         * @return {Object}
         * @memberOf oofUtil
         */
        oofUtil.getQueryParams = function(url) {
            if (!url) return {};
            url = url.split("#")[0];
            var us = url.split("?"), obj = {}, u;
            if (us.length > 1) {
                us = us[1].split("&");
                for (var i = 0, c = us.length; i < c; i++) {
                    u = us[i].split("=");
                    obj[u[0]] = u[1];
                }
            }
            return obj;
        };
        /**
         * 将地址栏指定key的查询参数
         * @param key
         * @param url
         * @return {String}
         * @memberOf oofUtil
         */
        oofUtil.getQueryParamByKey = function(key, url) {
            url = url || location.href;
            var obj = _cache.queryValues[url] || (_cache.queryValues[url] = oofUtil.getQueryParams(url));
            return obj[key] || "";
        };
    })();
    (function(window, undefined) {
        var timer, list = [];
        function startTimer() {
            timer = setInterval(function() {
                for (var i = 0, c = list.length, d, v; i < c; i++) {
                    try {
                        d = list[i];
                        v = $.trim(d.ipt.val());
                        d.lab && d.lab[v == "" ? "show" : "hide"]();
                        d.clr && d.clr[v == "" ? "hide" : "show"]();
                    } catch (e) {}
                }
            }, 200);
        }
        /**
         * 绑定搜索框默认事件
         * @param callback
         * @param clearCallback
         */
        oofUtil.bindSearchInputHide = function(opt, callback) {
            if (!opt || !opt.ipt.length) return;
            opt.clr && opt.clr.click(function() {
                opt.ipt.val("");
                callback && callback();
                return false;
            });
            list.push(opt);
            if (!timer) {
                startTimer();
            }
        };
    })(window);
    oofUtil.getAjaxPagerHtml = function(curr, pageSize, record, size) {
        var half = ~~(size / 2), b, e, page, t, arr = [], i;
        curr = curr || 0;
        pageSize = pageSize || 20;
        b = curr - half;
        e = curr + half;
        record = record || 0;
        t = record % pageSize;
        page = parseInt(record / pageSize);
        curr = curr || 1;
        if (t) page++;
        if (page <= 1) return "";
        if (page <= size + 4) {
            b = 1;
            e = page;
        } else {
            if (curr == page - half) {
                b--;
            }
            if (b < 1) {
                b = 1;
                e = b + size;
            } else if (b == 3) {
                b = 1;
            }
            if (curr == 1 + half) {
                e++;
            }
            if (e > page) {
                e = page;
                if (b != 1) b = e - size;
                if (b < 1) b = 1;
            } else if (e == page - 2) {
                e = page;
            }
        }
        if (curr != 1) {
            arr.push("<a href='javascript:;' class='prev' start='" + (curr - 2) * pageSize + "'>上一页</a>");
        } else {
            arr.push("<span class='prev'>上一页</span>");
        }
        if (b != 1) {
            arr.push(curr == 1 ? "<span class='current'>1</span>" : "<a href='javascript:;' start='0'>1</a>");
            if (b != 2) arr.push("<a href='javascript:;' start='" + (curr - size - 1) * pageSize + "'>...</a>");
        }
        for (i = b; i <= e; i++) {
            arr.push(curr == i ? "<span class='current'>" + i + "</span>" : "<a href='javascript:;' start='" + (i - 1) * pageSize + "'>" + i + "</a>");
        }
        if (e != page) {
            if (e != page - 1) arr.push("<a href='javascript:;' start='" + (curr + size - 1) * pageSize + "'>...</a>");
            arr.push(curr == page ? "<span class='current'>" + page + "</span>" : "<a href='javascript:;' start='" + (page - 1) * pageSize + "'>" + page + "</a>");
        }
        if (curr != page) {
            arr.push("<a href='javascript:;' class='next' start='" + curr * pageSize + "'>下一页</a>");
        } else {
            arr.push("<span class='next'>下一页</span>");
        }
        return arr.join("");
    };
    if (window.define) {
        define("oofUtil", [], function() {
            return oofUtil;
        });
    }
})();// Source: .build/oofUtil/stringHelper.js
/**
 * User: linweilong(TGL)
 * Date: 2014-01-16 15:09
 */
(function() {
    /** @namespace oofUtil.stringHelper*/
    var stringHelper = oofUtil.createNamespace("oofUtil.stringHelper");
    oofUtil.extend(stringHelper, /** @lends oofUtil.stringHelper */ {
        utf16to8: utf16to8,
        binb2hex: binb2hex,
        binb2str: binb2str,
        str2binb: str2binb
    });
    var hexcase = 0;
    var chrsz = 8;
    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 1 && c <= 127) {
                out += str.charAt(i);
            } else if (c > 2047) {
                out += String.fromCharCode(224 | c >> 12 & 15);
                out += String.fromCharCode(128 | c >> 6 & 63);
                out += String.fromCharCode(128 | c >> 0 & 63);
            } else {
                out += String.fromCharCode(192 | c >> 6 & 31);
                out += String.fromCharCode(128 | c >> 0 & 63);
            }
        }
        return out;
    }
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15);
        }
        return str;
    }
    function binb2str(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> 32 - chrsz - i % 32 & mask);
        return str;
    }
    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 32 - chrsz - i % 32;
        return bin;
    }
    if (window.define) {
        define("oofUtil/stringHelper", [ "./../oofUtil" ], function(require) {
            require("./../oofUtil");
            return stringHelper;
        });
    }
})();// Source: .build/security/sha1.js
/**
 * User: linweilong(TGL)
 * Date: 2014-01-16 15:06
 */
(function() {
    /** @namespace oofUtil.stringHelper*/
    var sha1 = oofUtil.createNamespace("oofUtil.security.sha1", null, function(str, raw) {
        var hexcase = 0;
        var chrsz = 8;
        var sh = oofUtil.stringHelper;
        str = sh.utf16to8(str);
        function hex_sha1(s) {
            return sh.binb2hex(core_sha1(sh.str2binb(s), s.length * chrsz));
        }
        function str_sha1(s) {
            return sh.binb2str(core_sha1(sh.str2binb(s), s.length * chrsz));
        }
        function safe_add(x, y) {
            var lsw = (x & 65535) + (y & 65535);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 65535;
        }
        function rol(num, cnt) {
            return num << cnt | num >>> 32 - cnt;
        }
        function sha1_ft(t, b, c, d) {
            if (t < 20) return b & c | ~b & d;
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return b & c | b & d | c & d;
            return b ^ c ^ d;
        }
        function sha1_kt(t) {
            return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
        }
        function core_sha1(x, len) {
            x[len >> 5] |= 128 << 24 - len % 32;
            x[(len + 64 >> 9 << 4) + 15] = len;
            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;
                for (var j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j]; else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return Array(a, b, c, d, e);
        }
        if (raw == true) {
            return str_sha1(str);
        } else {
            return hex_sha1(str);
        }
    });
    if (window.define) {
        define("security/sha1", [ "./../oofUtil", "./../oofUtil/stringHelper", "../oofUtil" ], function(require) {
            require("./../oofUtil");
            require("./../oofUtil/stringHelper");
            return sha1;
        });
    }
})();