var mongodb = require('./db');
//var markdown = require('markdown').markdown;
var ObjectID = require("mongodb").ObjectID;

function Gallery(topic,descript) { 
  this.topic =topic;
  this.descript = descript;
}

module.exports = Gallery;

Gallery.prototype.save = function(callback) {
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
  
  var gallery = {      
    time: time,
	  descript:this.descript,
	  topic:this.topic     
  };
  
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('gallerys', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
     
      collection.insert(gallery, {
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


Gallery.getTwen = function(page, callback) {
  
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('gallerys', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};      
      
      collection.count(query,function (err, total) {
                collection.find(query,{
         skip: (page - 1)*12,
         limit: 12
        }).sort({
          time: -1
        }).toArray(function (err,gals) {
          mongodb.close();
		
          if (err) {			
            return callback(err);			
          }
         
          callback(null, gals, total);
        });
      });
    });
  });
};


Gallery.getOne = function(_id, callback) {

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('gallerys', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
     
      collection.findOne({
       "_id":new ObjectID(_id)
      }, function (err, path) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
       
        callback(null, path);//返回查询的一条地址
      });
    });
  });
};


Gallery.remove = function(_id, callback) {  

  mongodb.open(function (err, db) {
	  if (err) {
      return callback(err);
    }
   
    db.collection('gallerys', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
     
      collection.remove({     
       "_id":new ObjectID(_id)
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