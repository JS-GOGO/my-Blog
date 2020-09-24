// 去往的home/article页面很奇妙 该页面可以从文章列表get路由进来，也可以自己提交评论，对评论数据处理后进去（提交表单有post参数，也会有跳转地址，也就是有get参数）

//引入文章详情页集合构造函数
const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //接收客户端传递的id  打开文章详情页一定需要对应的文章id才能找到，点击评论提交回到这个页面时也需要携带着id
    const id = req.query.id;
    // 根据id查询文章详细信息
    let article = await Article.findOne({ _id: id }).populate('author');
    // 查询当前文章所对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid')
        // res.send(article)

    res.render('home/article', {
        article,
        comments
    });
}