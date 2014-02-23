/*global document:false, clearTimeout:false, location:false, setTimeout:false, unescape:false, window:false*/
//=====Version��2.4.0  131030=====
//[Date]��
//2013-08-15 -- 2013-10-30;
//[Contain]��
//edu.command.js:
//1��JSHint: �޸Ĳ��淶��Code
//2��Tools����formatDate�����޸Ķ������ʽ(��T)ʱ���ַ����Ľ���������ʱ���ַ������벿�֣�ʱ��������config�ж���
//3��Tools����formatDate�����ڵڶ����������Ĭ��ֵ����©������²��������쳣��8-27��
//4��Api�������createFullUrl������������ɽӿ�URL��ַ���������ʺ϶���Ŀͬʱ���ڣ�9-12��
//5��ȥ��debug��console��ʹ�ã�2013-9-23��
//6��Api.createFullUrl�����жԱ��û����ݵ���Ŀ�����ǽ���ת��ΪСдȻ���ڽ��бȽϣ�2013-9-23��
//7��valiReturnData�����Աȷ���ֵ״̬ʱ���Ὣ�û�����״̬��ʽ��Ϊ�ַ������бȽϣ�2013-9-24��
//8���޸�apiRequest-post�����ص���ַ��2013-10-24��
//9��apiRequest-post��put������ֹ�ط���2013-10-24��
//10��Api�������get��post����������apiRequest�ļ򵥵��ã���2013-10-30��

//edu.ui.js��
//1���޸�Box�����ڶ��������ڵ�BUG��ҳ����ش���Box����ʱ���ȡ�û�ָ��Ԫ�����ݣ����޸�Ԫ�����ݣ�
//���ڶ��δ�������ʱ��ָ��Ԫ������û�лָ�����ʼ���ݣ����������ظ�����ʽ���ң�
//2���޸�jq�﷨����2013-08-29��

//edu_deilog.js��
//1������ȫվͳһ��¼���壨2013-09-23��
//*  a���Ż���ʼ����
//*  b���ϲ�config�ļ�
//2���Դ�����ʽ���е�������������������ʽ���Ա���CSS�ĳ�ͻ��2013-09-25��
//3���޸Ĵ�����
//4��ѹ���ļ��в��ٰ���config

//config��
//1�����sms�ӿ��������apiRequest������ֱ�Ӵ��� edu.config.sms���ɣ�9-12��
//2�����project���󣬱��������Ŀ��������9-12��
//3���޸�testDomain�����ֵ�����Ե�ַ�����2013-9-24��
//4�����isDebug����������Ϊ���ַ������жϣ�2013-9-25��
//5����ӵ�½����config��Ϣ
//6���������Ŀ������2013-10-24��


