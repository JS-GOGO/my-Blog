//连接数据库
const mongoose = require('mongoose');
// 引入config动态连接数据库
const config = require('config');
//config.get会根据不同环境选择运行那个json文件(config文件夹的) 现在只要用在数据库的动态连接中
// console.log(config.get('title'));

// console.log(config.get('db.user'));
// 以下是密码连接数据库，用到了config
// mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.prot')}/${config.get('db.name')}`, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect(`mongodb://localhost:27017`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'))