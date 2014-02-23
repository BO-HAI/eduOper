/*global document:false, clearTimeout:false, location:false, setTimeout:false, unescape:false, window:false*/
//=====Version：2.4.0  131030=====
//[Date]：
//2013-08-15 -- 2013-10-30;
//[Contain]：
//edu.command.js:
//1、JSHint: 修改不规范的Code
//2、Tools对象formatDate函数修改对特殊格式(带T)时间字符串的解析，放弃时间字符串毫秒部分，时区部分在config中定义
//3、Tools对象formatDate函数在第二个参数添加默认值，在漏传情况下不会引发异常（8-27）
//4、Api对象添加createFullUrl函数，创建完成接口URL地址，可以是适合多项目同时存在（9-12）
//5、去除debug下console的使用（2013-9-23）
//6、Api.createFullUrl函数中对比用户传递的项目名称是将被转换为小写然后在进行比较（2013-9-23）
//7、valiReturnData函数对比返回值状态时，会将用户传入状态格式化为字符串进行比较（2013-9-24）
//8、修改apiRequest-post方法回调地址（2013-10-24）
//9、apiRequest-post、put方法禁止重发（2013-10-24）
//10、Api对象添加get、post方法，属于apiRequest的简单调用；（2013-10-30）

//edu.ui.js：
//1、修改Box对象在多个窗体存在的BUG，页面加载创建Box对象时会读取用户指定元素内容，并修改元素内容，
//但第二次创建对象时，指定元素内容没有恢复到初始内容，导致内容重复，样式混乱；
//2、修改jq语法错误（2013-08-29）

//edu_deilog.js：
//1、新增全站统一登录窗体（2013-09-23）
//*  a、优化初始化绑定
//*  b、合并config文件
//2、对窗体样式进行调整，多数采用行内样式，以避免CSS的冲突（2013-09-25）
//3、修改窗体宽度
//4、压缩文件中不再包含config

//config：
//1、添加sms接口请求对象，apiRequest参数中直接传入 edu.config.sms即可（9-12）
//2、添加project对象，保存各类项目的域名（9-12）
//3、修改testDomain对象的值，测试地址变更（2013-9-24）
//4、添加isDebug函数中域名为空字符串的判断（2013-9-25）
//5、添加登陆窗体config信息
//6、添加新项目域名（2013-10-24）


/**
* 工具类
* @class 职业网校JS使用工具
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @version v1.0
* @namespace edu.command (命令函数集合)
* @example 
*  <span style='color:#F00; font-weight:bold'>JS:</span>
* var comm = edu.command || {};
* comm.api = new comm.Tools();
*/
var edu = edu || {};
edu.command = edu.command || {};
edu.command.Tools = function () { };

