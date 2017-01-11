$(function(){
  
  
  $('input.createGal').click(function(e){
	  var topic = $('#topic').val();
      var descript = $('#descriptGel').val();
	  alert.log(topic);
	  alert.log(descript);
	  // alert('hello');
	 $.ajax({
	  url:'http:localhost:3000/routes/index.js/photoes',
	  type:'post',
	  contentType: "application/json; charset=utf-8",
	  data:{
		     topic:topic,
			 descript:descript
		   },
	  //type:'/photoes',
	  async:true,
	  dataType:json,
	  success:function(data){
		if(data.success){
		 alert('success');	
		} else {
		  alert('error');	
	    } 
	  }	   
   }) 
   e.stopPropagation(); 
  })
 
})