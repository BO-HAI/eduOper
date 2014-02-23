
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
    var prototype = object(baseObj.prototype);
    prototype.constructor = obj;
    obj.prototype = prototype;

    function object(o) {
        function F() { };
        F.prototype = o;
        return new F();
    };
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
    $('#' + element).pagination(
        pageCount,
        {
            callback: callback,//为翻页调用次函数。
            prev_text: "上一页",
            next_text: "下一页",
            current_page: pageIndex,
            items_per_page: pageSize, //每页的数据个数
            link_to: link == '' ? '#' : link,//分页的链接 默认是“#”[?id=0]
            obj_this: objthis
        }
    );
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
    (new edu.ui.EduUI()).inheritPrototype(edu.ui.EduUI, edu.ui.UserUI);
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
    document.getElementById(elementId).innerHTML = '';
    var opt = null;
    if (arguments.length == 2 && typeof (pots) != "undefined") {
        opt = opts;
    };
    if (arguments.length == 1) {
        opt = {
            lines: 13, // 绘制行数
            length: 7, // 每行长度
            width: 4, // 线条粗细
            radius: 10, // 内圆半径
            corners: 1, // 角落圆度 (0..1)
            rotate: 0, // 旋转抵消
            color: "#09F", // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // 是否呈现阴影
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
    };


    if (arguments.length == 3 && typeof (color) != "undefined" && typeof (shadow) != "undefined") {
        opt = {
            lines: 13, // 绘制行数
            length: 7, // 每行长度
            width: 4, // 线条粗细
            radius: 10, // 内圆半径
            corners: 1, // 角落圆度 (0..1)
            rotate: 0, // 旋转抵消
            color: color, // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: shadow, // 是否呈现阴影
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
    };


    var target = document.getElementById(elementId);
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
        color: '#F60',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    if (typeof fontParam != 'undefined') {
        if ('color' in fontParam) {
            if (fontParam.color == '') {
                return;
            };
            P.color = fontParam.color;
        };
        if ('fontSize' in fontParam) {
            if (fontParam.fontSize == '') {
                return;
            };
            P.fontSize = fontParam.fontSize;
        };
        if ('' in fontParam) {
            if (fontParam.fontWeight == '') {
                return;
            };
            P.fontWeight = fontParam.fontWeight;
        };
    };

    var target = document.getElementById(elementId);
    target.innerHTML = "";
    target.style.textAlign = "center";
    target.style.padding = "30px 0";
    target.style.color = P.color;
    target.style.fontSize = P.fontSize;
    target.style.fontWeight = P.fontWeight;
    target.innerHTML = printInfo;
};

/**
* JUI:bind-accordion自定义绑定事件（解决问题：jui_accordion 在使用knockout绑定数据时无效果）;参考:http://jsfiddle.net/bohai/MXWRY/
* @param {Function} updateFun 更新回调函数(jui.accordion绑定设置)
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @example 
* <span style='color:#06F; font-weight:bold'>HTML:</span>
*  //ko必须绑定一个名为'accordion'自定义绑定事件
*  &lt;div data-bind="accordion:{} &gt;&lt;/div&gt; 
*  <span style='color:#F00; font-weight:bold'>JS:</span>
* //jui与ko兼容创建Accordion控件
* (new edu.ui.UserUI).jk_bindingAccordion(
*	function () {
*		$("#ko_div").accordion({
*			activate:
*				function (event, ui) {
*					$("#relate").fadeOut("fast");
*				},
*			heightStyle: "content",
*			collapsible: true,
*			icons: false
*		});
*	}
* );
* @requires jquery-1.9.1;jquery-ui-1.10.0;Knockout-2.2.1.js
*/
edu.ui.UserUI.prototype.jk_bindingAccordion = function (updateFun) {
    ko.bindingHandlers.accordion = {
        //初始化
        init: function (element, valueAccessor) {
            var options = valueAccessor() || {};
            setTimeout(function () {
                $(element).accordion({ heightStyle: "content", collapsible: true });

            }, 0);

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).accordion("destroy");

            });
        },
        //更新
        update: function (element, valueAccessor) {
            //var options = valueAccessor() || {};
            //$(element).accordion("destroy").accordion(options);
            updateFun();

        }
    };
};
/**
* paging自定义绑定事件:分页控件绑定
* @param {int} pageCount 总页数
* @param {int} pageIndex 当前页
* @param {int} pageSize 页大小
* @param {String} link 分页链接 默认为#
* @param {Function} callbackFun(index,jq) 翻页后的回调函数(index会自动+1)
* @param {object} objthis 本页面JS对象
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @example 
*  <span style='color:#06F; font-weight:bold'>HTML:</span>
*  //ko必须绑定一个名为'paging'自定义绑定事件
*  //class定义样式;flickr
*   &lt;div id="Pagination" class="flickr" data-bind="paging:{}"&gt;&lt;/div&gt;
*  <span style='color:#F00; font-weight:bold'>JS:</span>
*  (new edu.ui.UserUI).jk_paging(60, 0, 20, "?lessonyear=2013", viewModel.update);
*  @requires jquery-1.9.1;jquery.pagination.js;jquery.pagination.css;
*/
edu.ui.UserUI.prototype.jk_paging = function (pageCount, pageIndex, pageSize, link, callback, objthis) {
    var _this = null;
    if (typeof objthis != 'undefined') {
        _this = objthis;
    };
    ko.bindingHandlers.paging = {
        init: function (element) {
            if ($("#Pagination").html().length == '') {
                $("#Pagination").pagination(pageCount, {
                    callback: callback,//为翻页调用次函数。
                    prev_text: "上一页",
                    next_text: "下一页",
                    current_page: pageIndex,
                    items_per_page: pageSize, //每页的数据个数
                    link_to: link == '' ? '#' : link,//分页的链接 默认是“#”[?id=0]
                    obj_this: _this
                });
            };
        },
        update: function (element) {

        }
    };
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
    var _params = { eventElementName: 'edu_event_element', boxElementId: 'edu_box_element', bgElementId: 'box_background', borderStyle: 'solid', borderColor: '#333', borderWidth: '5px', zindex: '1000', isClose: true };

    if (typeof params != 'undefined') {
        if ('eventElementName' in params) {
            _params.eventElementName = params.eventElementName;
        };

        if ('boxElementId' in params) {
            _params.boxElementId = params.boxElementId;
        };

        if ('bgElementId' in params) {
            _params.bgElementId = params.bgElementId;
        };

        if ('borderStyle' in params) {
            _params.borderStyle = params.borderStyle;
        };

        if ('borderColor' in params) {
            _params.borderColor = params.borderColor;
        };

        if ('borderWidth' in params) {
            _params.borderWidth = params.borderWidth;
        };

        if ('zindex' in params) {
            _params.zindex = params.zindex;
        };
        if ('isClose' in params) {
            _params.isClose = params.isClose;
        };
    };


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
        var _this = this;
        var paramsObj = _this.getParams();
        var e = $('[ name = ' + paramsObj.eventElementName + ']');
        e.each(function () {
            $(this).bind('click', function () {
                showClick();
            });
        });
        //if (typeof window.EduBox == 'undefined') {

            //$('body').append('<div id="' + paramsObj.bgElementId + '"></div>');//添加一个背景层
        //var w = $('#' + paramsObj.boxElementId + ' div').width();//首先获取用户设置的元素宽度，将赋值给外层ID，IE6\7 无法自适应

        if (($('box_background')).length == 0) {
            $('body').append('<div id="' + paramsObj.bgElementId + '"></div>');//添加一个背景层
        }

        var w = null;
        //首先获取用户设置的元素宽度，将赋值给外层ID，解决IE6\7 无法自适应
        if (($('#edu_win_body')).length === 0) {
            w = $('#' + paramsObj.boxElementId + ' >').width();
        } else {
            w = $('#edu_win_body >').width();
        }

            var user_element = $('#' + paramsObj.boxElementId);
            user_element.css({
                'z-index': paramsObj.zindex,
                'display': 'none',
                'border-style': paramsObj.borderStyle,
                'border-color': paramsObj.borderColor,
                'border-width': paramsObj.borderWidth,
                'border-top-style': "none"
            });

            var user_html = user_element.html();

            var box_html = '';
            if (paramsObj.borderWidth == '') {
                box_html = user_html;
            } else {

                var display = paramsObj.isClose == false ? 'display:none;' : '';
                var headStyle = paramsObj.borderWidth === '0px' ? 'display:none;' : '';

                if (($('#edu_win_body')).length > 0) {
                   user_html = $('#edu_win_body').html();
                }
                box_html = '<div id="edu_win_head" style="background-color:#333; padding-left:90%; height:22px;'+headStyle+'">' +
                     '<div id="edu_win_close" style="width:30px;height:17px;line-height:15px; text-align:center; ' +
                     'background-color:#c75050;color:#FFF; cursor:pointer;' + display + '">x</div>' +
                      '</div><div id="edu_win_body">' + user_html + '</div>';
            };


            user_element.html('').html(box_html);

            $('#edu_win_close').bind({
                click: function () {
                    _this.close();
                },
                mouseover: function () {
                    $('#edu_win_close').css('background-color', '#e04343');
                },
                mouseout: function () {
                    $('#edu_win_close').css('background-color', '#c75050');
                }
            });
            window.EduBox = window.EduBox || this;
        //};

        function showClick() {
            var _this = this;
            $('body').css({ "overflow-x": "hidden", "overflow-y": "hidden" });

            $('#' + paramsObj.bgElementId).css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "margin-left": "1px",
                "margin-top": "1px",
                "background-color": "#000000",
                "height": function () { return $(document).height(); },
                "-moz-opacity": "0.3",
                "opacity": "0.3",
                "filter": "alpha(opacity=30)",
                "overflow": "hidden",
                "width": function () { return $(document).width(); },
                "z-index": "999"
            });

            //e.preventDefault();

            var o = $("#" + paramsObj.boxElementId);
            var itop = (document.documentElement.clientHeight - o.height()) / 2 + document.documentElement.scrollTop + document.body.scrollTop;
            var ileft = (document.documentElement.clientWidth - o.width()) / 2 + document.documentElement.scrollLeft + document.body.scrollLeft;
            o.css({
                position: "absolute",
                top: itop + "px",
                left: ileft + "px",
                width: w
            }).show();
        };
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
        var _this = this,
            paramsObj = _this.getParams(),
            callback = null;

        if (typeof obj !== 'undefined') {
            if ('boxElementId' in obj) {
                paramsObj.boxElementId = obj.boxElementId;
            }

            if ('callback' in obj) {
                callback = obj.callback();
            }
        }

        $('body').css({ "overflow-x": "", "overflow-y": "" });
        $('#' + paramsObj.bgElementId).attr('style', '');
        $('#' + paramsObj.boxElementId).hide();

        if (callback !== null) {
            callback();
        }
    }
};



