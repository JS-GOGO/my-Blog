const { Article } = require('../../model/article');
//引入第三方模块实现-分页
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //标识 标识当前访问的是文章管理页面，点亮图标
    req.app.locals.currentLink = 'article';

    //接收客户端传来的page参数，改变当前页
    const page = req.query.page;

    //把数据库信息渲染到页面 为了使作者名字显示的是原名，使用集合关联,把所有集合内的author（原本存的是id）变成储存用户信息的对象
    //page 当前页 size 每页数据量 display 显示页数 exec()开始调用
    let articles = await pagination(Article).find({}).page(page).size(10).display(3).populate('author').exec();
    //调用pagination对象后article对象的值发生改变，原本的数据放在article.records小对象里
    // res.send(article);

    // 把数据传给art
    res.render('admin/article', {
        articles
    })
}