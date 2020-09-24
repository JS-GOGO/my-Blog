//引入comment集合
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // res.send(req.body)
    const { content, uid, aid } = req.body;
    // 向数据库的Comment集合插入评论数据 uid是登录用户，aid是文章作者
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    // const c = await Comment.find({});
    // res.send(c);
    // //重定向到文章详情页
    res.redirect('/home/article?id=' + aid)
}