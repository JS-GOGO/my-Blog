const bcrypt = require('bcrypt');
const { User } = require('../../model/user');


module.exports = async(req, res) => {
    // 引入post参数,写好email很重要
    const { email, password } = req.body;
    // 服务器需要对参数进行二次验证(浏览器可能会禁止js验证) ? ? 代码执行一直出错
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });

    //根据邮箱查询用户信息email:email省略成email 
    // 查询成功user是一个对象（包含数据库里对应email的文档数据） 失败user为空
    let user = await User.findOne({ email });
    if (user) {
        // 判断用户输入的密码是否与数据库的加密密码匹配
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //登陆成功
            //把数据库拿到的用户名储存在req的session的username属性里，客户端的session会放到服务器的cookie中
            req.session.username = user.username;
            //把用户角色储存到session 角色是admin还是normal是看原来创建用户时数据库的角色设置
            req.session.role = user.role;
            //把user放到公共数据app.locals中，引到头部文件,这样使用页面右上角都有用户名了，也可以用来判断是不是处于登陆状态
            req.app.locals.userInfo = user;
            if (user.role == 'admin') {
                //重定向到列表页面 地址是要设置到Location头中的URL
                res.redirect('/admin/user')
            } else {
                //普通用户跳转博客首页
                res.redirect('/home/')
            }

        } else {
            // 没有查询用户
            res.status(400).render('admin/error', { msg: '邮箱或密码错误' });
        }
    } else {
        // 邮箱匹配不上 没有查询用户
        res.status(400).render('admin/error', { msg: '邮箱或密码错误' });
    }

};