//引入数据库文件
const mongose = require('mongoose');

//创建集合规则
const commontSchame = new mongose.Schema({
    aid: {
        //储存数据库id类型，ref是关联集合
        type: mongose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //作者是谁,关联User集合的信息
    uid: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    //评论内容
    content: {
        type: String
    }
})

//创建集合构造函数
const Comment = mongose.model('Comment', commontSchame);

module.exports = {
    Comment
}