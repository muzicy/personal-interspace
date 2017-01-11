var mongodb = require('./db');
var ObjectID = require("mongodb").ObjectID;

function Touxiang(path,size,oriname) { 
  this.path = path;
  this.size = size;
  this.oriname = oriname;
}

module.exports = Touxiang;


Touxiang.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }
  //要存入数据库的图片信息
  var picture = {      
      time: time,
	  path:this.path,
	  size:this.size,
	  oriname:this.oriname     
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 touxiang 集合
    db.collection('touxiang', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //将文档插入 touxiang 集合
	  collection.remove();
      collection.insert(picture, {
        safe: true
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null);//返回 err 为 null
      });
    });
  });
};


Touxiang.get = function(callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('touxiang', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //查询数据库的信息	 
      collection.find().toArray(function (err, tx) {
        mongodb.close();
        if (err) {
          return callback(err);
        }  
		console.log(tx);      
        callback(null, tx);//返回查询的一条地址
      });
    });
  });
};

//删除一张图片
Touxiang.remove = function(_id, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('touxiang', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
	 
      collection.remove({      
        "_id": new ObjectID(_id)
      }, {
        w: 1
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};