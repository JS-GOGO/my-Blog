// 引入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async(req, res) => {

    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'user';

    //接收客户端传来的获得当前页码,也为了实现跳转页面准备号参数
    let page = req.query.page || 1;
    //每一页的数据条数
    let pagesize = 2;
    //查询用户数据总数
    let count = await User.countDocuments({});
    //计算总页数 向上取整
    let total = Math.ceil(count / pagesize);
    //页码对应的数据开始查询的位置  如第一页开始数据是0之后,第二页开始数据是10之后
    let start = (page - 1) * pagesize;

    //查找数据库所有文档传给渲染页面
    const users = await User.find({}).limit(pagesize).skip(start);
    // 引入art
    res.render('admin/user', {
        users,
        total,
        page,
        count
    });
};