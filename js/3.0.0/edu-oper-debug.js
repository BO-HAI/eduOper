/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (name, value, options) {
    if (typeof value != "undefined") {
        // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1;
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1e3);
            } else {
                date = options.expires;
            }
            expires = "; expires=" + date.toUTCString();
        }
        var path = options.path ? "; path=" + options.path : "";
        var domain = options.domain ? "; domain=" + options.domain : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
        // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
包括jquery pagination分页插件 spin.js插件
*/
//=========fgnass.github.com/spin.js#v1.2.8============
!function (window, document, undefined) {
    /**
     * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
     * Licensed under the MIT license
     */
    var prefixes = ["webkit", "Moz", "ms", "O"], animations = {}, useCssAnimations;
    /**
     * Utility function to create elements. If no tag name is given,
     * a DIV is created. Optionally properties can be passed.
     */
    function createEl(tag, prop) {
        var el = document.createElement(tag || "div"), n;
        for (n in prop) el[n] = prop[n];
        return el;
    }
    /**
     * Appends children and returns the parent.
     */
    function ins(parent) {
        for (var i = 1, n = arguments.length; i < n; i++) parent.appendChild(arguments[i]);
        return parent;
    }
    /**
     * Insert a new stylesheet to hold the @keyframe or VML rules.
     */
    var sheet = function () {
        var el = createEl("style", {
            type: "text/css"
        });
        ins(document.getElementsByTagName("head")[0], el);
        return el.sheet || el.styleSheet;
    }();
    /**
     * Creates an opacity keyframe animation rule and returns its name.
     * Since most mobile Webkits have timing issues with animation-delay,
     * we create separate rules for each line/segment.
     */
    function addAnimation(alpha, trail, i, lines) {
        var name = ["opacity", trail, ~~(alpha * 100), i, lines].join("-"), start = .01 + i / lines * 100, z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha), prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase(), pre = prefix && "-" + prefix + "-" || "";
        if (!animations[name]) {
            sheet.insertRule("@" + pre + "keyframes " + name + "{" + "0%{opacity:" + z + "}" + start + "%{opacity:" + alpha + "}" + (start + .01) + "%{opacity:1}" + (start + trail) % 100 + "%{opacity:" + alpha + "}" + "100%{opacity:" + z + "}" + "}", sheet.cssRules.length);
            animations[name] = 1;
        }
        return name;
    }
    /**
     * Tries various vendor prefixes and returns the first supported property.
     **/
    function vendor(el, prop) {
        var s = el.style, pp, i;
        if (s[prop] !== undefined) return prop;
        prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        for (i = 0; i < prefixes.length; i++) {
            pp = prefixes[i] + prop;
            if (s[pp] !== undefined) return pp;
        }
    }
    /**
     * Sets multiple style properties at once.
     */
    function css(el, prop) {
        for (var n in prop) el.style[vendor(el, n) || n] = prop[n];
        return el;
    }
    /**
     * Fills in default values.
     */
    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for (var n in def) if (obj[n] === undefined) obj[n] = def[n];
        }
        return obj;
    }
    /**
     * Returns the absolute page-offset of the given element.
     */
    function pos(el) {
        var o = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
        while (el = el.offsetParent) o.x += el.offsetLeft, o.y += el.offsetTop;
        return o;
    }
    var defaults = {
        lines: 12,
        // The number of lines to draw
        length: 7,
        // The length of each line
        width: 5,
        // The line thickness
        radius: 10,
        // The radius of the inner circle
        rotate: 0,
        // Rotation offset
        corners: 1,
        // Roundness (0..1)
        color: "#000",
        // #rgb or #rrggbb
        speed: 1,
        // Rounds per second
        trail: 100,
        // Afterglow percentage
        opacity: 1 / 4,
        // Opacity of the lines
        fps: 20,
        // Frames per second when using setTimeout()
        zIndex: 2e9,
        // Use a high z-index by default
        className: "spinner",
        // CSS class to assign to the element
        top: "auto",
        // center vertically
        left: "auto",
        // center horizontally
        position: "relative"
    };
    /** The constructor */
    function Spinner(o) {
        if (!this.spin) return new Spinner(o);
        this.opts = merge(o || {}, Spinner.defaults, defaults);
    }
    Spinner.defaults = {};
    merge(Spinner.prototype, {
        spin: function (target) {
            this.stop();
            var self = this, o = self.opts, el = self.el = css(createEl(0, {
                className: o.className
            }), {
                position: o.position,
                width: 0,
                zIndex: o.zIndex
            }), mid = o.radius + o.length + o.width, ep, tp;
            // target position
            if (target) {
                target.insertBefore(el, target.firstChild || null);
                tp = pos(target);
                ep = pos(el);
                css(el, {
                    left: (o.left == "auto" ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + "px",
                    top: (o.top === "auto" ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + "px"
                });
            }
            el.setAttribute("aria-role", "progressbar");
            self.lines(el, self.opts);
            if (!useCssAnimations) {
                // No CSS animation support, use setTimeout() instead
                var i = 0, fps = o.fps, f = fps / o.speed, ostep = (1 - o.opacity) / (f * o.trail / 100), astep = f / o.lines;
                (function anim() {
                    i++;
                    for (var s = o.lines; s; s--) {
                        var alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity);
                        self.opacity(el, o.lines - s, alpha, o);
                    }
                    self.timeout = self.el && setTimeout(anim, ~~(1e3 / fps));
                })();
            }
            return self;
        },
        stop: function () {
            var el = this.el;
            if (el) {
                clearTimeout(this.timeout);
                if (el.parentNode) el.parentNode.removeChild(el);
                this.el = undefined;
            }
            return this;
        },
        lines: function (el, o) {
            var i = 0, seg;
            function fill(color, shadow) {
                return css(createEl(), {
                    position: "absolute",
                    width: o.length + o.width + "px",
                    height: o.width + "px",
                    background: color,
                    boxShadow: shadow,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.radius + "px" + ",0)",
                    borderRadius: (o.corners * o.width >> 1) + "px"
                });
            }
            for (; i < o.lines; i++) {
                seg = css(createEl(), {
                    position: "absolute",
                    top: 1 + ~(o.width / 2) + "px",
                    transform: o.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: o.opacity,
                    animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + " " + 1 / o.speed + "s linear infinite"
                });
                if (o.shadow) ins(seg, css(fill("#000", "0 0 4px " + "#000"), {
                    top: 2 + "px"
                }));
                ins(el, ins(seg, fill(o.color, "0 0 1px rgba(0,0,0,.1)")));
            }
            return el;
        },
        opacity: function (el, i, val) {
            if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
        }
    });
    (function () {
        function vml(tag, attr) {
            return createEl("<" + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
        }
        var s = css(createEl("group"), {
            behavior: "url(#default#VML)"
        });
        if (!vendor(s, "transform") && s.adj) {
            // VML support detected. Insert CSS rule ...
            sheet.addRule(".spin-vml", "behavior:url(#default#VML)");
            Spinner.prototype.lines = function (el, o) {
                var r = o.length + o.width, s = 2 * r;
                function grp() {
                    return css(vml("group", {
                        coordsize: s + " " + s,
                        coordorigin: -r + " " + -r
                    }), {
                        width: s,
                        height: s
                    });
                }
                var margin = -(o.width + o.length) * 2 + "px", g = css(grp(), {
                    position: "absolute",
                    top: margin,
                    left: margin
                }), i;
                function seg(i, dx, filter) {
                    ins(g, ins(css(grp(), {
                        rotation: 360 / o.lines * i + "deg",
                        left: ~~dx
                    }), ins(css(vml("roundrect", {
                        arcsize: o.corners
                    }), {
                        width: r,
                        height: o.width,
                        left: o.radius,
                        top: -o.width >> 1,
                        filter: filter
                    }), vml("fill", {
                        color: o.color,
                        opacity: o.opacity
                    }), vml("stroke", {
                        opacity: 0
                    }))));
                }
                if (o.shadow) for (i = 1; i <= o.lines; i++) seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                for (i = 1; i <= o.lines; i++) seg(i);
                return ins(el, g);
            };
            Spinner.prototype.opacity = function (el, i, val, o) {
                var c = el.firstChild;
                o = o.shadow && o.lines || 0;
                if (c && i + o < c.childNodes.length) {
                    c = c.childNodes[i + o];
                    c = c && c.firstChild;
                    c = c && c.firstChild;
                    if (c) c.opacity = val;
                }
            };
        } else useCssAnimations = vendor(s, "animation");
    })();
    if (typeof define === "function" && define.amd) define(function () {
        return Spinner;
    }); else window.Spinner = Spinner;
}(window, document);

/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.1
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
/**
*  ============更新=============
*  id:20130427
*  更新日期：2013-4-27
*  修改人：bohai
*  说明：
*  1、jQuery.fn.pagination方法 opts对象添加obj_this属性，改属性保存了外部js对象，方便在回调函数中访问到外部对象方法（解决代码复用问题）
*/
jQuery.fn.pagination = function (maxentries, opts) {
    opts = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "#",
        prev_text: "Prev",
        next_text: "Next",
        ellipse_text: "...",
        prev_show_always: true,
        next_show_always: true,
        callback: function () {
            return false;
        },
        obj_this: null
    }, opts || {});
    return this.each(function () {
        /**
        * Calculate the maximum number of pages
        */
        function numPages() {
            return Math.ceil(maxentries / opts.items_per_page);
        }
        /**
        * Calculate start and end point of pagination links depending on 
        * current_page and num_display_entries.
        * @return {Array}
        */
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }
        /**
        * This is the event handling function for the pagination links. 
        * @param {int} page_id The new page number
        */
        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                } else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }
        /**
        * This function inserts the pagination links into the container element
        */
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // This helper function returns a handler function that calls pageSelected with the right page_id
            var getClickHandler = function (page_id) {
                return function (evt) {
                    return pageSelected(page_id, evt);
                };
            };
            // Helper function for generating a single link (or a span tag if it'S the current page)
            var appendItem = function (page_id, appendopts) {
                page_id = page_id < 0 ? 0 : page_id < np ? page_id : np - 1;
                // Normalize page id to sane value
                appendopts = jQuery.extend({
                    text: page_id + 1,
                    classes: "current"
                }, appendopts || {});
                if (page_id === current_page) {
                    var lnk = $("<span class='current'>" + appendopts.text + "</span>");
                } else {
                    var lnk = $("<a>" + appendopts.text + "</a>").bind("click", getClickHandler(page_id)).attr("href", opts.link_to.replace(/__id__/, page_id));
                }
                if (appendopts.classes) {
                    lnk.removeAttr("class");
                    lnk.addClass(appendopts.classes);
                }
                panel.append(lnk);
            };
            // Generate "Previous"-Link
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem(current_page - 1, {
                    text: opts.prev_text,
                    classes: "disabled"
                });
            }
            // Generate starting points
            if (interval[0] > 0 && opts.num_edge_entries > 0) {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for (var i = 0; i < end; i++) {
                    appendItem(i);
                }
                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                    jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
            }
            // Generate interval links
            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i);
            }
            // Generate ending points
            if (interval[1] < np && opts.num_edge_entries > 0) {
                if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                    jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
                var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                for (var i = begin; i < np; i++) {
                    appendItem(i);
                }
            }
            // Generate "Next"-Link
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendItem(current_page + 1, {
                    text: opts.next_text,
                    classes: "disabled"
                });
            }
        }
        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = !maxentries || maxentries < 0 ? 1 : maxentries;
        opts.items_per_page = !opts.items_per_page || opts.items_per_page < 0 ? 1 : opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = jQuery(this);
        // Attach control functions to the DOM element 
        this.selectPage = function (page_id) {
            pageSelected(page_id);
        };
        this.prevPage = function () {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            } else {
                return false;
            }
        };
        this.nextPage = function () {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            } else {
                return false;
            }
        };
        // When all initialisation is done, draw the links
        drawLinks();
    });
};

