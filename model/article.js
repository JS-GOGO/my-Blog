//引入数据库
const mongose = require('mongoose');


//创建集合规则
const articleSchema = new mongose.Schema({
        title: {
            type: String,
            minlength: 4,
            maxlength: 20,
            required: [true, '请填写文章标题']
        },
        author: {
            //储存了_id，关联了User，在别的地方引用这个构造函数时，可以通过关联项（populate('author')）查找到拿到这个id对于User文档的所有信息
            type: mongose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, '请输入作者姓名']
        },
        publishDate: {
            type: Date,
            default: Date.now
        },
        cover: {
            type: String,
            default: null
        },
        count: {
            type: String
        }
    })
    //创建集合构造函数
const Article = mongose.model('Article', articleSchema);


//导出集合
module.exports = {
    Article
}