/**
* ������
* @class ְҵ��УJSʹ�ù���
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @version v1.0
* @namespace edu.command (���������)
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
    * ����GUID
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.createGUID();
    * @requires ��
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
    * ��ȡURL����ֵ,��ȡ����ֵ
    * @param  {string} name ��������
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.getQueryString("id");
    * @requires ��
    * @returns ���������ڷ���null
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
    * ��ȡURL����ֵ����
    * @param  {string} url
    * @author  <a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * var value = comm.tools.getQueryStringObj(url);
    * @requires ��
    * @returns ���������ڷ���{}
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
    * ����ԭ�ͼ̳У�����ԭ�ͼ̳и��ั��ԭ�ͣ����ڼ������ʽ�̳У�
    * @param  {object} baseObj ���ࣨע�ⲻ�Ƕ���ʵ�壩
    * @param  {object} obj ���ࣨע�ⲻ�Ƕ���ʵ�壩
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * comm.tools.inheritPrototype(baseObj,obj);
    * @requires ��
    * @returns ��
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
    * ��������Ϣ���и�ʽȷ��
    * @param  {object} obj �������� { type:0,value:'*' }�����ȱȽϲ�������{ type:valiType,value:'*',max:10,min:5 }
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *   //1: �����ʼ���2���̶��绰��CN����3���ƶ��绰��CN����4���ʱࣻ5������
    *   (new edu.conmmand.Tools()).validation(1,'info');
    * @requires ��
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
            //�����ʼ�
            case 1:
                re = regexps.mail;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //�й��̶��绰
            case 2:
                re = regexps.phone_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //�й��ƶ��绰�������ƶ� ��ͨ�ġ��ƶ���,���� ���ƶ���
            case 3:
                re = regexps.mobile_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //�й� �ʱ�
            case 4:
                re = regexps.post_cn;
                if (re.test(obj.value)) {
                    return true;
                }
                break;
                //����
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
    * ��ʽ��Date,��ָ����ʽ���
    * @param  {string} dataStr �����ַ���
    * @param  {string} styleStr ��ʽ�ַ��� ���磺'yyyy-MM-dd hh:mm:ss'
    * @author  <a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *   (new edu.conmmand.Tools()).formatDate(
    *           'Sat Jul 20 2013 16:41:35 GMT+0800 (�й���׼ʱ��)',
    *           'yyyy-MM-dd hh:mm:ss');
    *   //2013-7-20 16:41:35
    * @requires ��
    * @returns bool
    */
    formatDate: function (dataStr, styleStr) {

        function createDate(_dateStr, _config) {
            var re = _config.regexp.date_t,
                T,
                gmt = _config.GMT === '' ? 0 : _config.GMT,
                s = 1000 * 60 * 60 * parseInt(gmt, 10),//�������
                len = _dateStr.indexOf('.') > -1 ? _dateStr.indexOf('.') : _dateStr.length; //��Ӧ ����ʱ����ʽ 2013-09-25T08:00:00 

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
            "M+": time.getMonth() + 1, //�·�
            "d+": time.getDate(), //��
            "h+": time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, //Сʱ
            "H+": time.getHours(), //Сʱ
            "m+": time.getMinutes(), //��
            "s+": time.getSeconds(), //��
            "q+": Math.floor((time.getMonth() + 3) / 3),  //����
            "S": time.getMilliseconds() //����
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
* API��ز���
* @class ְҵ��У�ӿ���ز���
* @author  <a href="mailto:bohai@gedu.org">bohai</a>
* @version v2.0 Bata
* @param {bool} debug ����״̬ Ĭ��false���ǵ���״̬��
* @namespace edu.command (���������)
* @example 
*  <span style='color:#F00; font-weight:bold'>JS:</span>
* var comm = edu.command || {};
* //����ǵ���״̬Ӧ��������� true
* comm.api = new comm.Api();//�ǵ���״̬
* comm.api = new comm.Api({ debug: true });
* debug.api = new comm.Api(true);//����״̬
*/

var edu = edu || {};
edu.command = edu.command || {};

edu.command.Api = function (debug) {

    //��ʶ�Ƿ��ǵ���״̬��true����״̬������Ӧ��Ϊfalse
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
	* aip���󷽷�
	* @param {object} reqObj<br/>
		url: string ����ѡ�������ַ��<br/>
		redirect: string  ��psot & put ��ѡ������ҳ�桿Ĭ���Ǹ�Ŀ¼�¡�callback.html��<br/>
		postdata:object  ��psot & put ��ѡ����Ԫ�ؼ�ֵ��}{input1:'value1',input2:'value2'��<br/>
		para:string ��put  del��ѡ��url�еĲ�����put�ύ������� m=put , m=delete��<br/>
		[type]: string ����ѡ��Ĭ��get��delete/post/put/easy(��ȡ���ؾ�̬�ļ�)��<br/>
		[isTimeOut]:bool ����ѡ��Ĭ��true���Ƿ�����Timeout<br/>
		[timeout]:int ����ѡ��Ĭ��30000��������isTimeOut�������Ϊ0��<br/>
		[allowRequestCount]:int  �����ظ�������� Ĭ�ϣ�3<br/>
		[isResend]:bool �Ƿ�����ط����� Ĭ�ϣ�true<br/>
        [charset]:string [��ѡ��Ĭ��UTF-8  �ַ���] ָ��POST�ύ�ַ���<br/>
	* @param {Function} callback �ص�����
	* @param {Function} [error] ��������
	* @author <a href="mailto:bohai@gedu.org">bohai</a>�� 
            post����ԭ����:<a href="mailto:zhouliyuan@gedu.org">zhouliyuan</a>
	* @example 
	* <span style='color:#F00; font-weight:bold'>JS:</span>
	*get��
	*comm.api.apiRequest({ url: userLessonUrl }, function (info) {//�������ݴ���});
	*post:
	*var request = { 
		url: 'submit.aspx',
		para: 'm=post',
		redirect: 'callback.html',
		type: 'post',
		postdata: { name: '', pwd: '' } 
	};;
	*comm.api.apiRequest(request, function (info) { //�������ݴ��� });
	*@requires Jquery-1.9.1.js +
	*/
    apiRequest: function (reqObj, callback, error) {

        if (
            (typeof reqObj === 'undefined' || typeof reqObj !== 'object') ||
            (typeof callback === 'undefined' || typeof callback !== 'function')
            ) {
            alert("��������");
            return;
        }

        //����һ���������
        function _getRequestObject(_reqObj) {
            var requestObj = {
                id: '',
                url: '',
                para: '',//URL����
                redirect: '/callback.html',
                type: 'get',
                isTimeOut: true,//�Ƿ�����Timeout�����������ÿ��ܻ���ɶ��������ɹ��Ľ�������·���һ������
                timeout: 30000,
                timeoutId: null,//timeoutID,����ɾ����ʱ����
                postdata: {},//�ύ���ݶ���
                resendCount: 0,//���ط�����
                isResend: true,//�Ƿ�����ط�����
                allowRequestCount: 3,//Ĭ�ϵ������ط��������
                strict: false,//�Ƿ����ϸ�ģʽ
                charset: 'UTF-8'//�ַ���
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

        //����
        var _this = this,
            request = _getRequestObject(reqObj);

        //���󷽷�
        function _get(_request, _callback, _error, _this) {
            var _argu = arguments,
                //��Ϊ�������쳣���������·����������Ʊ������쳣�ſ��Խ���catch������ֹ�û��ص������쳣����뱾�������쳣����
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

            //POST��ֹ�ط�
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
                     ////��Ϊ�������쳣���������·����������Ʊ������쳣�ſ��Խ���catch������ֹ�û��ص������쳣����뱾�������쳣����
                     //var isCatch = true,�������ط���ע�ͣ�
                     var  url, tools, obj;

                     try {
                        url = this.contentWindow.location.href;
                        tools = new edu.command.Tools();
                        obj = tools.getQueryStringObj(url);//_getQueryStringObj(url);
                        tools = null;//����
                        if (_request.isTimeOut) {
                            clearTimeout(_request.timeoutId);
                        }
             
                         //isCatch = false;�������ط���ע�ͣ�
                        _callback(obj);//ִ���û��ص�
                     } catch (e) {
                         //�������ط���ע�ͣ�
                         //if (isCatch) {
                         //    if (_request.isTimeOut) {
                         //        clearTimeout(_request.timeoutId);
                         //    }
                         //   _repeat(_this, _argu, _error, _request);
                         //}
                         _error();//�쳣�ص�
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

        //�ط����� _this :Api����_argu:���󷽷��������飬_callback�û��Զ������ص�,_request�������
        function _repeat(_this, _argu, _callback, _request) {
            if (_request.isResend) {
                _request.resendCount++;
                if (_request.resendCount === _request.allowRequestCount) {
                    _request.isResend = false;
                }

                if (window.console) {
                    console.info('���·���' + _request.id + '��' + _request.resendCount + '������');
                }
                
                if (_argu[0].type === 'post' || _argu[0].type === 'put') {
                    $("#webApiRequestContainer").remove();
                }
                _argu.callee(_request, _argu[1], _argu[2], _argu[3]);
            } else {
               
                //����
                _request = null;
                //ִ���û��ص�
                if (typeof _callback !== 'undefined') {
                    _callback();
                } else {
                    //if (_this.getDebug()) {
                    //    console.info('��������жϣ��޷����ӵ���������');
                    //}
                    if (window.console) {
                        console.info('��������жϣ��޷����ӵ���������');
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
            alert('api.get������������');
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
            alert('api.get�����������������������');
        }

    },

    post: function (myUrl, data, callback, errorCallback) {
        if (arguments.length < 3) {
            alert('api.post������������');
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
            alert('api.post�����������������������');
        }

    },

    put: function (myUrl, data, callback, errorCallback) {
        if (arguments.length < 3) {
            alert('api.post������������');
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
            alert('api.post�����������������������');
        }
    },

    del: function (myUrl, callback, errorCallback) {
        if (arguments.length < 2) {
            alert('api.del������������');
            return;
        }
        if (
            arguments.length === 2 &&
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function') {
            //�����Type����Ϊget
            this.apiRequest({ url: myUrl, type: 'get', para: 'm=delete' }, callback);
        } else if (
            typeof arguments[0] === 'string' &&
            typeof arguments[1] === 'function' &&
            typeof arguments[2] === 'function') {
            //�����Type����Ϊget
            this.apiRequest({ url: myUrl, type: 'get', para: 'm=delete' }, callback, errorCallback);
        } else {
            alert('api.del�����������������������');
        }
    },

    /**
	* ��ȡ��������,�����������������API�����ַ������
	* @param  {string} path �������URL����·������'/'��ͷ��
	* @param  {string} [passport] 1����������ѡ��������ʾ����Ҫpassport��2��������ַ�����ʾ�Զ���ȡ��3��Ҳ�ɴ������key
	* @author  <a href="mailto:bohai@gedu.org">bohai</a>
	* @example 
	*  <span style='color:#F00; font-weight:bold'>JS:</span>
	* var domain = comm.api.getDomain('/user', 'key');//���ص�domin����,���������Ϣ.
	* var apiUrl = domin.api_domain;//�����ȡapiURL
	* var logUrl = domin..log_domain;//�����ȡlogApiUrl
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
            }; //������������

        if (arguments.length >= 1) {
            try {
                domain.log_domain = debug ? edu.config.testDomain.log : edu.config.domain.log;
                domain.api_domain = debug ? edu.config.testDomain.api : edu.config.domain.api;
            } catch (e) {
                throw new Error('���󴴽��쳣��ֹ��getDomain����������ȷ���Ƿ���ȷ����edu_config.js���������Ϣ��' + e);
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
	* �����ӿ���������URL
	* @param  {ojbect} paramObj �������� {project: '��Ŀ����', path: '�ӿڵ�ַ������', [passport]:'key'}
	* @author  ����
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
                        alert('api.createFullUrl�����������������������');
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
                alert('api.createFullUrl�����������������������');
            }
            return fullUrl;
        } catch (e) {
            throw e;
        }
    },

    /**
    * ��ȡpassport
    * @param  {string} [key] ����key
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
    * ��֤API�������ݣ�ֻ����API����Status����==1ʱ�ŷ���true
    * @param  {ApiData} data API�������ݶ���
    * @param  {Function} [callback(ErroInfo)] ������Ϣ������
    * @param  {string} [errorUrl] ����������ת����
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    * if(comm.api.valiReturnData(apiData,
    *   function(errorInfo)
    *   {
    *       alert(errorInfo);
    *   })
    * ){...};
    * @requires ��
    * @returns {bool}
    */
    valiReturnData: function (data, callback, errorUrl) {
        var url = "javascript:;",
            config = edu.config.api.valiReturnData,
            i, len, item, returnInfo; // status ״̬��, returnInfo����״̬���ȡ�ı�����Ϣ

        if (arguments.length > 2 && errorUrl !== "") {
            url = errorUrl;
        }

        for (i = 0, len = config.statusName.length; i < len; i++) {
            for (item in data) {
                //������ȷ�ı���
                if (item === config.statusName[i] && data[item].toString() === config.normalValue) {
                    return true;
                }

                //�������Ĵ���
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
    * ����״̬
    * @param  {string} status API�������ݶ����Status����ֵ
    * @param  {string} [errorUrl] ����������ת����
    * @author  <a href="mailto:bohai@gedu.org">bohai</a>
    * @example 
    *  <span style='color:#F00; font-weight:bold'>JS:</span>
    *  var info = comm.api.analysisStatus("3");
    *  alert(info);//�γ��ѹ���
    * @requires ��
    * @returns {string} ״̬����������
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

        //����default
        return config.defaultStatus.replace('@s_label', start_a).replace('@e_label', end_a).replace('@num', status);
    }
};
