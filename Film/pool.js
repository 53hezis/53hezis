const mysql=require('mysql');
const pool=mysql.createPool({
host:'127.0.0.1',//域名
port:'3306',     //端口
user:'root',     //用户名
password:'',     //密码
database:'dvy',  //访问mysql里的哪个文件
connectionLimit:15 
});

//导出连接池对象
module.exports=pool;