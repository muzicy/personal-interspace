$(function(){
 $('.picShow a').toggle(function(e){
	// alert('1');
   $src = $(this).children('img').attr('src');
   //alert($src);
   var $img = $('<img class="largeImg" src='+$src+' />');
   $img.css({'position':'absolute','left':e.pageX,'top':e.pageY});
   $(document.body).append($img);
   e.stopPropagation();	 
 },function(){
	 $('.largeImg').remove(); 
 })	
 $(document).click(function(){
  $('.largeImg').remove();
 })
 
 $('.themeP').hover(function(e){
  var text =$(this).siblings('p.descriptP').text();
  //alert(text);
  $div = $('<div class="hoverDes">'+text+'</div>')
  $div.css({'position':'absolute','left':parseInt(e.pageX)+10+'px','top':parseInt(e.pageY)+10+'px'});
  $div.show(100);
  $(document.body).append($div);	 
 },function(){
   $('.hoverDes').remove();
 })
})