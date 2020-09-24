const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'user';

    //在get里面得到参数，修改错误信息
    // console.log(req.query);
    const { message, id } = req.query;

    //如果传递了id参数,就是修改操作
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });
        //渲染用户编辑页面
        res.render('admin/user-edit', {
            message,
            user,
            //地址携带需要修改的用户id
            link: '/admin/user-modify?id=' + id,
            button: '修改用户'

        });
    } else {
        //添加用户操作  这里没有传递user对象,使用art的value要作对应修改判断
        res.render('admin/user-edit', {
            // message:message
            message,
            //创建用户操作提交表单的地址
            link: '/admin/user-edit',
            button: '添加用户'
        });
    }




}