var mongodb = require('./db');
var ObjectID = require("mongodb").ObjectID;

function Picture(gal,path,size,oriname) { 
  
  this.gal = gal.replace(/\s+$|^\s+/g,"");
  this.path = path;
  this.size = size;
  this.oriname = oriname;

}

module.exports = Picture;

Picture.prototype.save = function(callback) {
  var date = new Date();
  
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }
  var picture = {
      gal: this.gal,
      time: time,
	  path:this.path,
	  size:this.size,
	  oriname:this.oriname     
  };
  
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('pictures', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
     
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

//读取所有的相片
Picture.getAll= function(gal,callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('pictures', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};  
	  if(gal){
		 query.gal=gal;  
	  }
	     
      
      collection.count(query,function (err, total) {
       
        collection.find(query,{        
        }).sort({
          time: -1
        }).toArray(function (err,pics) {
          mongodb.close();
		//  console.log(pics);
          if (err) {			
            return callback(err);			
          }		  
          callback(null, pics, total);
		  
        });
      });
    });
  });
};



Picture.getTen = function(gal, page, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('pictures', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};  
	  if(gal){
		 query.gal=gal;  
	  }
	  console.log(query.gal+'===');    
      al
      collection.count(query,function (err, total) {
        
        collection.find(query,{
         skip: (page - 1)*10,
         limit: 10
        }).sort({
          time: -1
        }).toArray(function (err,pics) {
          mongodb.close();
		
          if (err) {
			
            return callback(err);
			
          }
		  
          callback(null, pics, total);
		  
        });
      });
    });
  });
};

Picture.getOne = function(_id, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('pictures', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      
      collection.findOne({
        
        "_id": new ObjectID(_id)
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
Picture.removeone = function(_id, callback) {
 
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
  
    db.collection('pictures', function (err, collection) {
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

Picture.remove = function(galname, callback) {
 
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    
    db.collection('pictures', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
	 
      collection.remove({
        "gal":galname,      
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