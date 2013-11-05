/*global window:false,document:false*/
//=====Version：2.4.0  131105=====

var edu = edu || {};

edu.config = {
    api: {
        names: "apiRequest,getDomain,getPassport,valiReturnData,analysisStatus,analysisOperateType,createFullUrl",
        base: "object",
        analysisStatus: {
            serviceTel: "400-678-3456(长途免费)",
            startLabel: '<a href="@my_url" style="color:#166aa1">',
            endLabel: "</a>",
            //标签：@num 将被替换为错误编码，@s_label & @e_label 将被替换为A标签的开始和结束
            defaultStatus: "非常抱歉，系统产生一个未知错误(记录此编码有助于快速解决问题:@num)",
            statusObjs: [{
                key: "301",
                value: "用户凭据已过期"
            }, {
                key: "302",
                value: "无效的用户凭据"
            }, {
                key: "303",
                value: "需要用户凭据"
            }, {
                key: "501",
                value: "没有开通课程"
            }, {
                key: "502",
                value: "没有@s_label签订套餐协议@e_label"
            }, {
                key: "231",
                value: "需要验证码"
            }, {
                key: "230",
                value: "验证码错误"
            }, {
                key: "0",
                value: "接口内部出现异常"
            }, {
                key: "1",
                value: "请求成功并返回数据"
            }, {
                key: "2",
                value: "请求参数异常"
            }, {
                key: "3",
                value: "课程已过期"
            }, {
                key: "101",
                value: "用户名不存在"
            }, {
                key: "102",
                value: "密码错误"
            }, {
                key: "103",
                value: "账户被冻结"
            }, {
                key: "104",
                value: "邮箱不属于该用户"
            }, {
                key: "105",
                value: "账户已删除"
            }, {
                key: "106",
                value: "用户名已存在"
            }, {
                key: "107",
                value: "未找到用户邮箱地址"
            }, {
                key: "108",
                value: "用户邮箱已经存在"
            }, {
                key: "109",
                value: "用户在其他地方已登录"
            }, {
                key: "201",
                value: "非法用户名"
            }, {
                key: "202",
                value: "非法密码"
            }, {
                key: "203",
                value: "非法邮箱"
            }, {
                key: "204",
                value: "非法手机号码"
            }, {
                key: "205",
                value: "非法客户端"
            }, {
                key: "206",
                value: "超出范围"
            }, {
                key: "401",
                value: "请求失败"
            }, {
                key: "402",
                value: "请求参数错误"
            }, {
                key: "403",
                value: "请求数据无效"
            }, {
                key: "404",
                value: "未找到请求数据"
            }, {
                key: "405",
                value: "请求数据超出限制"
            }]
        },
        valiReturnData: {
            //接口返回状态的属性名称(例如:短信平台状态属性名称是 'IsSuccess' )
            statusName: ["Status", "status", "IsSuccess"],
            //接口返回状态的正常值(例如:短信平台返回正常状态应该是{string} 'true' )
            normalValue: "1"
        }
    },
    tools: {
        names: "createGUID,getQueryString,getQueryStringObj,inheritPrototype,validation,formatDate",
        base: "object",
        formatDate: {
            GMT: "08",
            //时区 （中国区 +8）
            regexp: {
                //2015-09-09T14:24:43.44+08:00 此类格式:  
                //带T的格式,会忽略毫秒,并按照GMT累加时间（小时）
                date: /(\d{4}-\d{1,2}-\d{1,3})T(\d{1,2}:\d{1,2}:\d{1,2})(\.{1}\d{1,3})/g,
                //版本2.3.1中放弃
                date_t: /(\d{4}-\d{1,2}-\d{1,3})T(\d{1,2}:\d{1,2}:\d{1,2})/
            }
        },
        getQueryStringObj: {
            regexp: /([^&=]+)=([^&]*)/g
        },
        getQueryString: {
            regexpString: "(^|&)@name=([^&]*)(&|$)"
        }
    },
    eduUi: {
        names: "paging",
        base: "object"
    },
    userUi: {
        names: "load,nullData,jk_bindingAccordion,jk_paging",
        base: "eduUi"
    },
    isDebug: function () {
        var domain = window.location.host, testUrl = ["localhost", "hq.com"], i, len;
        //域名不存在，视为本地测试
        if (typeof domain === "undefined" || domain === "") {
            return true;
        }
        //调试状态
        for (i = 0, len = testUrl.length; i < len; i++) {
            if (domain.indexOf(testUrl[i]) > -1) {
                return true;
            }
        }
        //返回非调试状态
        return false;
    },
    testDomain: {
        log: "http://log.api.hq.com",
        api: "http://web.api.hq.com"
    },
    domain: {
        log: "http://log.api.edu24ol.com",
        api: "http://api.edu24ol.com"
    },
    project: {
        //主项目
        api: {
            domain: "http://api.edu24ol.com",
            testDomain: "http://web.api.hq.com"
        },
        //日志项目
        log: {
            domain: "http://log.api.edu24ol.com",
            testDomain: "http://log.api.hq.com"
        },
        //短信项目
        sms: {
            domain: "http://sms.api.edu24ol.com",
            testDomain: "http://sms.api.edu24ol.com"
        },
        //无测试
        //产品项目
        product: {
            domain: "http://product.api.edu24ol.com",
            testDomain: "http://product.api.hq.com"
        },
        //评论项目
        comm: {
            domain: "http://comm.api.edu24ol.com",
            testDomain: "http://comm.api.hq.com"
        },
        //用户权限
        permission: {
            domain: "http://up.api.edu24ol.com",
            testDomain: "http://userpermission.api.hq.com"
        },
        //公告
        notice: {
            domain: "http://notice.api.edu24ol.com",
            testDomain: "http://notice.api.hq.com"
        },
        //模考
        exam: {
            domain: '',
            testDomain: 'http://exammongodb.api.hq.com'
        }
    },
    oldTicket: "Passport",
    //旧passport名称
    ticket: "passport",
    //passport 名称
    regexp: {
        mail: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        phone_cn: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
        mobile_cn: /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}/,
        post_cn: /[1-9]{1}(\d+){5}/
    },
    //短信系统接口请求对象, 注意修改postdata对象属性值
    sms: {
        requestObj: {
            url: "http://sms.api.edu24ol.com/sendsms",
            para: "m=post",
            redirect: "/app/index.html",
            type: "post",
            postdata: {
                MobileNo: "1391",
                Message: "info",
                Level: 1
            },
            isResend: false
        }
    }
};

