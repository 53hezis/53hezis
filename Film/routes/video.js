const express = require('express');
const pool = require('../pool.js');
const n = express.Router();

//搜索单个电影模块
//页面地址：http://127.0.0.1:9999/vquery.html
//请求方式：POST
//路由地址：/v1/video/uactor  转参方式
//这个路由接收参数:/uactor    -->  req.body
n.post('/uactor', (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  pool.query('select * from wd_movie where title=?', [obj.title], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length === 0) {
      res.send({ code: 201, msg: '查找失败' });
    } else {
      res.send({ code: 200, msg: '查找成功', data: data });
    }
  });
  //res.send('找到啦！！');
});

//搜索全部演员******
//页面地址：http://127.0.0.1:9999/home_page.html
//请求方式：GET
//路由地址：/v1/user/actor  转参方式
//这个路由接收参数:/actor    -->  req.body
n.post('/actor', (req, res, next) => {
  pool.query('select * from wd_actor', (err, data) => {
    if (err) {
      next(err);
      return;
    }
    //查看数据库返回的数据
    //console.log(data);
    res.send({ "code": 1, "msg": "找到所有用户", "data": data })
  });
});


//管理员后台******
//页面地址：http://127.0.0.1:9999/list.html
//请求方式：DELETE
//路由地址：/v1/user//del/:aid  转参方式
//这个路由接收参数:/actor    -->  req.body
//删除用户
n.delete('/del/:aid', (req, res, next) => {
  let obj = req.params;
  //console.log(obj);
  pool.query('delete from wd_actor where id=?', [obj.id], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    //console.log(data.affectedRows);
    if (data.affectedRows === 0) {
      res.send({ "code": 0, "msg": "删除失败" });
    } else {
      res.send({ "code": 1, "msg": "删除成功" });
    }
  });
});

//搜索单个演员模块
//页面地址：http://127.0.0.1:9999/uquery.html
//请求方式：post
//路由地址：/v1/user/upname  转参方式
//这个路由接收参数:/upname    -->  req.body
n.post('/upname', (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  pool.query('select * from wd_actor where pname=?', [obj.pname], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length === 0) {
      res.send({ code: 201, msg: '查找失败' });
    } else {
      res.send({ code: 200, msg: '查找成功', data: data });
    }
  });
  //res.send('找到啦！！');
});


//搜索导演模块
//页面地址：http://127.0.0.1:9999/V_director.html
//请求方式：/udirector
//路由地址：/v1/user/udirector  转参方式
//这个路由接收参数:/udirector
n.post('/udirector', (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  pool.query('select * from wd_movie where director=?', [obj.director], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length === 0) {
      res.send({ code: 201, msg: '查找失败' });
    } else {
      res.send({ code: 200, msg: '查找成功', data: data });
    }
  });
  //res.send('找到啦！！');
});


//电影相关演员
//页面地址：http://127.0.0.1:9999/V_correlation.html
//请求方式：GEt
//路由地址：/v1/video/related 转参方式
//这个路由接收参数:/related
n.post('/related', (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  pool.query('SELECT * FROM wd_actor WHERE movie_id=?', [obj.movie_id], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length === 0) {
      res.send({ code: 201, msg: '查找失败' });
    } else {
      res.send({ code: 200, msg: '查找成功', data: data });
    }
  });
  //res.send('找到啦！！');
});

//导出模块
module.exports = n;