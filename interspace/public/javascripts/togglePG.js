$(function(){
  $('ul.phoNav li').click(function(e){
	 // alert('1');
	 $(this).addClass('choGP').siblings().removeClass('choGP');
	// alert($(e.target).html());
	if($(e.target).html()=="相册"){
	  $('.gallerysPage').addClass('up').siblings('.pictures').removeClass('up');	
	} else if($(e.target).html()=="照片") {
	$('.pictures').addClass('up').siblings('.gallerysPage').removeClass('up');	
	}
  });
})

$(function(){
	
$('.galleryShow ').hover(function(){
   $(this).children('.delGal').css('display','block');	
},function(){
  $(this).children('.delGal').css('display','none');	
})

$('.delGal').click(function(){
  $(this).parent().remove();	
})
})