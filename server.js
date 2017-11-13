var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mime = require('mime');
var router = require('./server/router');
var db = require('./server/db');
//gzip 压缩
var compression = require('compression');

var app = express();

//app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// session 模块
var cookieParser = require('cookie-parser');
var session = require('express-session');

// redis 模块
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
var RedisStore = require('connect-redis')(session);




app.use(cookieParser());
// redis 链接错误
client.on("error", function(error) {
  console.log(error);
});

var identityKey = 'music';
app.use(session({
  name: identityKey,
  secret: 'musicchyingp',  // 用来对session id相关的cookie进行签名
  key:'musicsession',
  //store: new RedisStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10*60 * 1000  // 有效期，单位是毫秒, 这里设置的是2分钟
  }
}));

// 检测 session是否正常
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('session错误'))
  }else {
  }
  next() // 正常 载入下一个中间件
})

//app.use(function(req, res, next){
//  var sess=req.session
//  console.log(sess)
//  var hour = 10*60 * 1000
//  req.session.cookie.expires = new Date(Date.now() + hour)
//  req.session.cookie.maxAge = hour
//  req.session.touch()
//  next();
//});





var resolve = file => path.resolve(__dirname, file);
app.use(compression());
app.use(express.static('./dist'));
app.use('/lib', express.static(resolve('./lib')));
//app.use(express.static(__dirname + '/lib'));
app.use(express.static(resolve('./docs')));





// router
app.use(router)








//// app首页
app.get('*', function(req, res) {
   res.sendFile(resolve('./dist/' + 'index.html'), 'utf-8')
});




app.listen(process.env.PORT || 8989, function() {
    console.log("应用实例，访问地址为 localhost:8989")
});
