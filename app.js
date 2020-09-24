const express = require('express');
const path = require('path');
const app = express();
// 引入第三方模块接收post参数
const bodyParser = require('body-parser');
//引入express-session，储存登录信息
const session = require('express-session');
//引入数据库
require('./model/connect');
//引入时间处理第三方模块
const dateFormat = require('dateformat');
//引入art-template第三方模块 
const template = require('art-template');
// 引入margon模块，是一个方法
const morgan = require('morgan');


// 处理post参数
app.use(bodyParser.urlencoded({ extended: false }));

// 配置登录信息 1.储存登录信息如session,cookie进行自动加密操作 2.退出登录后cookies初始化（完全清除cookies，http也就进入到无状态）3.设置cookie有效时间为1小时（1小时内关闭浏览器重新打开还有cookie）
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000
    }
}))

//对art模板进行配置,拼接路径和默认后缀名,后缀名指定引擎的模板操作,配合resend使用
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));

//通过art-template模板把变量导入到模板内部（这样art模板也能使用变量方法）
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源,拼接路径网页就可以访问相关的css等文件,记得把html里面的css等链接改为绝对路径
app.use(express.static(path.join(__dirname, 'public')));


//区分系统环境（需要在环境变量设置）
if (process.env.NODE_ENV = 'development') {
    //开发环境
    console.log('当前是开发环境');
    //在开发环境中，将客户端向服务器发送的所有命令打印到控制台中 dev参数是固定的
    app.use(morgan('dev'));
} else {
    //生产环境
    consoleapp.use.log('当前是生产环境');
}



//引入(二级)路由模块（先创建二级路由变量，下面的一级路由直接使用）
const home = require('./router/home');
const admin = require('./router/admin');

//登陆拦截：判断用户是否登录或者是否处于登录状态，防止未登录访问到其他网页
//第二个参数相当于直接引入guard函数（admin的拦截必须在admin一级路由前面，先筛查路过的url，才能跳下一站路由）
app.use('/admin', require('./middleware/loginGuard'));

//创建路径(一级路由)
app.use('/home', home);
app.use('/admin', admin)

// 拦截错误信息 这里的代码一定要放在后面，有redirect
app.use((err, req, res, next) => {
    // 这里的代码优化没成功 成功了，原因是代码放到一级路由前面
    //把next（）接收的字符串(对应这里的错误信息err)转化为对象
    const result = JSON.parse(err);
    //把对象内path之后的属性放入一个数组里（有的错误信息携带id，有的没有）
    let params = [];
    for (let k in result) {
        if (k != path) {
            params.push(k + '=' + result[k]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})



app.listen(80);
console.log('服务器搭建成功');