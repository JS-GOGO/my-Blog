module.exports = (req, res) => {
    //删除req.session
    req.session.destroy(function() {
        //删除cookie connect.sid是默认创造cookie的名称
        res.clearCookie('connect.sid');
        //删除右上角的名字，所以可以拿来判断用户是不是处于登录状态
        req.app.locals.userInfo = null;
        // 重定向到登录页面
        res.redirect('/admin/login')
    })

}