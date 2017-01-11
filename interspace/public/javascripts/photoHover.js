$(function(){
  $('.postLog').hover(function(){
	  $(this).children('.picDel').css('display','block');
  },function(){
	  $('.picDel').css('display','none');
  })	 
})

$(function(){
  $('.picDel').click(function(){	 
	 $(this).parent('.postLog').remove();  
  })	
});

$(function(){
  $('.createPhoto').click(function(e){	
    // $('.createGallery').children('input').value='';
	 $('.createGallery').css('display','block');  
	 e.stopPropagation();	
  });
  
  $(document).click(function(){
	$('.createGallery').css('display','none');  
  })
  	
  $('#topic').keyup(function(ev){
	var num = this.value.length;  
	//alert(num);
	if(num<=30) {
	 $('#topic').next().html(num)
	} else {
	  // $('#topic').attr('disabled','disabled');
	   ev.preventDefault();	
	}
  });
  
  $('#descriptGel').keyup(function(e){
	var num = this.value.length;  
	//alert(num);
	if(num<=2000) {
	 $('#descriptGel').next().html(num)
	} else {	 
	   ev.preventDefault();	
	}  
  });
  
  
  $('.createGal').click(function(ev){
	 
	 var topic = $('#topic').val();
	 var descript = $('#descriptGel').val();
	 if (topic.length==0 || descript.length==0){
	   	 return false;
	 }
	  $.ajax({
	  url:'/photoes/gal',
	  type:'post',	  
	  data:{
		     topic:topic,
			 descript:descript
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
   $('.createGallery').hide();
  // refresh();
   ev.stopPropagation();
   
  });    
})



