var edu = edu || {};

edu.command = edu.command || {};

edu.command.Api = function (debug) {
    //标识是否是调试状态；true调试状态；上线应改为false
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
        alert('post方法参数错误！');
        return null;
    }

    if (typeof arguments[0] === 'string') {
        req.url = arguments[0];
    }

    if (typeof arguments[1] === 'object') {
        req.postdata = arguments[1];
    }

    if (typeof arguments[0] !== 'string') {
        alert('参数1错误，非string类型。');
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