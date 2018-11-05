$(function(){
	$('.switch').click(function(){
		var i=$('.icon-shoujishumadiannao');
		if(i.css('display')=='none'){
			$('.icon-erweima1').css('display','none');
			$('.words1').css('display','none');
			$('.use_password').css('display','none');
			$('.use_QRcode').css('display','block');
			$('.words2').css('display','block');
			i.css("display","block");
			
			
			
		}else{
			
			i.css("display","none");
			$('.words2').css('display','none');
			$('.use_QRcode').css('display','none');
			$('.use_password').css('display','block');
			$('.words1').css('display','block');
			$('.icon-erweima1').css('display','block');
			
			
			
			
		}
	});
	
	$('.do').click(function(){
		var username=$('.username').children('input').val();
		var password=$('.password').children('input').val();
		if((username==null||username=="")&&(password==null||password=="")){
			var html=
				'<div style="background-color:#fef4f2;width:300px;height:24px;">'+
				'<i class="font-icon icon-jinzhide" style="font-size:10px;padding-left: 18px;line-height:18px;color:#D64848;"></i>'+
				'<span style="letter-spacing:2px;font-weight:100;margin-left:20px;line-height:18px;font-size:10px;color:#6C6C6C">用户名和密码为空！</span>'
				'</div>'
				;
		}else if(username==null||username==""){
			var html=
				'<div style="background-color:#fef4f2;width:300px;height:24px;">'+
				'<i class="font-icon icon-jinzhide" style="font-size:10px;padding-left: 18px;line-height:18px;color:#D64848;"></i>'+
				'<span style="letter-spacing:2px;font-weight:100;margin-left:20px;line-height:18px;font-size:10px;color:#6C6C6C">用户名为空！</span>'
				'</div>'
				;
			
		}else if(password==null||password==""){
			var html=
				'<div style="background-color:#fef4f2;width:300px;height:24px;">'+
				'<i class="font-icon icon-jinzhide" style="font-size:10px;padding-left: 18px;line-height:18px;color:#D64848;"></i>'+
				'<span style="letter-spacing:2px;font-weight:100;margin-left:20px;line-height:18px;font-size:10px;color:#6C6C6C">密码为空！</span>'
				'</div>'
				;
		}else{
			var html="密码登录";
		}
		var words=$($('.words1')[1]).html(html);
	});
	
	
})