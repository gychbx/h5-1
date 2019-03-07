const express = require("express");
const ejs = require('ejs');
const app = express();
app.set('view engine','html');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname+"/views");
app.use(express.static(__dirname+"/public"));
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

//导入cookie-parser
var cookieParser = require('cookie-parser');  
//express设置cookie-parser
app.use(cookieParser());  
app.get('/first.html',(req,res)=>{
	var obj=req.cookies;
	if('username' in obj){
		res.render('first',{username:obj.username});
	}else{
		res.render('first');
	}
})
app.get('/login.html',(req,res)=>{
	var obj=req.cookies;
	if('username' in obj){
		res.render('first',{username:obj.username});
	}else{
		res.render('login');
	}
})
app.get('/pay.html',(req,res)=>{
	var obj=req.cookies;
	var imgpath=req.query.imgpath;
	if('username' in obj){
		res.render('pay',{imgpath:imgpath});
	}else{
		res.render('login');
	}
})
app.post('/login',(req,res)=>{
	var username=req.body.username;
	var psd=req.body.psd;
	res.cookie('username',username,{});
	res.render('first',{username:username})
})
app.listen(81, function(){
	console.log("服务器启动成功...");
})