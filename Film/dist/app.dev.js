"use strict";

var express = require('express');

var userRouter = require('./routes/user.js');

var videoRouter = require('./routes/video.js');

var app = express();
app.listen(9999, function () {
  console.log('服务器创建成功');
});
app.use(express["static"]('./views')); //解析中间件

app.use(express.urlencoded({
  extended: false
}));
app.use('/v1/user', userRouter);
app.use('/v1/video', videoRouter); //错误处理中间件，拦截所有路由中产生的错误

app.use(function (err, req, res, next) {
  //接受到的路由传递过来的错误信息
  console.log(err); //响应错误信息

  res.status(500).send({
    code: 500,
    msg: '服务器端错误'
  });
});