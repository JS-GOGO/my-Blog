//导入Article集合构造函数
const { Article } = require('../../model/article');
//导入分页
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收当前页
    const page = req.query.page;
    //注意使用pagination后原对象储存在records里
    let result = await pagination(Article).find().page(page).size(8).display(4).populate('author').exec();
    res.render('home/default', {
        result
    })


}