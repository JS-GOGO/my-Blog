const express = require('express');
const admin = express.Router();
// 导入bcrypt
const user = require('../model/user');


// (二级)路由
// 登录页面模块
admin.get('/login', require('./admin/loginPage'))

//创建登录功能路由
admin.post('/login', require('./admin/login'));

//创建用户列表渲染路由
admin.get('/user', require('./admin/userPage'))

//实现退出功能
admin.get('/logout', require('./admin/logout'))

//创建添加用户页面
admin.get('/user-edit', require('./admin/user-edit'))

//新增用户页面提交表单功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

//用户修改后提交功能路由
admin.post('/user-modify', require('./admin/user-modify'))

//删除用户路由
admin.get('/delete', require('./admin/user-delete'));

//文章页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

//文章编辑表单提交路由
admin.post('/article-add', require('./admin/article-add'))


module.exports = admin;