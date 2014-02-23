/*global window:false*/

var edu = edu || {};
edu.Box = edu.Box || {};
edu.Box.WinLogin = {
    //guid
    guid: '',
    
    //是否需要验证码
    isVerify: false,

    click: function () {
        var that = edu.Box.WinLogin,
            pass = true,//输入验证通过？
            inputs = $('#' + edu.config.winLogin.winBodyId + ' input'),
            postData = { name: '', pwd: '' },
            verifyCode;

        
        inputs.each(function (index, element) {
            var id = $(element).attr('id'),
                content = $(element).val();

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
            verifyCode = $('#' + edu.config.winLogin.input.VerifyCodeId).val();
            if (verifyCode.length <= 0 || verifyCode.length > 4) {
                pass = false;
                //验证码输入错误提示
                $('#' + edu.config.winLogin.input.VerifyCodeId).addClass(edu.config.winLogin.css.error);
            } else {
                postData.VerifyId = that.guid;
                postData.VerifyCode = verifyCode;
            }
        }

        if (pass) {
            //登录中...提示
            $('#' + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.logining);
            $('#edu-win-login').button('option', 'disabled', true);
            //提交操作
            (function () {
                var api = new edu.command.Api(edu.config.isDebug()),
                    url = api.createFullUrl(
                    {
                        project: edu.config.winLogin.project_name,
                        path: edu.config.winLogin.user_interface
                    });

                function rCallback(data) {
                    //取消登录中提示
                    $('#' + edu.config.winLogin.errorBoxDivID).html('');
                    $('#edu-win-login').button('option', 'disabled', false);

                    //需要验证码 231
                    if (data.status === edu.config.winLogin.status.needVerify.key) {
                        try {
                            that.refreshGUID();
                            $('#' + edu.config.winLogin.verifyCodeDivID).show();
                            that.isVerify = true;
                        } catch (e) {
                            //接口异常
                            $('#' + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.hint.b);
                        }

                        return;
                    }

                    if (api.valiReturnData(data)) {
                        //正确处理
                        //添加passport
                        if ($.cookie) {
                            $.cookie(
                                edu.config.winLogin.passportName,
                                data.Passport,
                                {
                                    expires: edu.config.winLogin.cookieExpires,
                                    path: edu.config.winLogin.cookiePath
                                });
                        }
                        that.callback(data);
                    } else {
                        //验证码错误 230
                        if (data.status === edu.config.winLogin.status.verifyError.key) {
                            $('#' + edu.config.winLogin.input.VerifyCodeId)
                                .addClass(edu.config.winLogin.css.error);
                            $('#' + edu.config.winLogin.errorBoxDivID)
                                .html(edu.config.winLogin.status.verifyError.value);
                            return;
                        }

                        //密码错误 :102
                        if (data.status === edu.config.winLogin.status.pwdError.key) {
                            $('#' + edu.config.winLogin.input.passWordId)
                                .addClass(edu.config.winLogin.css.error);
                            $('#' + edu.config.winLogin.errorBoxDivID)
                                .html(edu.config.winLogin.status.pwdError.value);
                            return;
                        }

                        //其他错误
                        $('#' + edu.config.winLogin.errorBoxDivID).html(api.analysisStatus(data.status, ''));
                    }
                }

                function eCallback() {
                    //接口异常
                    $('#edu-win-login').button('option', 'disabled', false);
                    $('#' + edu.config.winLogin.errorBoxDivID).html(edu.config.winLogin.hint.b);
                }
                api.apiRequest(
                    {
                        url: url,
                        postdata: postData,
                        redirect: edu.config.winLogin.redirect,
                        type: 'post'
                    }, rCallback, eCallback);
            }());
        }

    },

    //如需回调请重写此方法
    callback: function (data) {
        var char = window.location.href.indexOf('?') > -1 ? '&' : '?';
        window.location.href = window.location.href + char + 'num=' + Math.random(5);
    },

    //关闭窗口
    close: function () {
        
        $('#' + edu.config.winLogin.winBodyId).dialog('close');
    },

    //GUID
    refreshGUID: function () {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
             uuid = new Array(36),
             rnd = 0,
             url = '',
             r, i;
        $('#' + edu.config.winLogin.verifyCodeImgId).attr('src', edu.config.winLogin.verifyLoadImgUrl);
        for (i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            } else if (i === 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (Math.random() * 0x1000000) || 0;
                }
                r = rnd && 0xf;
                rnd = rnd > 4;
                uuid[i] = chars[(i === 19) ? (r && 0x3) || 0x8 : r];
            }
        }
        this.guid =  uuid.join('');

        if (edu.config.isDebug()) {
            url = edu.config.winLogin.test_verifyCode_interface.replace('@id', this.guid);
        } else {
            url = edu.config.winLogin.verifyCode_interface.replace('@id', this.guid);
        }

        $('#' + edu.config.winLogin.verifyCodeImgId).attr('src', url);
    }
};

$(function () {
    var i, len;
    function myBind() {
        $('#' + edu.config.winLogin.winBodyId).attr('title', edu.config.winLogin.title).dialog(edu.config.winLogin.dialog_param);
        $('#edu-win-login').button().click(edu.Box.WinLogin.click);
    }

    try {
        edu.config.winLogin.createWindow();
        if (typeof edu.config.winLogin.button === 'string') {
            $('#' + edu.config.winLogin.button).bind('click', myBind);
        }

        if (edu.config.winLogin.button instanceof Array) {
            for (i = 0, len = edu.config.winLogin.button.length; i < len; i++) {
                $('#' + edu.config.winLogin.button[i]).bind('click', myBind);
            }
        }
    } catch (e) {
        throw new Error('创建登录窗体失败; 额外信息：' + e);
    }

});