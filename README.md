### eduOperJS
自定义函数库，包括Api、Tools、EduUI、WinLogin

【引用】
```html
<script type="text/javascript" src="http://static.edu24ol.com/js/Global/history/2.4.0/edu_config.js"></scrpit>
<script type="text/javascript" src="http://static.edu24ol.com/js/Global/history/2.4.0/edu_oper.js"></scrpit>
```
【实例化】
```javascript
var api = new edu.command.Api(false);
```
具体参考API文档

#### Version：2.4.0 131105
## [Date]：
2013-08-15;
## [Contain]：
##edu.command.js:
1、JSHint: 修改不规范的Code
2、Tools对象formatDate函数修改对特殊格式(带T)时间字符串的解析，放弃时间字符串毫秒部分，时区部分在config中定义
3、Tools对象formatDate函数在第二个参数添加默认值，在漏传情况下不会引发异常（8-27）
4、Api对象添加createFullUrl函数，创建完成接口URL地址，可以是适合多项目同时存在（9-12）
5、去除debug下console的使用（2013-9-23）
6、Api.createFullUrl函数中对比用户传递的项目名称是将被转换为小写然后在进行比较（2013-9-23）
7、valiReturnData函数对比返回值状态时，会将用户传入状态格式化为字符串进行比较（2013-9-24）
8、修改apiRequest-post方法回调地址（2013-10-24）
9、apiRequest-post、put方法禁止重发（2013-10-24）
10、添加get post put del简单调用方法（2013-11-05）

## edu.ui.js：
1、修改Box对象在多个窗体存在的BUG，页面加载创建Box对象时会读取用户指定元素内容，并修改元素内容，但第二次创建对象时，指定元素内容没有恢复到初始内容，导致内容重复，样式混乱；
2、修改jq语法错误（8-29）

## edu_deilog.js：
1、新增全站统一登录窗体（2013-9-23）
*  a、优化初始化绑定
*  b、合并config文件
2、对窗体样式进行调整，多数采用行内样式，以避免CSS的冲突（2013-9-25）
3、修改窗体宽度
4、压缩文件中不再包含config

config：
1、添加sms接口请求对象，apiRequest参数中直接传入 edu.config.sms即可（9-12）
2、添加project对象，保存各类项目的域名（9-12）
3、修改testDomain对象的值，测试地址变更（2013-9-24）
4、添加isDebug函数中域名为空字符串的判断（2013-9-25）
5、添加登陆窗体config信息
6、添加新项目域名（2013-10-24）
7、添加cookie参数，有效期和路径（2013-11-05）