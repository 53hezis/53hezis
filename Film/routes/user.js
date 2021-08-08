//引入express模块
const express=require('express')
//引入连接池对象
const pool=require('../pool.js');
//console.log(poolRouter);
const n=express.Router();
//用户登录路由  http://127.0.0.1:9999/login.html
n.post('/login',(req,res,next)=>{
	let obj=req.body;
	console.log(obj);
 //res.send('登录成功')
  if (!obj.rser){
    res.send({code:401,msg:'用户名不能为空'});
    return;
  }
  if (!obj.tped){
    res.send({code:402,msg:'密码不能为空'});
    return;
  }
    if (!/^[a-zA-Z]\w{5,17}$/.test(obj.tped)){
       res.send({code:401,msg:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'});
	 return;
   
   }
  //执行SQL命令,到数据库中查询有没有用户名和密码匹配的数据
  pool.query('select * from users where rser=? and tped=?',[obj.rser,obj.tped],(err,result)=>{
  if (err){
	  //把错误交给下一个中间件
     next(err);
     return;
  }
  console.log(result);
   //if判断
   //结果是数组，如果是空数组表示登录失败，如果不是空数组表示登录成功。
    if (result.length===0){
       res.send({code:201,msg:'登录失败'});
    }else{
       res.send({code:200,msg:'登录成功'});
    }
   });
  //res.send('德玛西亚');
 });

//用户列表显示
//页面地址：http://127.0.0.1:9999/list.html
//请求方式：GET
//路由地址：/v1/user/list
//这个路由不用接收参数
n.get('/list',(req,res,next)=>{
   pool.query('select * from users',(err,data)=>{
     if(err){
       next(err);
       return;
     }
     //查看数据库返回的数据
     //console.log(data);
     res.send({"code":1,"msg":"找到所有用户","data":data})
   });
   });
   
   
   //删除用户，单个用户
   //页面地址：http://127.0.0.1:9999/list.html
   //请求方式：DELETE
   //路由地址：/v1/user/del/:id  转参方式
   //这个路由接收参数:/:uid    -->  req.params
   n.delete('/del/:id',(req,res,next)=>{
     let obj = req.params;
     //console.log(obj);
     pool.query('delete from users where id=?',[obj.id],(err,data)=>{
       if(err){
         next(err);
         return;
       }
       //console.log(data.affectedRows);
       if(data.affectedRows===0){
         res.send({"code":0,"msg":"删除失败"});
       }else{
         res.send({"code":1,"msg":"删除成功"});
       }
     });
   });


//注册
//页面地址：http://127.0.0.1:9999/register.html
//请求方式：post
//路由地址: /v1/user//reg
//接收传参的方法：req.body
n.post('/reg',(req,res,next)=>{
   let obj = req.body;
   console.log(obj)
   pool.query('insert into users set ?',[obj],(err,data)=>{
    if(err){
      next(err);
      return;
    }
    //console.log(data.affectedRows);
    if(data.affectedRows===1){
      res.send({"code":1,"msg":"注册成功"})
    }else{
     res.send({"code":0,"msg":"注册失败"})
    }
   })
 });









//用户修改个人资料
//页面地址：http://127.0.0.1:9999/edit.html
//请求方式：PUT
//路由地址: /v1/user/uedit
//接收传参的方法：req.body
n.put('/uedit',(req,res,next)=>{
  let obj = req.body;
  console.log(obj);
  pool.query(`update users set tped="${obj.utped}",rser="${obj.rser}",tped="${obj.tped}"
    where emaile="${obj.emaile}"`,(err,data)=>{
    if(err){ 
      next(err);
      return;
    }
    if(data.affectedRows===1){
      res.send({"code":1,"msg":"修改成功"});
    }else{
      res.send({"code":0,"msg":"修改失败"});
    }
  });
});



//检索用户名是否可用
n.post('/checkUname/uname',(req,res,next)=>{
	let obj=req.body;
	console.log(obj);
  //执行SQL命令,到数据库中查询有没有用户名和密码匹配的数据
  pool.query('select * from users where rser=?',[obj.rser],(err,result)=>{
  if (err){
	  //把错误交给下一个中间件
     next(err);
     return;
  }
  console.log(result);
   //if判断
   //结果是数组，如果是空数组表示登录失败，如果不是空数组表示登录成功。
     if (result.length===1){
       res.send({code:201,msg:'用户名已被占用'});
  }else{
       res.send({code:200,msg:'用户名可用',data:result});
      }
   });
  //res.send('德玛西亚');
 });


//检索邮箱是否可用
n.post('/checkEmail/emaile',(req,res,next)=>{
	let obj=req.body;
	console.log(obj);
  //执行SQL命令,到数据库中查询有没有用户名和密码匹配的数据
  pool.query('select * from users where emaile=?',[obj.emaile],(err,result)=>{
  if (err){
	  //把错误交给下一个中间件
     next(err);
     return;
  }
  console.log(result);
   //if判断
   //结果是数组，如果是空数组表示登录失败，如果不是空数组表示登录成功。
      //验证邮箱
   if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(obj.emaile)){
        res.send({code:403,msg:'邮箱格式错误'});
	 return;
   }
     if (result.length===1){
       res.send({code:201,msg:'邮箱已被占用'});
  }else{
       res.send({code:200,msg:'邮箱可用'});
      }
 });
 });

//检索检索手机号码是否可用
n.post('/checkPhone/phone',(req,res,next)=>{
	let obj=req.body;
	console.log(obj);
  //执行SQL命令,到数据库中查询有没有用户名和密码匹配的数据
  pool.query('select * from users where uphoer=?',[obj.uphoer],(err,result)=>{
  if (err){
	  //把错误交给下一个中间件
     next(err);
     return;
  }
  console.log(result);
   //if判断
   //结果是数组，如果是空数组表示登录失败，如果不是空数组表示登录成功。
	//验证手机号码
   if (!/^1[3-9]\d{9}$/.test(obj.uphoer)){
       res.send({code:401,msg:'手机号码格式错误'});
	 return;
   }
     if (result.length===1){
       res.send({code:201,msg:'手机号码已被占用'});
  }else{
       res.send({code:200,msg:'手机号码可用'});
      }

 });
 });




//导出用户路由
module.exports=n;


















