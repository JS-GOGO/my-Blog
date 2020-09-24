const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    const { username, password, email, role, state } = req.body;
    //网址携带的id,及需要修改的用户名
    const id = req.query.id;
    let user = await User.findOne({ _id: id });
    // res.send(body.password)


    //修改填写密码和数据库密码比对 compar是个异步函数，返回一个布尔值
    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        // 密码比对成功
        //将修改信息跟新到数据库，注意这里不跟改密码，密码只是用来匹对是否正确，正确才能修改信息
        await User.updateOne({ _id: id }, {
                username,
                email,
                role,
                state
            })
            // 修改后重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        //密码比对失败 注意这里错误信息要携带id，因为修改用户页面原本的地址就携带着id（用于查询匹配数据库信息）
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行信息修改', id: id }
        next(JSON.stringify(obj))
    }

}