var edu = edu || {};

edu.config = edu.config || {};

edu.config.winLogin = edu.config.winLogin || {
    project_name: "api",
    //项目名称
    user_interface: "/user",
    //接口地址
    verifyCode_interface: "http://api.edu24ol.com/VerifyCode?id=@id&type=1",
    //验证码接口地址
    test_verifyCode_interface: "http://web.api.hq.com/VerifyCode?id=@id&type=1",
    //验证码接口测试地址
    getUserPwdURL: "http://www.edu24ol.com/user_center/getpwd.asp",
    //忘记密码URL
    regUrl: "http://www.edu24ol.com/classRegist.asp?url=" + window.location.href,
    //注册URL
    //第三方登录
    thirdLogin: [{
        id: "qq",
        img: "http://static.edu24ol.com/images/winLogin/qq.jpg",
        url: "http://www.edu24ol.com/ThirdPartyLogin/TransferPage.aspx?from=QQ&tourl=" + window.location.href
    }, {
        id: "sina",
        img: "http://static.edu24ol.com/images/winLogin/sina.jpg",
        url: "http://www.edu24ol.com/ThirdPartyLogin/TransferPage.aspx?from=SINA&tourl=" + window.location.href
    }],
    redirect: "/callback.html",
    //跨域POST提交回调地址（用户属性）
    title: "您需要登录后才可以继续",
    //弹窗标题（用户属性）
    hint: {
        a: "亲！好像发生了一个错误；编号：",
        //实际意义接口返回了错误编码
        b: "亲！网络好像不是很给力呀！"
    },
    dialog_param: {
        resizable: false,
        width: 400,
        modal: true
    },
    //jquery-ui-dialog参数（用户属性）
    button: "edu_login_btn",
    // ['btn_login', 'login2'],//'login',//触发元素id （string or Array）（用户属性）
    winBodyId: "edu-dialog",
    //承载元素id（用户属性）
    verifyCodeDivID: "verifycode_div",
    //注册码DIV ID
    errorBoxDivID: "errorInfo_div",
    //显示错误信息元素ID
    verifyCodeImgId: "guid_mig",
    //验证码图片Id
    verifyLoadImgUrl: "http://static.edu24ol.com/images/winLogin/load.jpg",
    //验证码加载中图片地址
    logining: '<img src="http://static.edu24ol.com/images/winLogin/login2.gif" / >',
    //加载效果
    //输入框名称
    input: {
        userNameId: "username",
        passWordId: "password",
        VerifyCodeId: "verifycode"
    },
    //状态
    status: {
        pwdError: {
            key: "102",
            value: "密码错误"
        },
        verifyError: {
            key: "230",
            value: "验证码错误"
        },
        needVerify: {
            key: "231",
            value: "需要验证码"
        }
    },
    //状态对象，记录返回状态
    css: {
        error: "ui-state-error ui-widget-content"
    },
    passportName: "passport",
    cookiePath: '/',
    cookieExpires: 1
};

