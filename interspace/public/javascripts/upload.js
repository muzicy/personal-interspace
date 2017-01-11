$(function(){
  var $img = $(".perPhoto");
  $img.click(function(e){
	 $(".perPhoto form").css('display','block'); 
	 e.stopPropagation();
  }
  );
  
  $(document).click(function(){
	 $(".perPhoto form").css('display','none'); 
  })
  
  $('.perPhoto form input[type=submit]').click(function(){
	if($('.perPhoto form input[type=file]').val()==''){
	  return false;	
	}  
  })	
})

$(function(){
 $('.uploadImg input[type=submit]').click(function(){
  if($('.uploadImg input[type=file]').val()==''){
	return false;  
  }	 
  var gal = $('.uploadImg option:checked').text();
  //alert(gal);
  $.ajax({
	  url:'/photoes/eachgal',
	  type:'post',	  
	  data:{
		     gal:gal			
		   },
	  //type:'/photoes',
	  async:true,
	  dataType:'json',
	  success:function(data){
		if(data.success){
		 alert('success');	
		} else {
		  alert('error');	
	    } 
	  }	   
   }) 
   
 }); 
})

$(function(){
 // var $oDiv = $("uploadPhoto");
  var $oUpPic = $(".uploadPhoto a:eq(0)");
  $oUpPic.click(function(e){
	 $(".uploadImg").addClass("showUpImg ");
	 e.stopPropagation();
  });
  $(document).click(function(){
     $(".uploadImg").removeClass("showUpImg ");
  })
 
})