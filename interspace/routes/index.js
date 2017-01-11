var Post = require('../models/post.js'),
    Picture=require('../models/picture.js'),
    Gallery = require('../models/gallery.js'),
    Touxiang = require('../models/touxiang.js');
   
var multer = require('../multerUtil.js');		
var upload = multer.single('upImg');
var upTouXiang = multer.single('tximg');
var touxiang1='';
var eachGal = '';

module.exports=function(app){
	
  app.get('/',function(req,res){     
      Touxiang.get( function (err, touxiang) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
  	 var txpathArr = [],txpath=''; 
  	 txpathArr=touxiang[0].path.split('\\');	 
  	 txpathArr.shift();
  	 touxiang[0].path=txpathArr.join("/");	
  	 touxiang1=touxiang[0];
  	 
  	 Picture.getAll(null,function(err,pics,total){
  	  if(err) {
  		return res.rediectt('/');  
  	  }	
  	  var pathArr=[];
  	  for (var i=0; i<total;i++){
  	  pathArr[i]=pics[i].path.split('\\');	 
  	  pathArr[i].shift();
  	  pics[i].path=pathArr[i].join("/");	  	
  	}
  	 
  	 Post.getAll(function(err,logs){
  	  if(err){
  		 return res.redirect('/');  
  	  }	
  	 res.render('index', {
       logs:logs,
  	   pics:pics,
       touxiang: touxiang1	    
       });	
       }) 
  	})   
   });     
  })

  app.post('/',upTouXiang,function(req,res){
      touxiang = new Touxiang(req.file.path,req.file.size,req.file.originalname);
        touxiang.save(function (err) {
        if (err) {
          req.flash('error', err); 
          return res.redirect('/');
        }
        req.flash('success', '发布成功!');
        res.redirect('/');//发表成功跳转到主页
    });
  })

  app.get('/musicp',function(req,res){
  	res.render('music',{touxiang:touxiang1});
  });

  app.get('/removeGal/:_id/:galname',function(req,res){
      Gallery.remove(req.params._id, function(err){
      if(err){
        req.flash('error',err);  
        return res.redirect('/'); 
      } 
      Picture.remove(req.params.galname,function(err){
      if(err){
        req.flash('error',err);  
        return res.redirect('/');  
      } 
      req.flash('success','删除成功');
      res.redirect('/photoes'); 
     });   
   });
  })


  app.get('/post',function(req,res){
    var page = req.query.p ? parseInt(req.query.p) : 1;
      Post.getTen( page, function (err, posts, total) {
        if (err) {
          req.flash('error', err); 
          return res.redirect('/');
        } 
        res.render('post', {     
  	      touxiang:touxiang1,
          posts: posts,
          page: page,
          isFirstPage: (page - 1) == 0,
          isLastPage: ((page - 1) * 10 + posts.length) == total,       
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
       
      });
    }); 
  })

  app.get('/postLog',function(req,res){
    res.render('postLog',{touxiang:touxiang1});	
  });

   app.post('/postLog', function (req, res) {	
        post = new Post(req.body.title, req.body.post);
        post.save(function (err) {
        if (err) {
          req.flash('error', err); 
          return res.redirect('/post');
        }
        req.flash('success', '发布成功!');	 
        res.redirect('/post');//发表成功跳转到主页
        });
    });
    
   app.get('/p/:_id',function(req,res){
  	  var imgPath='',path=[];
      Post.getOne(req.params._id, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
  	  console.log(touxiang1);
  	  imgPath = touxiang1;	 
  	  path=imgPath.path.split('/');
  	  path.shift();
  	  imgPath.path='images/'+path.join('/');	  
        res.render('article', {      
        post: post,	  
  	  touxiang:imgPath	    
      });
    });
    });  
   
   app.get('/edit/:_id', function (req, res) {
    Post.edit(req.params._id, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('post');
      }
      res.render('edit', {   
  	  touxiang:touxiang1,
        post: post,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });

  app.post('/edit/:_id', function (req, res) {
    
    Post.update(req.params._id, req.body.post, function (err) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/post');//出错！返回文章页
      }
      req.flash('success', '修改成功!');
      res.redirect('/post');//成功！返回文章页
    });
  });

   app.get('/remove/:_id', function (req, res) {
   
    Post.remove(req.params._id, function (err) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
      req.flash('success', '删除成功!');
      res.redirect('/post');
    });
  }); 


  app.get('/photoes',function(req,res){

  var page = req.query.p ? parseInt(req.query.p) : 1;
    var pathArr=[];
    Picture.getTen(page,function(err,pics,total){
  	if(err){
       req.flash('error', err); 
      return res.redirect('/');
  	}  
   	for (var i=0; i<total;i++){
  	  pathArr[i]=pics[i].path.split('\\');
  	 // console.log(pathArr[i]);
  	  pathArr[i].shift();
  	  pics[i].path=pathArr[i].join("/");	
  	}
      //console.log(pics);
    res.render('photoes',{
    	touxiang:touxiang1,
    	pics:pics,	
      page: page,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page - 1) * 10 + pics.length) == total,
         // user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()    
    }); 
    }); 
  }); 
  
  app.post('/photoes/eachgal',function(req,res,next){	       
      eachGal = req.body.gal;  		
  }); 

  app.post('/photoes',upload,function(req,res,next){	        
  	    var pics = new Picture(eachGal,req.file.path,req.file.size,req.file.originalname);		
      	pics.save(function(err) {
  	    if(err) {
  	      req.flash('error', err);
  	      return res.redirect('/photoes'); 
  		  }	
  	    req.flash('success','上传成功');		
  		  res.redirect('/photoes');			 
  	    });		
  }); 

  app.post('/photoes/gal',function(req,res,next){ 
  	 if(!req.body.topic) {
  	   req.flash('error','相册名称为空，请重新创建');
  	   return res.redirect('/photoes'); 
  	 }
  	 var gals = new Gallery(req.body.topic,req.body.descript);		
      	gals.save(function(err) {
    	    if(err) {
    	    req.flash('error', '创建相册失败');
    	    return res.redirect('/photoes'); 
  		    }	
  		  console.log('hello');
  	    req.flash('success','创建相册成功');		
  		  res.redirect('/photoes');			 
  	    });		  
  }); 

  app.get('/removeImg/:_id',function(req,res){ 	
    Picture.removeone(req.params._id, function(err){
  	 if(err){
  	   req.flash('error',err);	
  	   return res.redirect('/'); 
  	 } 
  	 req.flash('success','删除成功');
  	 res.redirect('/photoes'); 
   });
  });

  app.use(function (req, res) {
    res.render("404");
  });

}