edu.config.winLogin.createWindow = function () {
    var winBody = document.getElementById(edu.config.winLogin.winBodyId), //窗体内最外层div
    outsideDiv = document.createElement("div"), //上层P标签
    p1 = document.createElement("p"), //nameDiv
    userNameDiv = document.createElement("div"), userNameLeftDiv = document.createElement("div"), userNameLeftDivLabel = document.createElement("label"), userNameRightDiv = document.createElement("div"), userNameRightDivInput = document.createElement("input"), //pwdDiv
    pwdDiv = document.createElement("div"), pwdLeftDiv = document.createElement("div"), pwdLeftDivLabel = document.createElement("label"), pwdRightDiv = document.createElement("div"), pwdRightDivInput = document.createElement("input"), pwdRightDivA = document.createElement("a"), //verifycodeDiv
    verifyDiv = document.createElement("div"), verifyLeftDiv = document.createElement("div"), verifyLeftDivLabel = document.createElement("label"), verifyRightDiv = document.createElement("div"), verifyRightDivInput = document.createElement("input"), verifyRightDivSpan = document.createElement("span"), verifyRightDivSpanImg = document.createElement("img"), verifyRightDivSpanSpan = document.createElement("span"), //登录div
    loginDiv = document.createElement("div"), loginLeftDiv = document.createElement("div"), loginLeftDivButton = document.createElement("button"), loginLeftDivSpan = document.createElement("span"), loginLeftDivLabel = document.createElement("label"), loginLeftDivA = document.createElement("a"), //errorDiv
    errorDiv = document.createElement("div"), //style
    styleDiv = document.createElement("div"), p2 = document.createElement("p"), //第三方
    thirdDiv = document.createElement("div"), thirdDivSpan = document.createElement("span"), thirdDivSpanAImg, thirdDivSpanA, //循环创建这个a
    thirdObjs = edu.config.winLogin.thirdLogin, i, len;
    if (winBody === null) {
        return;
    }
    winBody.style.display = "none";
    outsideDiv.id = "";
    outsideDiv.style.fontSize = "14px";
    p1.style.margin = "0px";
    p1.innerHTML = "&nbsp;";
    //====userNameDiv====
    userNameDiv.style.marginBottom = "15px";
    //userNameDiv 子元素 左
    userNameLeftDiv.style.width = "25%";
    userNameLeftDiv.style.textAlign = "right";
    userNameLeftDiv.style.styleFloat = "left";
    //ie
    userNameLeftDiv.style.cssFloat = "left";
    //other
    //userNameLeftDiv子元素//style="vertical-align: middle;font-size:16px"//用户名：
    userNameLeftDivLabel.style.verticalAlign = "middle";
    //userNameLeftDivLabel.style.fontSize = '16px';
    userNameLeftDivLabel.innerHTML = "用户名：";
    userNameLeftDiv.appendChild(userNameLeftDivLabel);
    //为用户名左边div添加子元素
    //userNameDiv 子元素 右
    //userNameRightDiv 子元素
    //id="username" type="text" class="ui-widget-content ui-corner-all"  
    //style = "width:180px;font-family: 微软雅黑,Verdana,Arial,sans-serif;font-size: 1em;"
    userNameRightDivInput.id = "username";
    userNameRightDivInput.type = "text";
    userNameRightDivInput.className = "ui-widget-content ui-corner-all";
    userNameRightDivInput.style.width = "150px";
    userNameRightDivInput.style.fontFamily = "微软雅黑,Verdana,Arial,sans-serif";
    userNameRightDivInput.style.fontSize = "1em";
    userNameRightDiv.appendChild(userNameRightDivInput);
    //为用户名右边div添加子元素
    //为userName添加子元素
    userNameDiv.appendChild(userNameLeftDiv);
    userNameDiv.appendChild(userNameRightDiv);
    //====passwordDiv====
    pwdDiv.style.marginBottom = "15px";
    //pwdDiv 子元素 左
    pwdLeftDiv.style.width = "25%";
    pwdLeftDiv.style.textAlign = "right";
    pwdLeftDiv.style.styleFloat = "left";
    //ie
    pwdLeftDiv.style.cssFloat = "left";
    //other
    //pwdLeftDiv子元素//style="vertical-align: middle;font-size:16px"//用户名：
    pwdLeftDivLabel.style.verticalAlign = "middle";
    //pwdLeftDivLabel.style.fontSize = '16px';
    pwdLeftDivLabel.innerHTML = "密码：";
    pwdLeftDiv.appendChild(pwdLeftDivLabel);
    //为用户名左边div添加子元素
    //pwdDiv 子元素 右
    //pwdRightDiv 子元素 id="password" type="password" class="ui-widget-content ui-corner-all" style="width:180px;font-family: 微软雅黑,Verdana,Arial,sans-serif;font-size: 1em;"
    pwdRightDivInput.id = "password";
    pwdRightDivInput.type = "password";
    pwdRightDivInput.className = "ui-widget-content ui-corner-all";
    pwdRightDivInput.style.width = "150px";
    pwdRightDivInput.style.fontFamily = "微软雅黑,Verdana,Arial,sans-serif";
    pwdRightDivInput.style.fontSize = "1em";
    //pwdRightDiv 子元素 
    //<a href=" edu.config.winLogin.getUserPwdURL + '" style="margin-left:15px; font-size:12px"  target="_blank">忘记密码</a>
    pwdRightDivA.href = edu.config.winLogin.getUserPwdURL;
    pwdRightDivA.style.marginLeft = "15px";
    pwdRightDivA.style.fontSize = "12px";
    pwdRightDivA.target = "_blank";
    pwdRightDivA.innerHTML = "忘记密码";
    pwdRightDiv.appendChild(pwdRightDivInput);
    //为用户名右边div添加子元素
    pwdRightDiv.appendChild(pwdRightDivA);
    //为pwdDiv添加子元素
    pwdDiv.appendChild(pwdLeftDiv);
    pwdDiv.appendChild(pwdRightDiv);
    //====verifycodeDiv====
    verifyDiv.style.marginBottom = "15px";
    verifyDiv.style.display = "none";
    verifyDiv.id = "verifycode_div";
    //verifyDiv 子元素 左
    verifyLeftDiv.style.width = "25%";
    verifyLeftDiv.style.textAlign = "right";
    verifyLeftDiv.style.styleFloat = "left";
    //ie
    verifyLeftDiv.style.cssFloat = "left";
    //other
    //verifyLeftDiv子元素//style="vertical-align: middle;font-size:16px"//用户名：
    verifyLeftDivLabel.style.verticalAlign = "middle";
    //verifyLeftDivLabel.style.fontSize = '16px';
    verifyLeftDivLabel.innerHTML = "验证码：";
    verifyLeftDiv.appendChild(verifyLeftDivLabel);
    //为用户名左边div添加子元素
    //verifyDiv 子元素 右
    //verifyRightDiv 子元素 input  id="verifycode" type="text" class="ui-widget-content ui-corner-all" style="width:80px;font-family: 微软雅黑,Verdana,Arial,sans-serif;font-size: 1em;"
    verifyRightDivInput.id = "verifycode";
    verifyRightDivInput.type = "text";
    verifyRightDivInput.className = "ui-widget-content ui-corner-all";
    verifyRightDivInput.style.width = "80px";
    verifyRightDivInput.style.fontFamily = "微软雅黑,Verdana,Arial,sans-serif";
    verifyRightDivInput.style.fontSize = "1em";
    //verifyRightDiv 子元素 span: id="showCode" onClick="edu.Box.WinLogin.refreshGUID()" style="margin-left:10px; cursor:pointer"
    verifyRightDivSpan.id = "showCode";
    verifyRightDivSpan.style.marginLeft = "10px";
    verifyRightDivSpan.style.cursor = "pointer";
    //verifyRightDivSpan 子元素 img id="guid_mig" src="" style="vertical-align: middle;"
    verifyRightDivSpanImg.id = "guid_mig";
    verifyRightDivSpanImg.style.verticalAlign = "-25%";
    //verifyRightDivSpan 子元素 span  style="margin-left:15px; font-size:12px" 看不清？
    verifyRightDivSpanSpan.style.marginLeft = "15px";
    verifyRightDivSpanSpan.style.fontSize = "12px";
    verifyRightDivSpanSpan.innerHTML = "看不清？";
    verifyRightDivSpan.appendChild(verifyRightDivSpanImg);
    //为 verifyRightDivSpan添加子元素
    verifyRightDivSpan.appendChild(verifyRightDivSpanSpan);
    verifyRightDiv.appendChild(verifyRightDivInput);
    //为用户名右边div添加子元素
    verifyRightDiv.appendChild(verifyRightDivSpan);
    //为verifyDiv添加子元素
    verifyDiv.appendChild(verifyLeftDiv);
    verifyDiv.appendChild(verifyRightDiv);
    //====loginDiv====
    loginDiv.style.marginBottom = "20px";
    loginLeftDiv.style.marginLeft = "25%";
    //loginLeftDiv 子元素
    loginLeftDivButton.id = "edu-win-login";
    loginLeftDivButton.innerHTML = "登录";
    loginLeftDivSpan.id = "errorInfo";
    loginLeftDivSpan.style.fontSize = "12px";
    loginLeftDivSpan.style.marginLeft = "15px";
    loginLeftDivLabel.innerHTML = "还不是环球用户&nbsp;";
    loginLeftDivLabel.style.fontSize = "12px";
    loginLeftDivA.href = edu.config.winLogin.regUrl;
    loginLeftDivA.target = "_blank";
    loginLeftDivA.style.fontSize = "12px", loginLeftDivA.style.marginLeft = "5px";
    loginLeftDivA.innerHTML = "立即注册";
    loginLeftDiv.appendChild(loginLeftDivButton);
    loginLeftDiv.appendChild(loginLeftDivSpan);
    loginLeftDiv.appendChild(loginLeftDivLabel);
    loginLeftDiv.appendChild(loginLeftDivA);
    loginDiv.appendChild(loginLeftDiv);
    //====errorDiv====
    //id="errorInfo_div" style="text-align:center; color:red; margin-bottom:10px"
    errorDiv.id = "errorInfo_div";
    errorDiv.style.textAlign = "center";
    errorDiv.style.color = "red";
    errorDiv.style.marginBottom = "10px";
    //====style====
    //style = "border-bottom:1px solid #999"
    styleDiv.style.borderBottom = "1px solid #999";
    //class="validateTips" style="font-size:12px;display: block;"
    //-webkit-margin-before: 1em; -webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px; 无
    // 如果您有以下网址用户账号，可以直接登陆环球网校。
    p2.className = "validateTips";
    p2.style.margin = "1em";
    p2.style.fontsize = "12px";
    p2.style.display = "block";
    p2.style.textAlign = "center";
    p2.innerHTML = "如果您有以下网址用户账号，可以直接登陆环球网校。";
    //=====third Login=====
    //thirdDivSpan.style.marginLeft = '10px';
    //循环第三方登录
    for (i = 0, len = thirdObjs.length; i < len; i++) {
        thirdDivSpanA = document.createElement("a");
        thirdDivSpanAImg = document.createElement("img");
        thirdDivSpanA.href = thirdObjs[i].url;
        thirdDivSpanA.style.marginLeft = "10px";
        //thirdDivSpanA.href = thirdObjs[i].url;
        thirdDivSpanAImg.src = thirdObjs[i].img;
        thirdDivSpanAImg.style.border = "none";
        thirdDivSpanA.appendChild(thirdDivSpanAImg);
        thirdDivSpan.appendChild(thirdDivSpanA);
    }
    thirdDiv.appendChild(thirdDivSpan);
    //text-align: center;
    //width: 380px;
    thirdDiv.style.textAlign = "center";
    thirdDiv.style.width = "370px";
    //=================
    outsideDiv.appendChild(p1);
    outsideDiv.appendChild(userNameDiv);
    outsideDiv.appendChild(pwdDiv);
    outsideDiv.appendChild(verifyDiv);
    outsideDiv.appendChild(loginDiv);
    outsideDiv.appendChild(errorDiv);
    outsideDiv.appendChild(styleDiv);
    outsideDiv.appendChild(p2);
    outsideDiv.appendChild(thirdDiv);
    winBody.appendChild(outsideDiv);
    try {
        if (window.attachEvent) {
            document.getElementById("showCode").attachEvent("onclick", edu.Box.WinLogin.refreshGUID);
        } else {
            document.getElementById("showCode").addEventListener("click", edu.Box.WinLogin.refreshGUID);
        }
    } catch (e) {
        throw new Error("验证码获取方法绑定失败; 额外信息：" + e);
    }
};


