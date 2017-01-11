/*
var objXmlHttp = null;

function CreateXmlHttp(){
  if(window.ActiveXObject){
	objXmlHttp = new ActiveXObject("Mircrosoft.XMLHTTP");  
  }	else {
	 if(window.XMLHttpRequest){
	   objXmlHttp = window.XMLHttpRequest();	 
	 } else {
	   alert("初始化XMLHTTP失败");	 
	 }
  }
}

function GetSendData(){
  var strSendUrl = "detailLog.ejs?date="+Date();
  CreateXmlHttp();
  
  objXmlHttp.open("GET",strSendUrl,true);
  objXmlHttp.onreadystatechange=function(){
	 if(objXmlHttp.readyState==4){
	   if(objXmlHttp.status=-200){
		  $('.logPage').innerHTML = objXmlHttp.responseText;   
	   }	 
	 }  
  }	
  
  oblXmlHttp.send(null);
}

*/
$('.postLog a ').click(function(){
  var content = this.parent().html();
  $('.logPage').empty().html()=content;	
})