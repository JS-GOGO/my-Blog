//加密新用户密码
const bcrypt = require('bcrypt');
//引入用户集合构造函数
const { User, validateUser } = require('../../model/user');

module.exports = async(req, res, next) => {
    // try catch方法，try里方可能出错的代码，catch存错误信息
    try {
        //使用await是因为Joi.validate返回一个promis对象
        await validateUser(req.body);
    } catch (e) {
        //原始方法：重定向到用户信息页面并在地址上添加错误信息e.message,记得加return
        // return res.redirect(`/admin/user-edit?message=${e.message}`);


        // next()下一站是到app.js,并被错误拦截
        //next（）只能传递一个字符串，使用JSON.stringify()把对象转化为字符串
        // 我们需要把/admin/user-edit?message=${e.message} 分开传递，
        // res.send(typeof JSON.stringify({ path: '/admin/user-edit', message: e.message }))
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }

    //判断用户邮箱是否已经被占用
    //查看集合构造函数里是否存在这个邮箱
    let user = await User.findOne({ email: req.body.email });
    //如果存在
    if (user) {
        //重定向到用户信息页面并在地址上添加错误信息
        // return res.redirect(`/admin/user-edit?message=该邮箱被注册，请重新输入`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '该邮箱被注册，请重新输入' }));
    }

    //对新用户密码加密
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);
    // 用户输入的密码替换成加密密码，到这里的代码是已经通过验证的，无需担心格式
    req.body.password = pass;

    // 将新用户添加到数据库
    await User.create(req.body);
    //重定向到用户管理页面
    res.redirect('/admin/user');


}