/*global location:false, unescape:false, window:false*/
/**
* 工具类
*/
var edu = edu || {};

edu.command = edu.command || {};

edu.command.Tools = function () { };

/**
* 创建GUID
*/
edu.command.Tools.prototype.createGUID = function () {
    var guid = "", n, i, len = 32;
    for (i = 1; i <= len; i++) {
        n = Math.floor(Math.random() * 16).toString(16);
        guid += n;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            guid += "-";
        }
    }
    return guid;
};

/**
* 获取URL参数值,获取单个值
* {string} name 参数名称
*/
edu.command.Tools.prototype.getQueryString = function (name) {
    var reg = new RegExp(edu.config.tools.getQueryString.regexpString.replace("@name", name), "i"), r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return unescape(r[2]);
    }
    return null;
};

/**
* 获取URL参数值对象
* {string} url
*/
edu.command.Tools.prototype.getQueryStringObj = function (url) {
    var search = url.slice(url.indexOf("?") + 1), result = {}, queryString = search || location.search.slice(1), re = edu.config.tools.getQueryStringObj.regexp, m;
    while ((m = re.exec(queryString)) !== null) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return result;
};

/**
* 对象原型继承，子类原型继承父类副本原型（用于寄生组合式继承）
* {object} baseObj 父类（注意不是对象实体）
* {object} obj 子类（注意不是对象实体）
*/
edu.command.Tools.prototype.inheritPrototype = function (baseObj, obj) {
    function object(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }
    var prototype = object(baseObj.prototype);
    prototype.constructor = obj;
    obj.prototype = prototype;
};