//=========fgnass.github.com/spin.js#v1.2.8============
!function (window, document, undefined) {

    /**
     * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
     * Licensed under the MIT license
     */

    var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
      , animations = {} /* Animation rules keyed by their name */
      , useCssAnimations

    /**
     * Utility function to create elements. If no tag name is given,
     * a DIV is created. Optionally properties can be passed.
     */
    function createEl(tag, prop) {
        var el = document.createElement(tag || 'div')
          , n

        for (n in prop) el[n] = prop[n]
        return el
    }

    /**
     * Appends children and returns the parent.
     */
    function ins(parent /* child1, child2, ...*/) {
        for (var i = 1, n = arguments.length; i < n; i++)
            parent.appendChild(arguments[i])

        return parent
    }

    /**
     * Insert a new stylesheet to hold the @keyframe or VML rules.
     */
    var sheet = function () {
        var el = createEl('style', { type: 'text/css' })
        ins(document.getElementsByTagName('head')[0], el)
        return el.sheet || el.styleSheet
    }()

    /**
     * Creates an opacity keyframe animation rule and returns its name.
     * Since most mobile Webkits have timing issues with animation-delay,
     * we create separate rules for each line/segment.
     */
    function addAnimation(alpha, trail, i, lines) {
        var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
          , start = 0.01 + i / lines * 100
          , z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha)
          , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
          , pre = prefix && '-' + prefix + '-' || ''

        if (!animations[name]) {
            sheet.insertRule(
              '@' + pre + 'keyframes ' + name + '{' +
              '0%{opacity:' + z + '}' +
              start + '%{opacity:' + alpha + '}' +
              (start + 0.01) + '%{opacity:1}' +
              (start + trail) % 100 + '%{opacity:' + alpha + '}' +
              '100%{opacity:' + z + '}' +
              '}', sheet.cssRules.length)

            animations[name] = 1
        }
        return name
    }

    /**
     * Tries various vendor prefixes and returns the first supported property.
     **/
    function vendor(el, prop) {
        var s = el.style
          , pp
          , i

        if (s[prop] !== undefined) return prop
        prop = prop.charAt(0).toUpperCase() + prop.slice(1)
        for (i = 0; i < prefixes.length; i++) {
            pp = prefixes[i] + prop
            if (s[pp] !== undefined) return pp
        }
    }

    /**
     * Sets multiple style properties at once.
     */
    function css(el, prop) {
        for (var n in prop)
            el.style[vendor(el, n) || n] = prop[n]

        return el
    }

    /**
     * Fills in default values.
     */
    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i]
            for (var n in def)
                if (obj[n] === undefined) obj[n] = def[n]
        }
        return obj
    }

    /**
     * Returns the absolute page-offset of the given element.
     */
    function pos(el) {
        var o = { x: el.offsetLeft, y: el.offsetTop }
        while ((el = el.offsetParent))
            o.x += el.offsetLeft, o.y += el.offsetTop

        return o
    }

    var defaults = {
        lines: 12,            // The number of lines to draw
        length: 7,            // The length of each line
        width: 5,             // The line thickness
        radius: 10,           // The radius of the inner circle
        rotate: 0,            // Rotation offset
        corners: 1,           // Roundness (0..1)
        color: '#000',        // #rgb or #rrggbb
        speed: 1,             // Rounds per second
        trail: 100,           // Afterglow percentage
        opacity: 1 / 4,         // Opacity of the lines
        fps: 20,              // Frames per second when using setTimeout()
        zIndex: 2e9,          // Use a high z-index by default
        className: 'spinner', // CSS class to assign to the element
        top: 'auto',          // center vertically
        left: 'auto',         // center horizontally
        position: 'relative'  // element position
    }

    /** The constructor */
    function Spinner(o) {
        if (!this.spin) return new Spinner(o)
        this.opts = merge(o || {}, Spinner.defaults, defaults)
    }

    Spinner.defaults = {}

    merge(Spinner.prototype, {
        spin: function (target) {
            this.stop()
            var self = this
              , o = self.opts
              , el = self.el = css(createEl(0, { className: o.className }), { position: o.position, width: 0, zIndex: o.zIndex })
              , mid = o.radius + o.length + o.width
              , ep // element position
              , tp // target position

            if (target) {
                target.insertBefore(el, target.firstChild || null)
                tp = pos(target)
                ep = pos(el)
                css(el, {
                    left: (o.left == 'auto' ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
                    top: (o.top == 'auto' ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + 'px'
                })
            }

            el.setAttribute('aria-role', 'progressbar')
            self.lines(el, self.opts)

            if (!useCssAnimations) {
                // No CSS animation support, use setTimeout() instead
                var i = 0
                  , fps = o.fps
                  , f = fps / o.speed
                  , ostep = (1 - o.opacity) / (f * o.trail / 100)
                  , astep = f / o.lines

                ; (function anim() {
                    i++;
                    for (var s = o.lines; s; s--) {
                        var alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity)
                        self.opacity(el, o.lines - s, alpha, o)
                    }
                    self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
                })()
            }
            return self
        },

        stop: function () {
            var el = this.el
            if (el) {
                clearTimeout(this.timeout)
                if (el.parentNode) el.parentNode.removeChild(el)
                this.el = undefined
            }
            return this
        },

        lines: function (el, o) {
            var i = 0
              , seg

            function fill(color, shadow) {
                return css(createEl(), {
                    position: 'absolute',
                    width: (o.length + o.width) + 'px',
                    height: o.width + 'px',
                    background: color,
                    boxShadow: shadow,
                    transformOrigin: 'left',
                    transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.radius + 'px' + ',0)',
                    borderRadius: (o.corners * o.width >> 1) + 'px'
                })
            }

            for (; i < o.lines; i++) {
                seg = css(createEl(), {
                    position: 'absolute',
                    top: 1 + ~(o.width / 2) + 'px',
                    transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
                    opacity: o.opacity,
                    animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
                })

                if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), { top: 2 + 'px' }))

                ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
            }
            return el
        },

        opacity: function (el, i, val) {
            if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
        }

    })

    /////////////////////////////////////////////////////////////////////////
    // VML rendering for IE
    /////////////////////////////////////////////////////////////////////////

    /**
     * Check and init VML support
     */
    ; (function () {

        function vml(tag, attr) {
            return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
        }

        var s = css(createEl('group'), { behavior: 'url(#default#VML)' })

        if (!vendor(s, 'transform') && s.adj) {

            // VML support detected. Insert CSS rule ...
            sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

            Spinner.prototype.lines = function (el, o) {
                var r = o.length + o.width
                  , s = 2 * r

                function grp() {
                    return css(
                      vml('group', {
                          coordsize: s + ' ' + s,
                          coordorigin: -r + ' ' + -r
                      }),
                      { width: s, height: s }
                    )
                }

                var margin = -(o.width + o.length) * 2 + 'px'
                  , g = css(grp(), { position: 'absolute', top: margin, left: margin })
                  , i

                function seg(i, dx, filter) {
                    ins(g,
                      ins(css(grp(), { rotation: 360 / o.lines * i + 'deg', left: ~~dx }),
                        ins(css(vml('roundrect', { arcsize: o.corners }), {
                            width: r,
                            height: o.width,
                            left: o.radius,
                            top: -o.width >> 1,
                            filter: filter
                        }),
                          vml('fill', { color: o.color, opacity: o.opacity }),
                          vml('stroke', { opacity: 0 }) // transparent stroke to fix color bleeding upon opacity change
                        )
                      )
                    )
                }

                if (o.shadow)
                    for (i = 1; i <= o.lines; i++)
                        seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

                for (i = 1; i <= o.lines; i++) seg(i)
                return ins(el, g)
            }

            Spinner.prototype.opacity = function (el, i, val, o) {
                var c = el.firstChild
                o = o.shadow && o.lines || 0
                if (c && i + o < c.childNodes.length) {
                    c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
                    if (c) c.opacity = val
                }
            }
        }
        else
            useCssAnimations = vendor(s, 'animation')
    })()

    if (typeof define == 'function' && define.amd)
        define(function () { return Spinner })
    else
        window.Spinner = Spinner

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
        callback: function () { return false; },
        obj_this: null//参见更新：20130427
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
                }
                else {
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
                return function (evt) { return pageSelected(page_id, evt); }
            }
            // Helper function for generating a single link (or a span tag if it'S the current page)
            var appendItem = function (page_id, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
                appendopts = jQuery.extend({ text: page_id + 1, classes: "current" }, appendopts || {});
                if (page_id == current_page) {
                    var lnk = $("<span class='current'>" + (appendopts.text) + "</span>");
                }
                else {
                    var lnk = $("<a>" + (appendopts.text) + "</a>")
                        .bind("click", getClickHandler(page_id))
                        .attr('href', opts.link_to.replace(/__id__/, page_id));


                }
                if (appendopts.classes) { lnk.removeAttr('class'); lnk.addClass(appendopts.classes); }
                panel.append(lnk);
            }
            // Generate "Previous"-Link
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem(current_page - 1, { text: opts.prev_text, classes: "disabled" });
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
                appendItem(current_page + 1, { text: opts.next_text, classes: "disabled" });
            }
        }

        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = jQuery(this);
        // Attach control functions to the DOM element 
        this.selectPage = function (page_id) { pageSelected(page_id); }
        this.prevPage = function () {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function () {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            }
            else {
                return false;
            }
        }
        // When all initialisation is done, draw the links
        drawLinks();
    });
};
