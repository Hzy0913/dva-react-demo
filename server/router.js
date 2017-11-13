var express = require('express');
var db = require('./db');
var router = express.Router();




// 查询邮箱是否存在
router.post('/api/queryemail', function(req, res){
  db.MUser.findOne({email:req.body.email}, function(err, docs){
    if(!docs){
      res.json({data:1})
    }else if(docs.isregister==false){
      res.json({data:1})
    }else {
      res.json({data:0})
    }
  })
})
// 查询邮箱是否存在
router.get('/api/queryuserlist', function(req, res){
  var sess=req.session
  if(!see.musicuse){
    res.json({data:1})

    console.log('121212')
    return false
  }
  db.MusicUser.find({}, function(err, docs){
    if(err){
      res.status(500).send()
      return
    }else {
      res.json({data:0,userlist:docs})
    }
  })


})

//   注册
router.post('/api/register', function(req, res){
  console.log(req.body)
  var username=req.body.username
  var sess=req.session
  db.MusicUser.findOne({username:req.body.username},function(err, docs){
    console.log(docs)
    if(err){
      res.json({data:1})
    }else if(!docs){
      new db.MusicUser(req.body).save(function(error){
        if (error) {
          res.status(500).send()
          return
        }
        sess.musicuser=username;
        console.log('session')
        console.log(sess)
        res.json({data:0})
      })
    }else if(docs){
      res.json({data:2}) //已注册
    }else {
      res.status(500).send()
      return
    }
  })
})


// 登录接口
router.post('/api/loggin', function(req, res){
  // 判断是否已登录
  console.log('判断是否已登录')
  console.log(req.body)
  console.log(req.session)
  var loginuser=req.session.musicuser
  if(req.session.musicuser){
    db.MusicUser.find({}, function(err, docs){
      if(err){
        res.status(500).send()
        return
      }else {
        res.json({data:0,user:docs})
      }
    })
    return false
  }else if(!req.body.musicuser){
    // 未登陆
    res.json({data:6})
    return false
  }
  var user=req.body.username;
  var pass=req.body.password;
  var see=req.session;
  db.MUser.findOne({username:user}, function(err, docs){
    console.log(docs)
    if (err) {
      res.json({data:1})
      return
    }else if(!docs){
      // 账号不存在
      res.json({data:2})
    }else {
      if(user==docs.musicuser && pass==docs.password){
        //正确 保存session
        see.musicuser=user;
        db.MusicUser.find({}, function(err, docs){
          if(err){
            res.status(500).send()
            return
          }else {
            res.json({data:0,userlist:docs})
          }
        })
      }else {
        // 账号或密码错误
        res.json({data:3})
      }
    }
  })
})

// 修改密码
//router.post('/api/modifypass', function(req, res) {
//  var username=req.body.username;
//  var passworld=req.body.password;
//  db.MusicUser.findOne({username:req.body.username},function(err, docs){
//    if(err){
//      res.json({data:1})
//    }else if(!docs){
//      res.json({data:2}) //不存在
//    }else if(docs.password==passworld){
//      db.MusicUser.update({}, function (err, docs) {
//        if (err) {
//          return
//        } else if (!docs) {
//          // 增加出错
//          res.json({data: 2})
//        } else {
//          // 增加成功
//          res.json({data: 0})
//        }
//      });
//
//    }
//  })
//
//
//})




module.exports = router
