var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost:27017/blog')




//  用户对象模型
var musicuserSchema = new mongoose.Schema({
  username: String,
  nick: String,
  password:String,
})



var Models = {
	MusicUser: mongoose.model('MusicUser', musicuserSchema),
}

module.exports = Models