/**
* 格式化Date,按指定格式输出
*  {string} dataStr 日期字符串
*  {string} styleStr 样式字符串 例如：'yyyy-MM-dd hh:mm:ss'
*/
edu.command.Tools.prototype.formatDate = function (dataStr, styleStr) {
    function createDate(_dateStr, _config) {
        var re = _config.regexp.date_t, T, gmt = _config.GMT === "" ? 0 : _config.GMT, s = 1e3 * 60 * 60 * parseInt(gmt, 10), //换算毫秒
        len = _dateStr.indexOf(".") > -1 ? _dateStr.indexOf(".") : _dateStr.length;
        //适应 不带时区格式 2013-09-25T08:00:00 
        if (re.test(_dateStr)) {
            _dateStr = _dateStr.substring(0, len);
            T = _dateStr.replace(re, function (a, day, time) {
                day = day.replace(/-/g, "/") + " " + time;
                //return new Date(Date.parse(day) + s);
                return Date.parse(day) + s;
            });
            return new Date(parseInt(T, 10));
        }
        return new Date(_dateStr);
    }
    var config = edu.config.tools.formatDate, style = typeof styleStr === "undefined" ? "yyyy-MM-dd hh:mm:ss" : styleStr, time = createDate(dataStr, config), k, o = {
        "M+": time.getMonth() + 1,
        //月份
        "d+": time.getDate(),
        //日
        "h+": time.getHours() % 12 === 0 ? 12 : time.getHours() % 12,
        //小时
        "H+": time.getHours(),
        //小时
        "m+": time.getMinutes(),
        //分
        "s+": time.getSeconds(),
        //秒
        "q+": Math.floor((time.getMonth() + 3) / 3),
        //季度
        S: time.getMilliseconds()
    }, week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    };
    if (/(y+)/.test(style)) {
        style = style.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(style)) {
        style = style.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + week[time.getDay() + ""]);
    }
    for (k in o) {
        if (new RegExp("(" + k + ")").test(style)) {
            style = style.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return style;
};

/*global document:false, location:false, window:false*/
/*
* 接口类
*/
var edu = edu || {};

edu.command = edu.command || {};

edu.command.Api = function (debug) {
    //标识是否是调试状态；true调试状态；上线应改为false
    var _debug = false, req = {
        id: "",
        url: "",
        data: "",
        redirect: "/callback.html",
        type: "get",
        postdata: {},
        charset: "UTF-8"
    };
    if (typeof debug !== "undefined" && typeof debug === "boolean") {
        _debug = debug;
    }
    if (typeof debug !== "undefined" && typeof debug === "object") {
        _debug = debug.debug;
    }
    /*获取或设置状态属性*/
    this.getDebug = function () {
        return _debug;
    };
    this.setDebug = function (debug) {
        _debug = debug;
    };
    /*获取或设置请求对象*/
    this.getReq = function () {
        return req;
    };
    this.setReq = function (newReq) {
        var r;
        for (r in newReq) {
            if (typeof req[r] !== "undefined") {
                req[r] = newReq[r];
            }
        }
    };
};

edu.command.Api.prototype.get = function (url, fn1, fn2) {
    var that = this, req = that.getReq(), promise = {};
    if (arguments.length > 0) {
        return null;
    }
    req.url = url;
    jQuery.ajaxSetup({
        scriptCharset: "utf-8",
        contentType: "application/jsonp; charset=utf-8"
    });
    promise = $.ajax({
        type: req.type,
        data: req.data,
        async: true,
        timeout: 0,
        url: req.url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpcallback: "?"
    });
    if (typeof fn1 !== "undefined") {
        promise.done(function (data) {
            fn1(data);
        });
    }
    if (typeof fn2 !== "undefined") {
        promise.fail(function (e) {
            fn2(e);
        });
    }
    return promise;
};

edu.command.Api.prototype.post = function (url, postData, fn1, fn2) {
    var that = this, r, deferred = $.Deferred(), req = that.getReq(), container = $("#webApiRequestContainer"), iframe = $("#webApiRequestIframe"), form = $("#webApiRequestForm");
    if (arguments.length === 0) {
        alert("post方法参数错误！");
        return null;
    }
    if (typeof arguments[0] === "string") {
        req.url = arguments[0];
    }
    if (typeof arguments[1] === "object") {
        req.postdata = arguments[1];
    }
    if (typeof arguments[0] !== "string") {
        alert("参数1错误，非string类型。");
    }
    //IE浏览器
    if (!!window.ActiveXObject) {
        document.charset = req.charset;
    }
    if (container.length === 0) {
        container = $("<div style='display:none;' id='webApiRequestContainer'></div>");
        iframe = $("<iframe style='width:0;height:0' id='webApiRequestIframe' " + "name='webApiRequestIframe'></iframe>");
        form = $("<form id='webApiRequestForm' method='post' target=" + "'webApiRequestIframe'  accept-charset='" + req.charset + "'></form>");
        container.append(iframe).append(form).appendTo($("body"));
    }
    form.attr("action", req.url + (req.url.indexOf("?") > 0 ? "&" : "?") + "r=" + req.redirect);
    form.html("");
    for (r in req.postdata) {
        if (req.postdata.hasOwnProperty(r)) {
            form.append($("<input type='hidden' name='" + r + "' value='" + req.postdata[r] + "' />"));
        }
    }
    form.submit();
    iframe.unbind("load").load(function () {
        var url, obj;
        function getQueryStringObj(uri) {
            var search = uri.slice(uri.indexOf("?") + 1), result = {}, queryString = search || location.search.slice(1), re = edu.config.tools.getQueryStringObj.regexp, m;
            while (m === re.exec(queryString)) {
                result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            return result;
        }
        try {
            url = this.contentWindow.location.href;
            obj = getQueryStringObj(url);
            if (typeof fn1 !== "undefined") {
                fn1(obj);
            }
            deferred.resolve(obj);
        } catch (e) {
            if (typeof fn2 !== "undefined") {
                fn1(obj);
            }
            deferred.reject(e);
        }
    });
    return deferred.promise();
};

edu.command.Api.prototype.put = function (url, postData, fn1, fn2) {
    var that = this, req = that.getReq();
    if (arguments.length < 2) {
        alert("参数错误;");
        return;
    }
    if (typeof arguments[0] !== "string") {
        alert("参数1类型错误;");
        return;
    }
    if (typeof arguments[1] !== "object") {
        alert("参数2类型错误;");
        return;
    }
    url = url + (req.url.indexOf("?") > 0 ? "&" : "?") + "m=put";
    return that.post(url, postData, fn1, fn2);
};

edu.command.Api.prototype.del = function (url, fn1, fn2) {
    var that = this, req = that.getReq();
    url = url + (req.url.indexOf("?") > 0 ? "&" : "?") + "m=delete";
    if (arguments.length < 2) {
        alert("参数错误;");
        return;
    }
    if (typeof arguments[0] !== "string") {
        alert("参数1类型错误;");
        return;
    }
    return that.get(url, fn1, fn2);
};

/**
* 创建接口请求完整URL
* {ojbect} paramObj 参数对象 {project: '项目名称', path: '接口地址及参数', [passport]:'key'}
* [, project] {string}
* [,path] {string}
* [,passport] {string}
*/
edu.command.Api.prototype.createFullUrl = function (paramObj) {
    var debug = this.getDebug(), fullUrl = "", domain = "", i, len, t, char = "";
    try {
        if (arguments.length === 1) {
            char = paramObj.path.substring(0, 1).indexOf("/") > -1 ? "" : "/";
            for (t in edu.config.project) {
                if (t === paramObj.project.toLowerCase()) {
                    domain = debug ? edu.config.project[t].testDomain : edu.config.project[t].domain;
                    break;
                }
            }
            if ("path" in paramObj && paramObj.path.length >= 1) {
                fullUrl = domain + char + paramObj.path;
                if ("passport" in paramObj) {
                    char = paramObj.path.indexOf("?") > -1 ? "&" : "?";
                    fullUrl = fullUrl + char + "passport=" + this.getPassport(paramObj.passport);
                }
            }
        } else if (arguments.length >= 2) {
            char = arguments[1].substring(0, 1).indexOf("/") > -1 ? "" : "/";
            for (i = 0, len = arguments.length; i < len; i++) {
                if (typeof arguments[i] !== "string") {
                    alert("api.createFullUrl方法参数错误，请检查参数类型");
                    return;
                }
            }
            if (arguments.length > 1) {
                domain = debug ? edu.config.project[arguments[0]].testDomain : edu.config.project[arguments[0]].domain;
                fullUrl = domain + char + arguments[1];
                if (arguments.length === 3) {
                    char = arguments[1].indexOf("?") > -1 ? "&" : "?";
                    fullUrl = fullUrl + char + "passport=" + this.getPassport(arguments[2]);
                }
            }
        } else {
            alert("api.createFullUrl方法参数错误，请检查参数类型");
        }
        return fullUrl;
    } catch (e) {
        throw e;
    }
};

/**
* 获取passport
* {string} [key] 测试key
*/
edu.command.Api.prototype.getPassport = function (key) {
    var passport = "", name = edu.config.ticket, oldName = edu.config.oldTicket;
    if (arguments.length === 0) {
        passport = $.cookie(oldName) === null ? $.cookie(name) : $.cookie(oldName);
        return passport;
    }
    if (arguments.length > 0 && key === "") {
        passport = $.cookie(oldName) === null ? $.cookie(name) : $.cookie(oldName);
        return passport;
    }
    if (arguments.length > 0 && key !== "") {
        passport = key;
        return passport;
    }
    return passport;
};

/**
* 验证API返回数据，只有在API数据Status属性==1时才返回true
*{ApiData} data API返回数据对象
*{Function} [callback(ErroInfo)] 错误信息处理函数
*{string} [errorUrl] 解决问题的跳转链接
*/
edu.command.Api.prototype.valiReturnData = function (data, callback, errorUrl) {
    var url = "", config = edu.config.api.valiReturnData, i, len, item, returnInfo;
    // status 状态码, returnInfo根据状态码获取的编码信息
    if (arguments.length > 2 && errorUrl !== "") {
        url = errorUrl;
    }
    for (i = 0, len = config.statusName.length; i < len; i++) {
        for (item in data) {
            if (data.hasOwnProperty(item)) {
                //返回正确的编码
                if (item === config.statusName[i] && data[item].toString() === config.normalValue) {
                    return true;
                }
                //错误编码的处理
                if (item === config.statusName[i]) {
                    returnInfo = this.analysisStatus(data[item], url);
                    if (arguments.length > 1 && data[item] !== config.normalValue) {
                        callback(returnInfo);
                    }
                    return false;
                }
            }
        }
    }
};

/**
* 解析状态
{string} status API返回数据对象的Status属性值
{string} [errorUrl] 解决问题的跳转链接
*/
edu.command.Api.prototype.analysisStatus = function (status, errorUrl) {
    var config = edu.config.api.analysisStatus, url = "", start_a = "", end_a = "", i, len;
    if (arguments.length > 1 && errorUrl !== "") {
        url = errorUrl.replace("'", "");
        start_a = config.startLabel.replace("@my_url", url);
        end_a = config.endLabel;
    }
    for (i = 0, len = config.statusObjs.length; i < len; i++) {
        if (config.statusObjs[i].key === status.toString()) {
            return config.statusObjs[i].value.replace("@s_label", start_a).replace("@e_label", end_a).replace("@num", status);
        }
    }
    //返回default
    return config.defaultStatus.replace("@s_label", start_a).replace("@e_label", end_a).replace("@num", status);
};

/*global document:false, window:false,Spinner:false*/
/**
* 页面UI构建
* @class 职业网校页面UI构建类，提供通用的UI输出
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @namespace edu.ui (页面UI)
* @version v1.0
*/
var edu = edu || {};

edu.ui = edu.ui || {};

edu.ui.EduUI = function () { };

edu.ui.EduUI.prototype.inheritPrototype = function (baseObj, obj) {
    function object(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }
    var prototype = object(baseObj.prototype);
    prototype.constructor = obj;
    obj.prototype = prototype;
};

/**
* paging自定义绑定事件:分页控件绑定
* @param {string} element 元素Id
* @param {int} pageCount 总页数
* @param {int} pageIndex 当前页
* @param {int} pageSize 页大小
* @param {String} link 分页链接 默认为#
* @param {Function} callbackFun(index,jq) 翻页后的回调函数(index会自动+1)
* @param {object} objthis 本页面JS对象
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @example 
*  (new edu.ui.UserUI).paging('div',60, 0, 20, "?lessonyear=2013", callback(index,jq),objthis);
*  @requires jquery-1.9.1;jquery.pagination.js;jquery.pagination.css;
*/
edu.ui.EduUI.prototype.paging = function (element, pageCount, pageIndex, pageSize, link, callback, objthis) {
    $("#" + element).pagination(pageCount, {
        callback: callback,
        //为翻页调用次函数。
        prev_text: "上一页",
        next_text: "下一页",
        current_page: pageIndex,
        items_per_page: pageSize,
        //每页的数据个数
        link_to: link === "" ? "#" : link,
        //分页的链接 默认是“#”[?id=0]
        obj_this: objthis
    });
};

/**
* 用户页面UI构建
* @class 职业网校页面UI构建类，提供通用的UI输出，继承自edu.ui.EduUI
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @namespace edu.ui (页面UI)
* @version v1.0
*/
var edu = edu || {};

edu.ui = edu.ui || {};

edu.ui.UserUI = function () {
    edu.ui.EduUI.call(this);
};

(function () {
    new edu.ui.EduUI().inheritPrototype(edu.ui.EduUI, edu.ui.UserUI);
})();

/**
* 让指定元素显示加载效果[支持IE6+,无图片，无CSS]
* @param  {string} elementId 元素ID字符串
* @param  {string} [color] 颜色(默认：网校蓝)
* @param  {bool} [shadow] 是否呈现阴影（默认：无）
* @param  {Object} [opts] 控件参数对象（参见实例）
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @example
*  <span style='color:#F00; font-weight:bold'>JS:</span>
* 示例1:传入基本数据
*  (new edu.ui.UserUI).load("div","#09F",false);
* 示例2：传入选择对象
*   var opts = {
*       lines: 13, // 绘制行数
*       length: 7, // 每行长度
*       width: 4, // 线条粗细
*       radius: 10, // 内圆半径
*       corners: 1, // 角落圆度 (0..1)
*       rotate: 0, // 旋转抵消
*       color: "#fff", // #rgb or #rrggbb
*       speed: 1, // Rounds per second
*       trail: 60, // Afterglow percentage
*       shadow: true, // 是否呈现阴影
*       hwaccel: false, // Whether to use hardware acceleration
*       className: 'spinner', // The CSS class to assign to the spinner
*       zIndex: 2e9, // The z-index (defaults to 2000000000)
*       top: 'auto', // Top position relative to parent in px
*       left: 'auto' // Left position relative to parent in px
*   };
*  ui.userui.load('id',opts);
* @requires spin.js
* @returns Spinner Object
*/
edu.ui.UserUI.prototype.load = function (elementId, color, shadow, opts) {
    document.getElementById(elementId).innerHTML = "";
    var opt = null, target;
    if (arguments.length === 2 && typeof pots !== "undefined") {
        opt = opts;
    }
    if (arguments.length === 1) {
        opt = {
            lines: 13,
            // 绘制行数
            length: 7,
            // 每行长度
            width: 4,
            // 线条粗细
            radius: 10,
            // 内圆半径
            corners: 1,
            // 角落圆度 (0..1)
            rotate: 0,
            // 旋转抵消
            color: "#09F",
            // #rgb or #rrggbb
            speed: 1,
            // Rounds per second
            trail: 60,
            // Afterglow percentage
            shadow: false,
            // 是否呈现阴影
            hwaccel: false,
            // Whether to use hardware acceleration
            className: "spinner",
            // The CSS class to assign to the spinner
            zIndex: 2e9,
            // The z-index (defaults to 2000000000)
            top: "auto",
            // Top position relative to parent in px
            left: "auto"
        };
    }
    if (arguments.length === 3 && typeof color !== "undefined" && typeof shadow !== "undefined") {
        opt = {
            lines: 13,
            // 绘制行数
            length: 7,
            // 每行长度
            width: 4,
            // 线条粗细
            radius: 10,
            // 内圆半径
            corners: 1,
            // 角落圆度 (0..1)
            rotate: 0,
            // 旋转抵消
            color: color,
            // #rgb or #rrggbb
            speed: 1,
            // Rounds per second
            trail: 60,
            // Afterglow percentage
            shadow: shadow,
            // 是否呈现阴影
            hwaccel: false,
            // Whether to use hardware acceleration
            className: "spinner",
            // The CSS class to assign to the spinner
            zIndex: 2e9,
            // The z-index (defaults to 2000000000)
            top: "auto",
            // Top position relative to parent in px
            left: "auto"
        };
    }
    target = document.getElementById(elementId);
    return new Spinner(opt).spin(target);
};

/**
* 空数据提示
* @param {String} printInfo 打印信息
* @param {String} elementId 加载元素ID
* @param {object} [{color: '#F60',fontSize: '14px',fontWeight:'bold'}]  [可选]字体参数对象
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @example 
*  <span style='color:#F00; font-weight:bold'>JS:</span>
*  (new edu.ui.UserUI).nullData('暂无数据','div1',{color: '#F60',fontSize: '14px',fontWeight:'bold'});
*/
edu.ui.UserUI.prototype.nullData = function (printInfo, elementId, fontParam) {
    var P = {
        color: "#F60",
        fontSize: "14px",
        fontWeight: "bold"
    }, target;
    if (typeof fontParam !== "undefined") {
        if ("color" in fontParam) {
            if (fontParam.color === "") {
                return;
            }
            P.color = fontParam.color;
        }
        if ("fontSize" in fontParam) {
            if (fontParam.fontSize === "") {
                return;
            }
            P.fontSize = fontParam.fontSize;
        }
        if ("" in fontParam) {
            if (fontParam.fontWeight === "") {
                return;
            }
            P.fontWeight = fontParam.fontWeight;
        }
    }
    target = document.getElementById(elementId);
    target.innerHTML = "";
    target.style.textAlign = "center";
    target.style.padding = "30px 0";
    target.style.color = P.color;
    target.style.fontSize = P.fontSize;
    target.style.fontWeight = P.fontWeight;
    target.innerHTML = printInfo;
};

/**
* 弹框插件
* @class 用户弹窗
* @param {object} params 参数设置对象
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @namespace edu.ui (页面UI)
* @version v1.0
*/
var edu = edu || {};

edu.ui = edu.ui || {};

edu.ui.Box = function (params) {
    var _params = {
        eventElementName: "edu_event_element",
        boxElementId: "edu_box_element",
        bgElementId: "box_background",
        borderStyle: "solid",
        borderColor: "#333",
        borderWidth: "5px",
        zindex: "1000",
        isClose: true
    };
    if (typeof params !== "undefined") {
        if ("eventElementName" in params) {
            _params.eventElementName = params.eventElementName;
        }
        if ("boxElementId" in params) {
            _params.boxElementId = params.boxElementId;
        }
        if ("bgElementId" in params) {
            _params.bgElementId = params.bgElementId;
        }
        if ("borderStyle" in params) {
            _params.borderStyle = params.borderStyle;
        }
        if ("borderColor" in params) {
            _params.borderColor = params.borderColor;
        }
        if ("borderWidth" in params) {
            _params.borderWidth = params.borderWidth;
        }
        if ("zindex" in params) {
            _params.zindex = params.zindex;
        }
        if ("isClose" in params) {
            _params.isClose = params.isClose;
        }
    }
    this.getParams = function () {
        return _params;
    };
};

edu.ui.Box.prototype = {
    /**
    * 初始化
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *  (new edu.ui.Box()).init();
    */
    init: function () {
        var _this = this, paramsObj = _this.getParams(), e = $("[ name = " + paramsObj.eventElementName + "]"), w, user_element, user_html, box_html;
        //display, headStyle;
        function showClick() {
            //var _this = this;
            var o, itop, ileft;
            $("body").css({
                "overflow-x": "hidden",
                "overflow-y": "hidden"
            });
            $("#" + paramsObj.bgElementId).css({
                position: "absolute",
                top: 0,
                left: 0,
                "margin-left": "1px",
                "margin-top": "1px",
                "background-color": "#000000",
                height: function () {
                    return $(document).height();
                },
                "-moz-opacity": "0.3",
                opacity: "0.3",
                filter: "alpha(opacity=30)",
                overflow: "hidden",
                width: function () {
                    return $(document).width();
                },
                "z-index": "999"
            });
            //e.preventDefault();
            o = $("#" + paramsObj.boxElementId);
            itop = (document.documentElement.clientHeight - o.height()) / 2 + document.documentElement.scrollTop + document.body.scrollTop;
            ileft = (document.documentElement.clientWidth - o.width()) / 2 + document.documentElement.scrollLeft + document.body.scrollLeft;
            o.css({
                position: "absolute",
                top: itop + "px",
                left: ileft + "px",
                width: w
            }).show();
        }
        e.each(function () {
            $(this).bind("click", function () {
                showClick();
            });
        });
        //$('body').append('<div id="' + paramsObj.bgElementId + '"></div>');//添加一个背景层
        //var w = $('#' + paramsObj.boxElementId + ' div').width();//首先获取用户设置的元素宽度，将赋值给外层ID，IE6\7 无法自适应
        if ($("box_background").length === 0) {
            $("body").append('<div id="' + paramsObj.bgElementId + '"></div>');
        }
        w = null;
        //首先获取用户设置的元素宽度，将赋值给外层ID，解决IE6\7 无法自适应
        if ($("#edu_win_body").length === 0) {
            w = $("#" + paramsObj.boxElementId + " >").width();
        } else {
            w = $("#edu_win_body >").width();
        }
        user_element = $("#" + paramsObj.boxElementId);
        user_element.css({
            "z-index": paramsObj.zindex,
            display: "none",
            "border-style": paramsObj.borderStyle,
            "border-color": paramsObj.borderColor,
            "border-width": paramsObj.borderWidth,
            "border-top-style": "none"
        });
        user_html = user_element.html();
        box_html = "";
        if (paramsObj.borderWidth === "") {
            user_element.html("").html(box_html);
        }
        $("#edu_win_close").bind({
            click: function () {
                _this.close();
            },
            mouseover: function () {
                $("#edu_win_close").css("background-color", "#e04343");
            },
            mouseout: function () {
                $("#edu_win_close").css("background-color", "#c75050");
            }
        });
        window.EduBox = window.EduBox || this;
    },
    /**
    * 关闭窗口，可供外部方法调用
    * @param {object} [obj] 参数对象 {boxElementId: '', callback: function(){}}
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *  EduBox.close(function(){//回调函数});
    */
    close: function (obj) {
        var _this = this, paramsObj = _this.getParams(), callback = null;
        if (typeof obj !== "undefined") {
            if ("boxElementId" in obj) {
                paramsObj.boxElementId = obj.boxElementId;
            }
            if ("callback" in obj) {
                callback = obj.callback();
            }
        }
        $("body").css({
            "overflow-x": "",
            "overflow-y": ""
        });
        $("#" + paramsObj.bgElementId).attr("style", "");
        $("#" + paramsObj.boxElementId).hide();
        if (callback !== null) {
            callback();
        }
    }
};

/*global window:false*/
var edu = edu || {};

edu.Box = edu.Box || {};

edu.Box.WinLogin = {
    //guid
    guid: "",
    //是否需要验证码
    isVerify: false,
    click: function () {
        var that = edu.Box.WinLogin, pass = true, //输入验证通过？
        inputs = $("#" + edu.config.winLogin.winBodyId + " input"), postData = {
            name: "",
            pwd: ""
        }, verifyCode;
        inputs.each(function (index, element) {
            var id = $(element).attr("id"), content = $(element).val();
            if (content.length === 0 && id !== edu.config.winLogin.input.VerifyCodeId) {
                $(element).addClass(edu.config.winLogin.css.error);
                pass = false;
            } else {
                if (edu.config.winLogin.input.userNameId === id) {
                    postData.name = $(element).val();
                }
                if (edu.config.winLogin.input.passWordId === id) {
                    postData.pwd = $(element).val();
                }
            }
        });
        //需要验证码
        if (that.isVerify) {
            verifyCode = $("#" + edu.config.winLogin.input.VerifyCodeId).val();
            if (verifyCode.length <= 0 || verifyCode.length > 4) {
                pass = false;
                //验证码输入错误提示
                $("#" + edu.config.winLogin.input.VerifyCodeId).addClass(edu.config.winLogin.css.error);
            } else {
                postData.VerifyId = that.guid;
                postData.VerifyCode = verifyCode;
            }
        }
        if (pass) {
            //登录中...提示
            $("#" + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.logining);
            $("#edu-win-login").button("option", "disabled", true);
            //提交操作
            (function () {
                var api = new edu.command.Api(edu.config.isDebug()), url = api.createFullUrl({
                    project: edu.config.winLogin.project_name,
                    path: edu.config.winLogin.user_interface
                });
                function rCallback(data) {
                    //取消登录中提示
                    $("#" + edu.config.winLogin.errorBoxDivID).html("");
                    $("#edu-win-login").button("option", "disabled", false);
                    //需要验证码 231
                    if (data.status === edu.config.winLogin.status.needVerify.key) {
                        try {
                            that.refreshGUID();
                            $("#" + edu.config.winLogin.verifyCodeDivID).show();
                            that.isVerify = true;
                        } catch (e) {
                            //接口异常
                            $("#" + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.hint.b);
                        }
                        return;
                    }
                    if (api.valiReturnData(data)) {
                        //正确处理
                        //添加passport
                        if ($.cookie) {
                            $.cookie(edu.config.winLogin.passportName, data.Passport, {
                                expires: edu.config.winLogin.cookieExpires,
                                path: edu.config.winLogin.cookiePath
                            });
                        }
                        that.callback(data);
                    } else {
                        //验证码错误 230
                        if (data.status === edu.config.winLogin.status.verifyError.key) {
                            $("#" + edu.config.winLogin.input.VerifyCodeId).addClass(edu.config.winLogin.css.error);
                            $("#" + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.status.verifyError.value);
                            return;
                        }
                        //密码错误 :102
                        if (data.status === edu.config.winLogin.status.pwdError.key) {
                            $("#" + edu.config.winLogin.input.passWordId).addClass(edu.config.winLogin.css.error);
                            $("#" + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.status.pwdError.value);
                            return;
                        }
                        //其他错误
                        $("#" + edu.config.winLogin.errorBoxDivID).html(api.analysisStatus(data.status, ""));
                    }
                }
                function eCallback() {
                    //接口异常
                    $("#edu-win-login").button("option", "disabled", false);
                    $("#" + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.hint.b);
                }
                api.apiRequest({
                    url: url,
                    postdata: postData,
                    redirect: edu.config.winLogin.redirect,
                    type: "post"
                }, rCallback, eCallback);
            })();
        }
    },
    //如需回调请重写此方法
    callback: function (data) {
        if (window.console) {
            console.log(data);
        }
        //var char = window.location.href.indexOf('?') > -1 ? '&' : '?';
        window.location.href = window.location.href;
    },
    //关闭窗口
    close: function () {
        $("#" + edu.config.winLogin.winBodyId).dialog("close");
    },
    //GUID
    refreshGUID: function () {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), uuid = new Array(36), rnd = 0, url = "", r, i;
        $("#" + edu.config.winLogin.verifyCodeImgId).attr("src", edu.config.winLogin.verifyLoadImgUrl);
        for (i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = "-";
            } else if (i === 14) {
                uuid[i] = "4";
            } else {
                if (rnd <= 2) {
                    rnd = 33554432 + Math.random() * 16777216 || 0;
                }
                r = rnd && 15;
                rnd = rnd > 4;
                uuid[i] = chars[i === 19 ? r && 3 || 8 : r];
            }
        }
        this.guid = uuid.join("");
        if (edu.config.isDebug()) {
            url = edu.config.winLogin.test_verifyCode_interface.replace("@id", this.guid);
        } else {
            url = edu.config.winLogin.verifyCode_interface.replace("@id", this.guid);
        }
        $("#" + edu.config.winLogin.verifyCodeImgId).attr("src", url);
    }
};

$(function () {
    var i, len;
    function myBind() {
        $("#" + edu.config.winLogin.winBodyId).attr("title", edu.config.winLogin.title).dialog(edu.config.winLogin.dialog_param);
        $("#edu-win-login").button().click(edu.Box.WinLogin.click);
    }
    try {
        edu.config.winLogin.createWindow();
        if (typeof edu.config.winLogin.button === "string") {
            $("#" + edu.config.winLogin.button).bind("click", myBind);
        }
        if (edu.config.winLogin.button instanceof Array) {
            for (i = 0, len = edu.config.winLogin.button.length; i < len; i++) {
                $("#" + edu.config.winLogin.button[i]).bind("click", myBind);
            }
        }
    } catch (e) {
        throw new Error("创建登录窗体失败; 额外信息：" + e);
    }
});