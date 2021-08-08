const express=require('express');
const pool=require('../pool.js');
const n=express.Router();

//搜索电影模块
   //页面地址：http://127.0.0.1:9999/vquery.html
   //请求方式：POST
   //路由地址：/v1/video/search  转参方式
   //这个路由接收参数:/search    -->  req.body
n.post('/search',(req,res,next)=>{
    let obj=req.body;
	console.log(obj);
 pool.query('select * from wd_movie where title=?',[obj.title],(err,data)=>{
   if (err){
       next(err);
      return;
   }
       res.send({"code":200,"msg":'查找成功',"data":data});
 });
});








//搜索全部演员
   //页面地址：http://127.0.0.1:9999/home_page.html
   //请求方式：GET
   //路由地址：/v1/user/actor  转参方式
   //这个路由接收参数:/actor    -->  req.body
n.get('/actor',(req,res,next)=>{
  pool.query('select * from wd_actor',(err,data)=>{
    if(err){
      next(err);
      return;
    }
    //查看数据库返回的数据
    //console.log(data);
    res.send({"code":1,"msg":"找到所有用户","data":data})
  });
  });

//删除用户
  n.delete('/del/:aid',(req,res,next)=>{
    let obj = req.params;
    //console.log(obj);
    pool.query('delete from wd_actor where id=?',[obj.id],(err,data)=>{
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




//搜索单个演员模块
   //页面地址：http://127.0.0.1:9999/home_page.html
   //请求方式：post
   //路由地址：/v1/user/upname  转参方式
   //这个路由接收参数:/upname    -->  req.body
n.post('/upname',(req,res,next)=>{
    let obj=req.body;
	console.log(obj);
  pool.query('select * from wd_actor where pname=?',[obj.pname],(err,data)=>{
     if (err){
        next(err);
       return;
     }
        console.log(data);
     if (data.length===0){
       res.send({code:201,msg:'查找失败'});
     }else{
       res.send({code:200,msg:'查找成功',data:data});
     }
   });
    //res.send('找到啦！！');
  });


//搜索导演模块
n.get('/dvideo/udirector',(req,res,next)=>{
    let obj=req.body;
	console.log(obj);
  pool.query('select * from wd_movie where director=?',[obj.director],(err,result)=>{
    if (err){
        next(err);
        return;
       }
        console.log(result);
    if (result.length===0){
        res.send({code:201,msg:'查找失败'});
    }else{
        res.send({code:200,msg:'查找成功',data:result});
    }
    });
    //res.send('找到啦！！');
  });


//演员相关电影
n.get('/dvideo/related',(req,res,next)=>{
    let obj=req.body;
	console.log(obj);
  pool.query('select * from wd_actor where movie_id=?',[obj.movie_id],(err,result)=>{
    if (err){
        next(err);
        return;
       }
        console.log(result);
    if (result.length===0){
        res.send({code:201,msg:'查找失败'});
    }else{
        res.send({code:200,msg:'查找成功',data:result});
    }
    });
    //res.send('找到啦！！');
  });

//导出模块
module.exports=n;