edu.command.Tools.prototype = {
    constructor: edu.command.Tools,
    /**
    * 创建GUID
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.createGUID();
    * @requires 无
    * @returns string
    */
    createGUID: function () {
        var guid = "",
            n, i, len = 32;
        for (i = 1; i <= len; i++) {
            n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
                guid += "-";
            }

        }
        return guid;
    },
    /**
    * 获取URL参数值,获取单个值
    * @param  {string} name 参数名称
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.getQueryString("id");
    * @requires 无
    * @returns 参数不存在返回null
    */
    getQueryString: function (name) {
        var reg = new RegExp(edu.config.tools.getQueryString.regexpString.replace('@name', name), "i"),
            r = window.location.search.substr(1).match(reg);

        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    },
    /**
    * 获取URL参数值对象
    * @param  {string} url
    * @author  <a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.getQueryStringObj(url);
    * @requires 无
    * @returns 参数不存在返回{}
    */
    getQueryStringObj: function (url) {
        
        var search = url.slice(url.indexOf("?") + 1),
            result = {}, queryString = search || location.search.slice(1),
            re = edu.config.tools.getQueryStringObj.regexp,
            m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    },

    /**
    * 对象原型继承，子类原型继承父类副本原型（用于寄生组合式继承）
    * @param  {object} baseObj 父类（注意不是对象实体）
    * @param  {object} obj 子类（注意不是对象实体）
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * comm.tools.inheritPrototype(baseObj,obj);
    * @requires 无
    * @returns 无
    */
    inheritPrototype: function (baseObj, obj) {

        function object(o) {
            function F() { }
            F.prototype = o;
            return new F();
        }

        var prototype = object(baseObj.prototype);
        prototype.constructor = obj;
        obj.prototype = prototype;
    },

    /**
    * 对输入信息进行格式确认
    * @param  {object} obj 参数对象 { type:0,value:'*' }，长度比较参数对象{ type:valiType,value:'*',max:10,min:5 }
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *   //1: 电子邮件；2：固定电话（CN）；3：移动电话（CN）；4：邮编；5：长度
    *   (new edu.conmmand.Tools()).validation(1,'info');
    * @requires 无
    * @returns bool
    */
    validation: function (obj) {
        if (typeof obj === 'undefined') {
            return false;
        }

        if (!'type' in obj || !'value' in obj) {
            return false;
        }
        var regexps = edu.config.regexp,
            re;
        switch (obj.type) {
            //电子邮件
            case 1:
                re = regexps.mail;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //中国固定电话
            case 2:
                re = regexps.phone_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //中国移动电话（不是移动 联通的‘移动’,就是 ：移动）
            case 3:
                re = regexps.mobile_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //中国 邮编
            case 4:
                re = regexps.post_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //长度
            case 5:
                if (typeof obj.value !== 'string') {
                    return false;
                }
                if ('max' in obj && 'min' in obj) {
                    if (obj.value.length >= obj.min && obj.value.length <= obj.max) {
                        return true;
                    }
                }
                break;
        }
        return false;
    },

    /**
    * 格式化Date,按指定格式输出
    * @param  {string} dataStr 日期字符串
    * @param  {string} styleStr 样式字符串 例如：'yyyy-MM-dd hh:mm:ss'
    * @author  <a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *   (new edu.conmmand.Tools()).formatDate(
    *           'Sat Jul 20 2013 16:41:35 GMT+0800 (中国标准时间)',
    *           'yyyy-MM-dd hh:mm:ss');
    *   //2013-7-20 16:41:35
    * @requires 无
    * @returns bool
    */
    formatDate: function (dataStr, styleStr) {

        function createDate(_dateStr, _config) {
            var re = _config.regexp.date_t,
                T,
                gmt = _config.GMT === '' ? 0 : _config.GMT,
                s = 1000 * 60 * 60 * parseInt(gmt, 10),//换算毫秒
                len = _dateStr.indexOf('.') > -1 ? _dateStr.indexOf('.') : _dateStr.length; //适应 不带时区格式 2013-09-25T08:00:00 

            if (re.test(_dateStr)) {

                _dateStr = _dateStr.substring(0, len);
               T = _dateStr.replace(re,
                    function (a, day, time) {
                        day = day.replace(/-/g, '/') + ' ' + time;
                        //return new Date(Date.parse(day) + s);
                        return Date.parse(day) + s;
                    }
                );
                return new Date(parseInt(T, 10));
            }

            return new Date(_dateStr);
        }

        var config = edu.config.tools.formatDate,
            style = typeof styleStr === 'undefined' ? 'yyyy-MM-dd hh:mm:ss' : styleStr, 
            time = createDate(dataStr, config),
            k,
            o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, //小时
            "H+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3),  //季度
            "S": time.getMilliseconds() //毫秒
            },
            week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };

        if (/(y+)/.test(style)) {
            style = style.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(style)) {
            style = style.replace(
                RegExp.$1,
                ((RegExp.$1.length > 1) ?
                (RegExp.$1.length > 2 ?
                "\u661f\u671f" : "\u5468") : "") +
                week[time.getDay() + ""]);
        }
        for (k in o) {
            if (new RegExp("(" + k + ")").test(style)) {
                style = style.replace(
                    RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
                    );
            }
        }
        return style;
    }
};

