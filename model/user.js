//创建集合规则
const mongoose = require('mongoose');
//记得加版本号
const Joi = require('joi');
// 导入bcrypt
const bcrypt = require('bcrypt');

const blogschema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证数据不重复
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    //admin 超级管理员
    //normal 普通用户
    role: {
        type: String,
        require: true,
    },
    //0就是启用 1就是禁用
    state: {
        type: Number,
        default: 0
    }

})

// 集合规则的构造函数
const User = mongoose.model('User', blogschema)

//插入一个用户，要是数据都删完了可以来这里添加
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'xcy',
        email: '1541919556@qq.com',
        password: pass,
        role: 'admin',
        state: 0

    })
}
// 打开这里,运行一遍app.js后关掉,就可以得到一个密码为123456的用户,如果是删除了数据库,注意数据库连接
// createUser();


const validateUser = user => {
        // 创建用户规则，添加用户或修改用户信息需要这里验证
        // 上面的是添加到数据库的验证（必需品），这里再添加一个Joi验证，功能更加强大，还可以返回错误信息
        const schema = {
                username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
                email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
                role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
                state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
            }
            // console.log(schema);

        //实时验证规则，把输入的user和集合规则schema进行验证， 
        // 通过return把验证结果返回给validateUser，这里返回的是一个promis对象
        return Joi.validate(user, schema);
    }
    // 导出集合
module.exports = {
    //相当于 User = User
    User,
    validateUser
};