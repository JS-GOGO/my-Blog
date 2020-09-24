const express = require('express');
const home = express.Router();

// 创建(二级)路由模块

// 博客文章列表首页
home.get('/', require('./home/index'));

//博客文章详情页面
home.get('/article', require('./home/article'));

//评论添加功能
home.post('/comment', require('./home/comment'));


module.exports = home;