edu.config.BuildUrl = function (api) {
    if (arguments.length === 0 || (api instanceof edu.command.Api) === false) {
        alert('edu.config.BulidUrl对象参数错误，未传递参数或参数类型不符（Type:edu.command.Api）。');
        return null;
    }

    function createObj(name, p1, p2) {
        var o = {
            project: name,
            path: ''
        };

        if (typeof p1 !== 'undefined') {
            o.path = p1;
        };

        if (typeof p2 !== 'undefined') {
            o.passport = p2;
        };
        return o;
    };

    //获取Api接口Url
    this.getApiUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('api', _path, _passport));
    };

    //获取Log接口Url
    this.getLogUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('log', _path, _passport));
    };

    //获取comm接口Url
    this.getCommUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('comm', _path, _passport));
    };

    //获取sms接口Url
    this.getSmsUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('sms', _path, _passport));
    };

    //获取product接口Url
    this.getProductUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('product', _path, _passport));
    };

    //获取用户权限接口URL
    this.getPermissionUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('permission', _path, _passport));
    };

    //获取公告接口URL
    this.getNoticeUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('notice', _path, _passport));
    };

    //获取模考接口URL
    this.getExamUrl = function (_path, _passport) {
        return api.createFullUrl(createObj('exam', _path, _passport));
    };
};