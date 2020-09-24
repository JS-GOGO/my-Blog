const { User } = require('../../model/user')

module.exports = async(req, res) => {
    // 表单通过get提交，地址回携带者name（id）=value（517V4657417664741）
    //获取用户id 这里的id在表单隐藏域的value里
    // res.send(req.query.id)
    //根据用户id删除用户
    await User.findOneAndDelete({ _id: req.query.id });
    //重定位
    res.redirect('/admin/user');
}