/**
* API相关操作
* @class 职业网校接口相关操作
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @version v2.0 Bata
* @param {bool} debug 调试状态 默认false（非调试状态）
* @namespace edu.command (命令函数集合)
* @example 
*  <span style='color:#F00; font-weight:bold'>JS:</span>
* var comm = edu.command || {};
* //如果是调试状态应当传入参数 true
* comm.api = new comm.Api();//非调试状态
* comm.api = new comm.Api({ debug: true });
* debug.api = new comm.Api(true);//调试状态
*/

var edu = edu || {};
edu.command = edu.command || {};

edu.command.Api = function (debug) {

    //标识是否是调试状态；true调试状态；上线应改为false
    var _debug = false;

    if (typeof debug !== 'undefined' && typeof debug === 'boolean') {
        _debug = debug;
    }

    if (typeof debug !== 'undefined' && typeof debug === 'object') {
        _debug = debug.debug;
    }


    //get set
    this.getDebug = function () {
        return _debug;
    };
    this.setDebug = function (debug) {
        _debug = debug;
    };

};

edu.command.Api.prototype = {
    constructor: edu.command.Api,
    /**
	* aip请求方法
	* @param {object} reqObj<br/>
		url: string 【必选：请求地址】<br/>
		redirect: string  【psot & put 必选：回跳页面】默认是根目录下“callback.html”<br/>
		postdata:object  【psot & put 必选：表单元素键值对}{input1:'value1',input2:'value2'】<br/>
		para:string 【put  del必选：url中的参数，put提交必须包含 m=put , m=delete】<br/>
		[type]: string 【可选：默认get，delete/post/put/easy(读取本地静态文件)】<br/>
		[isTimeOut]:bool 【可选：默认true】是否启用Timeout<br/>
		[timeout]:int 【可选：默认30000，不启动isTimeOut的情况下为0】<br/>
		[allowRequestCount]:int  允许重复请求次数 默认：3<br/>
		[isResend]:bool 是否可以重发请求 默认：true<br/>
        [charset]:string [可选：默认UTF-8  字符集] 指定POST提交字符集<br/>
	* @param {Function} callback 回调函数
	* @param {Function} [error] 错误处理函数
	* @author <a href="mailto:bohai@gedu.org">bohai</a>、 
            post方法原作者:<a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
	* @example 
	* <span style='color:#F00; font-weight:bold'>JS:</span>
	*get：
	*comm.api.apiRequest({ url: userLessonUrl }, function (info) {//返回数据处理});
	*post:
	*var request = { 
		url: 'submit.aspx',
		para: 'm=post',
		redirect: 'callback.html',
		type: 'post',
		postdata: { name: '', pwd: '' } 
	};;
	*comm.api.apiRequest(request, function (info) { //返回数据处理 });
	*@requires Jquery-1.9.1.js +
	*/
    apiRequest: function (reqObj, callback, error) {

        if (
            (typeof reqObj === 'undefined' || typeof reqObj !== 'object') ||
            (typeof callback === 'undefined' || typeof callback !== 'function')
            ) {
            alert("参数错误！");
            return;
        }

        //创建一个请求对象
        function _getRequestObject(_reqObj) {
            var requestObj = {
                id: '',
                url: '',
                para: '',//URL传参
                redirect: '/callback.html',
                type: 'get',
                isTimeOut: true,//是否启用Timeout（启动该设置可能会造成多次请求均成功的结果，导致返回一个错误）
                timeout: 30000,
                timeoutId: null,//timeoutID,用于删除超时操作
                postdata: {},//提交数据对象
                resendCount: 0,//已重发次数
                isResend: true,//是否可以重发请求
                allowRequestCount: 3,//默认的允许重发请求次数
                strict: false,//是否是严格模式
                charset: 'UTF-8'//字符集
            };

            //var tool = new edu.command.Tools();
            //requestObj.id = tool.createGUID();
            //tool = {};
            (function () {
                requestObj.id = (new edu.command.Tools()).createGUID();
            })();

            if ('url' in _reqObj) {
                requestObj.url = _reqObj.url;
            }

            if ('para' in _reqObj) {
                requestObj.para = _reqObj.para;
            }

            if ('redirect' in _reqObj) {
                requestObj.redirect = _reqObj.redirect;
            }
            if ('type' in _reqObj) {
                if (
                    _reqObj.type === 'get' || _reqObj.type === 'put' || _reqObj.type === 'post' ||
                    _reqObj.type === 'delete' || _reqObj.type === 'easy') {

                    requestObj.type = _reqObj.type;
                     
                    //if (_reqObj.type === 'delete') {
                    //    requestObj.type = 'get';
                    //}

                    //if (_reqObj.type === 'put') {
                    //    requestObj.type = 'post';
                    //}
                }
            }
            if ('postdata' in _reqObj) {
                requestObj.postdata = _reqObj.postdata;
            }

            if ('timeout' in _reqObj) {
                requestObj.timeout = _reqObj.timeout;
            }

            if ('resendCount' in _reqObj) {
                requestObj.resendCount = _reqObj.resendCount;
            }

            if ('isResend' in _reqObj) {
                requestObj.isResend = _reqObj.isResend;
            }

            if ('isTimeOut' in _reqObj) {
                requestObj.isTimeOut = _reqObj.isTimeOut;
            }

            if ('charset' in _reqObj) {
                if (_reqObj.charset === '') {
                    return;
                }
                requestObj.charset = _reqObj.charset;
            }

            requestObj.timeout = requestObj.isTimeOut === true ? requestObj.timeout : 0;
            if (requestObj.isTimeOut && requestObj.timeout === 0) {
                requestObj.timeout = 30000;
            }
            return requestObj;
        }

        //参数
        var _this = this,
            request = _getRequestObject(reqObj);

        //请求方法
        function _get(_request, _callback, _error, _this) {
            var _argu = arguments,
                //因为在请求异常后会进行重新发送请求，限制本函数异常才可以进行catch处理，防止用户回调函数异常后进入本函数的异常处理
                isCatch = true; 

            jQuery.ajaxSetup({ scriptCharset: "utf-8", contentType: "application/jsonp; charset=utf-8" });
            $.ajax({
                type: _request.type,
                data: _request.para,
                async: true,
                timeout: _request.timeout,
                url: _request.url,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpcallback: "?",
                success: function (info) {
                    _request = null;
                    isCatch = false;
                    _callback(info);
                },
                error: function () {
                    if (isCatch) {
                        _repeat(_this, _argu, _error, _request);
                    }
                }
            });
        }
        function _easyget(_request, _callback) {
            $.get(_request.url, function (info) {
                _callback(info);
            }, _request.type);
        }
        function _post(_request, _callback, _error, _this) {
            if (!!window.ActiveXObject) {
                document.charset = _request.charset;
            }

            //POST禁止重发
            _repeat.isResend = false;
            _request.isTimeOut = false;

            var _argu = arguments,
                container = $("#webApiRequestContainer"),
                iframe = $("#webApiRequestIframe"),
                form = $("#webApiRequestForm"),
                i;

            if (container.length === 0) {
                container = $("<div style='display:none;' id='webApiRequestContainer'></div>");
                iframe = $("<iframe style='width:0;height:0' id='webApiRequestIframe' " +
                    "name='webApiRequestIframe'></iframe>");
                form = $("<form id='webApiRequestForm' method='post' target=" +
                    "'webApiRequestIframe'  accept-charset='" + _request.charset + "'></form>");
                container.append(iframe).append(form).appendTo($("body"));
            }
            form.attr("action", _request.url + (_request.url.indexOf("?") > 0 ? "&" : "?") + "r=" + _request.redirect);
            form.html("");
            for (i in _request.postdata) {
                form.append($("<input type='hidden' name='" + i + "' value='" + _request.postdata[i] + "' />"));
            }
            form.submit();
            if (_request.isTimeOut) {

                _request.timeoutId = setTimeout(
                    function () {
                        _repeat(_this, _argu, _error, _request);
                    },
                    _request.timeout
                );
            }
            iframe.unbind("load").load(
                 function () {
                     ////因为在请求异常后会进行重新发送请求，限制本函数异常才可以进行catch处理，防止用户回调函数异常后进入本函数的异常处理
                     //var isCatch = true,（放弃重发而注释）
                     var  url, tools, obj;

                     try {
                        url = this.contentWindow.location.href;
                        tools = new edu.command.Tools();
                        obj = tools.getQueryStringObj(url);//_getQueryStringObj(url);
                        tools = null;//销毁
                        if (_request.isTimeOut) {
                            clearTimeout(_request.timeoutId);
                        }
             
                         //isCatch = false;（放弃重发而注释）
                        _callback(obj);//执行用户回调
                     } catch (e) {
                         //（放弃重发而注释）
                         //if (isCatch) {
                         //    if (_request.isTimeOut) {
                         //        clearTimeout(_request.timeoutId);
                         //    }
                         //   _repeat(_this, _argu, _error, _request);
                         //}
                         _error();//异常回调
                     }
                 }               
             );
        }
        function _update(_request, _callback, _error, _this) {
            request.url = _request.url + (_request.url.indexOf('?') > -1 ? '&' : '?') + _request.para;

            if (_request.type === 'delete') {
                _get(_request, _callback, _error, _this);
            }
            if (_request.type === 'put') {
                _post(_request, _callback, _error, _this);
            }
        }

        //重发函数 _this :Api对象，_argu:请求方法参数数组，_callback用户自定义错误回调,_request请求对象
        function _repeat(_this, _argu, _callback, _request) {
            if (_request.isResend) {
                _request.resendCount++;
                if (_request.resendCount === _request.allowRequestCount) {
                    _request.isResend = false;
                }

                if (window.console) {
                    console.info('重新发送' + _request.id + '第' + _request.resendCount + '次请求');
                }
                
                if (_argu[0].type === 'post' || _argu[0].type === 'put') {
                    $("#webApiRequestContainer").remove();
                }
                _argu.callee(_request, _argu[1], _argu[2], _argu[3]);
            } else {
               
                //销毁
                _request = null;
                //执行用户回调
                if (typeof _callback !== 'undefined') {
                    _callback();
                } else {
                    //if (_this.getDebug()) {
                    //    console.info('网络服务中断，无法链接到服务器。');
                    //}
                    if (window.console) {
                        console.info('网络服务中断，无法链接到服务器。');
                    }
                }
                return false;
            }
        }

        if (request.type === 'get') {
            _get(request, callback, error, _this);
        } else if (request.type === 'post') {
            _post(request, callback, error, _this);
        } else if (request.type === 'put' || request.type === 'delete') {
            _update(request, callback, error, _this);
        } else {
            _easyget(request, callback);
        }
    },

    get: function (myUrl, callback, errorCallback) {
        if (arguments.length < 2) {
            alert('api.get方法参数错误');
            return;
        }
        if (
            arguments.length === 2 &&
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function') {

            this.apiRequest({ url: myUrl }, callback);
        } else if (
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function' &&
            typeof arguments[2] === 'function') {

            this.apiRequest({ url: myUrl }, callback, errorCallback);
        } else {
            alert('api.get方法参数错误，请检查参数类型');
        }

    },

    post: function (myUrl, data, callback, errorCallback) {
        if (arguments.length < 3) {
            alert('api.post方法参数错误');
            return;
        }

        if (
            arguments.length === 3 &&
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'object' &&
            typeof arguments[2] === 'function') {

            this.apiRequest({ url: myUrl, postdata: data, type: 'post' }, callback);
        } else if (
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'object' &&
            typeof arguments[2] === 'function' &&
            typeof arguments[3] === 'function') {

            this.apiRequest({ url: myUrl, postdata: data, type: 'post', para: 'm=post' }, callback, errorCallback);
        } else {
            alert('api.post方法参数错误，请检查参数类型');
        }

    },

    put: function (myUrl, data, callback, errorCallback) {
        if (arguments.length < 3) {
            alert('api.post方法参数错误');
            return;
        }

        if (
            arguments.length === 3 &&
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'object' &&
            typeof arguments[2] === 'function') {

            this.apiRequest({ url: myUrl, postdata: data, type: 'post' }, callback);
        } else if (
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'object' &&
            typeof arguments[2] === 'function' &&
            typeof arguments[3] === 'function') {

            this.apiRequest({ url: myUrl, postdata: data, type: 'put', para: 'm=put' }, callback, errorCallback);
        } else {
            alert('api.post方法参数错误，请检查参数类型');
        }
    },

    del: function (myUrl, callback, errorCallback) {
        if (arguments.length < 2) {
            alert('api.del方法参数错误');
            return;
        }
        if (
            arguments.length === 2 &&
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function') {
            //这里的Type设置为get
            this.apiRequest({ url: myUrl, type: 'get', para: 'm=delete' }, callback);
        } else if (
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function' &&
            typeof arguments[2] === 'function') {
            //这里的Type设置为get
            this.apiRequest({ url: myUrl, type: 'get', para: 'm=delete' }, callback, errorCallback);
        } else {
            alert('api.del方法参数错误，请检查参数类型');
        }
    },

    /**
	* 获取域名对象,域名对象包含完整的API请求地址及参数
	* @param  {string} path 域名后的URL完整路径（以'/'开头）
	* @param  {string} [passport] 1、不传（可选参数）表示不需要passport；2、传入空字符串表示自动获取；3、也可传入测试key
	* @author  <a href="mailto:bohai@gedu.org">bohai</a>
	* @example 
	*  <span style='color:#F00; font-weight:bold'>JS:</span>
	* var domain = comm.api.getDomain('/user', 'key');//返回的domin对象,详见返回信息.
	* var apiUrl = domin.api_domain;//这里获取apiURL
	* var logUrl = domin..log_domain;//这里获取logApiUrl
	* @returns 
		object = {
			log_domain : "http://localhost:8080",
			api_domain : "http://localhost:8080"
		};
	*@requires Jquery-1.9.1.js + ; jquery.cookie.js
	*/
    getDomain: function (path, passport) {
        var debug = this.getDebug(),
            char = path.substring(0, 1).indexOf('/') > -1 ? '' : '/',
            domain = {
                log_domain: "http://localhost:8080",
                api_domain: "http://localhost:8080"
            }; //请求域名对象

        if (arguments.length >= 1) {
            try {
                domain.log_domain = debug ? edu.config.testDomain.log : edu.config.domain.log;
                domain.api_domain = debug ? edu.config.testDomain.api : edu.config.domain.api;
            } catch (e) {
                throw new Error('对象创建异常终止，getDomain方法错误：请确认是否正确引用edu_config.js；额外的信息：' + e);
            }
        }

        if (arguments.length >= 1) {
            domain.log_domain += char + arguments[0];
            domain.api_domain += char + arguments[0];
        }

        if (arguments.length >= 2) {
            char = arguments[0].indexOf("?") > -1 ? '&' : '?';
            passport = char + "passport=" + this.getPassport(arguments[1]);
            domain.log_domain += passport;
            domain.api_domain += passport;
        }
        return domain;
    },

    /**
	* 创建接口请求完整URL
	* @param  {ojbect} paramObj 参数对象 {project: '项目名称', path: '接口地址及参数', [passport]:'key'}
	* @author  薄海
	* @returns string
	*@requires Jquery-1.9.1.js + ; jquery.cookie.js
	*/
    createFullUrl: function (paramObj) {
        var debug = this.getDebug(),
            fullUrl = '',
            domain = '',
            i, len,
            char = '';

        try {
            if (arguments.length === 1) {
                char = paramObj.path.substring(0, 1).indexOf('/') > -1 ? '' : '/';
                for (t in edu.config.project) {
                    if (t === paramObj.project.toLowerCase()) {
                        domain = debug ? edu.config.project[t].testDomain : edu.config.project[t].domain;
                        break;
                    }
                }

                if ('path' in paramObj &&  paramObj.path.length >= 1) {
                    fullUrl = domain + char + paramObj.path;

                    if ('passport' in paramObj) {
                        char = paramObj.path.indexOf('?') > -1 ? '&' : '?';
                        fullUrl = fullUrl + char + 'passport=' + this.getPassport(paramObj.passport);
                    }
                }
            } else if (arguments.length >= 2) {
                char = arguments[1].substring(0, 1).indexOf('/') > -1 ? '' : '/'
                for (i = 0, len = arguments.length; i < len; i++) {
                    if (typeof arguments[i] !== 'string') {
                        alert('api.createFullUrl方法参数错误，请检查参数类型');
                        return;
                    }
                }
                if (arguments.length > 1) {
                    domain = debug ? edu.config.project[arguments[0]].testDomain : edu.config.project[arguments[0]].domain;
                    fullUrl = domain + char + arguments[1];
                    if (arguments.length === 3) {
                        char = arguments[1].indexOf('?') > -1 ? '&' : '?';
                        fullUrl = fullUrl + char + 'passport=' + this.getPassport(arguments[2]);
                    }
                }
            } else {
                alert('api.createFullUrl方法参数错误，请检查参数类型');
            }
            return fullUrl;
        } catch (e) {
            throw e;
        }
    },

    /**
    * 获取passport
    * @param  {string} [key] 测试key
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value =  comm.api.getPassport('key');
    * @requires Jquery-1.9.1.js + ; jquery.cookie.js
    * @returns string
    */
    getPassport: function (key) {
        var passport = "",
            name = edu.config.ticket,
            oldName = edu.config.oldTicket;
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
    },

    /**
    * 验证API返回数据，只有在API数据Status属性==1时才返回true
    * @param  {ApiData} data API返回数据对象
    * @param  {Function} [callback(ErroInfo)] 错误信息处理函数
    * @param  {string} [errorUrl] 解决问题的跳转链接
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * if(comm.api.valiReturnData(apiData,
    *   function(errorInfo)
    *   {
    *       alert(errorInfo);
    *   })
    * ){...};
    * @requires 无
    * @returns {bool}
    */
    valiReturnData: function (data, callback, errorUrl) {
        var url = "javascript:;",
            config = edu.config.api.valiReturnData,
            i, len, item, returnInfo; // status 状态码, returnInfo根据状态码获取的编码信息

        if (arguments.length > 2 && errorUrl !== "") {
            url = errorUrl;
        }

        for (i = 0, len = config.statusName.length; i < len; i++) {
            for (item in data) {
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
    },
    /**
    * 解析状态
    * @param  {string} status API返回数据对象的Status属性值
    * @param  {string} [errorUrl] 解决问题的跳转链接
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *  var info = comm.api.analysisStatus("3");
    *  alert(info);//课程已过期
    * @requires 无
    * @returns {string} 状态的文字描述
    */
    analysisStatus: function (status, errorUrl) {

        var config = edu.config.api.analysisStatus,
            url = "javascript:;",
            start_a = "",
            end_a = "",
            i, len;

        if (arguments.length > 1 && errorUrl !== "") {
            url = errorUrl.replace('\'', '');
            start_a = config.startLabel.replace('@my_url', url);
            end_a = config.endLabel;
        }

        for (i = 0, len = config.statusObjs.length; i < len; i++) {
            if (config.statusObjs[i].key === status.toString()) {
                return config.statusObjs[i].value.replace(
                    '@s_label', start_a
                    ).replace(
                        '@e_label',
                        end_a
                    ).replace(
                        '@num',
                        status
                    );
            }
        }

        //返回default
        return config.defaultStatus.replace('@s_label', start_a).replace('@e_label', end_a).replace('@num', status);
    }
};
