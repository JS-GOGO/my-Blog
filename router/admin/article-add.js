const formidable = require('formidable');
const { Article } = require('../../model/article')
const path = require('path');
//将表单插入到数据库
module.exports = async(req, res) => {
    //获取表单的值，因为表单上传文件是二进制数据，这里需要formidable去解析
    // 1.创建formidable对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置——绝对路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀名
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        //fields 对象，保存表单普通数据
        //files 对象，保存表单上传文件数据
        // 获取上传文件地址-files.cover.path 获取的是来自本机电脑上传文件的地址C:\XXX\XXX\...
        // 需要对本机地址字符串拆分,以public（上传文件存储位置，参考uploadDir）拆分成两段，取第二段
        // res.send(files.cover.path)
        // 问题：cover存的地址应该是 / ，本机地址是\ ，这里是怎么把\变成/的？
        // res.send(files.cover.path.split('public')[1])
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            count: fields.count
        })
        res.redirect('/admin/article');

    })

}