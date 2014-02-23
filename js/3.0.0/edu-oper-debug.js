/*
* �ӿ���
*/
var edu = edu || {};
edu.command = edu.command || {};
edu.command.Api = function (debug) {
    //��ʶ�Ƿ��ǵ���״̬��true����״̬������Ӧ��Ϊfalse
    var _debug = false,
        req = {
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
    
    /*��ȡ������״̬����*/
    this.getDebug = function () {
        return _debug;
    };
    this.setDebug = function (debug) {
        _debug = debug;
    };

    /*��ȡ�������������*/
    this.getReq = function () {
        return req;
    };
    this.setReq = function (newReq) {
        var r, len;
        for (r in newReq) {
            if (typeof req[r] !== 'undefined') {
                req[r] = newReq[r];
            }
        }
    };
};

edu.command.Api.prototype.get = function (url, fn1, fn2) {

    var that = this,
        req = that.getReq(),
        promise = {};

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

    if (typeof fn1 !== 'undefined') {
        promise.done(function (data) {
            fn1(data);
        });
    }

    if (typeof fn2 !== 'undefined') {
        promise.fail(function (e) {
            fn2(e);
        });
    }
    return promise;
};

edu.command.Api.prototype.post = function (url, postData, fn1, fn2) {

    var that = this, r,
        deferred = $.Deferred(),
        req = that.getReq(),
        container = $("#webApiRequestContainer"),
        iframe = $("#webApiRequestIframe"),
        form = $("#webApiRequestForm"), i;


    if (arguments.length === 0) {
        alert('post������������');
        return null;
    }

    if (typeof arguments[0] === 'string') {
        req.url = arguments[0];
    }

    if (typeof arguments[1] === 'object') {
        req.postdata = arguments[1];
    }

    if (typeof arguments[0] !== 'string') {
        alert('����1���󣬷�string���͡�');
    }


    //IE�����
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
            var search = uri.slice(uri.indexOf("?") + 1),
                result = {},
                queryString = search || location.search.slice(1),
                re = edu.config.tools.getQueryStringObj.regexp,
                m;

            while (m === re.exec(queryString)) {
                result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            return result;
        }

        url = this.contentWindow.location.href;

        obj = getQueryStringObj(url);
        deferred.resolve(obj);
    });

    return deferred.promise();
};

edu.command.Api.prototype.put = function (url, postData, fn1, fn2) {
    var that = this,
        url = url + (req.url.indexOf("?") > 0 ? "&" : "?") + "m=put";

   return  that.post(url, postData, fn1, fn2);
};

edu.command.Api.prototype.delete = function (url, fn1, fn2) {
    var that = this,
    url = url + (req.url.indexOf("?") > 0 ? "&" : "?") + "m=delete";

    return that.get(url, fn1, fn2);
};

/**
* �����ӿ���������URL
* {ojbect} paramObj �������� {project: '��Ŀ����', path: '�ӿڵ�ַ������', [passport]:'key'}
* [, project] {string}
* [,path] {string}
* [,passport] {string}
*/
edu.command.Api.prototype.createFullUrl = function (paramObj) {
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

            if ('path' in paramObj && paramObj.path.length >= 1) {
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
};

/**
* ��ȡpassport
* {string} [key] ����key
*/
edu.command.Api.prototype.getPassport = function (key) {
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
};

/**
* ��֤API�������ݣ�ֻ����API����Status����==1ʱ�ŷ���true
*{ApiData} data API�������ݶ���
*{Function} [callback(ErroInfo)] ������Ϣ������
*{string} [errorUrl] ����������ת����
*/
edu.command.Api.prototype.valiReturnData = function (data, callback, errorUrl) {
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
};

/**
* ����״̬
{string} status API�������ݶ����Status����ֵ
{string} [errorUrl] ����������ת����
*/
edu.command.Api.prototype.analysisStatus = function (status, errorUrl) {
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
};


/**
* ������
*/
var edu = edu || {};
edu.command = edu.command || {};
edu.command.Tools = function () { };

edu.command.Tools.prototype.createGUID = function () {
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
};

edu.command.Tools.prototype.getQueryString = function (name) {
    var reg = new RegExp(edu.config.tools.getQueryString.regexpString.replace('@name', name), "i"),
    r = window.location.search.substr(1).match(reg);

    if (r !== null) {
        return unescape(r[2]);
    }
    return null;
};

edu.command.Tools.prototype.getQueryStringObj = function (url) {
    var search = url.slice(url.indexOf("?") + 1),
    result = {}, queryString = search || location.search.slice(1),
    re = edu.config.tools.getQueryStringObj.regexp,
    m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
};


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
* ��ʽ��Date,��ָ����ʽ���
*  {string} dataStr �����ַ���
*  {string} styleStr ��ʽ�ַ��� ���磺'yyyy-MM-dd hh:mm:ss'
*/
edu.command.Tools.prototype.formatDate = function (dataStr, styleStr) {
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
};
