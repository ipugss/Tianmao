/**
 * Created by shuai_wy on 2017/3/14.
 * 
 * Used by chenqi on 2018/5/13  下午3:42
 * 
 * 参考自网络文献：https://blog.csdn.net/shuai_wy/article/details/62419257
 */
$(function(){
	$('#drag').drag();
	$($('.next_but')[0]).click(function(){
		var is=check_phone();
		if(is==true){
			next(this);
		}else{
			return;
		}
	});
})
$.fn.drag = function(options) {
    var x, drag = this, isMove = false, defaults = {
    };
    var options = $.extend(defaults, options);
    var handler = drag.find('.handler');
    var drag_bg = drag.find('.drag_bg');
    var text = drag.find('.drag_text');
    var maxWidth = drag.width() - handler.width();  //能滑动的最大间距

    //鼠标按下时候的x轴的位置
    handler.mousedown(function(e) {
        isMove = true;
        x = e.pageX - parseInt(handler.css('left'), 10);
    });

    //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
    $(document).mousemove(function(e) {
        var _x = e.pageX - x;// _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
        if (isMove) {
            if (_x > 0 && _x <= maxWidth) {
                handler.css({'left': _x});
                drag_bg.css({'width': _x});
            } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
                dragOk();
            }
        }
    }).mouseup(function(e) {
        isMove = false;
        var _x = e.pageX - x;
        if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
            handler.css({'left': 0});
            drag_bg.css({'width': 0});
        }
    });

    //清空事件
    function dragOk() {
        handler.removeClass('icon-zuiyou').addClass('icon-ok1');
        text.removeClass('slidetounlock').text('验证通过').css({'color':'#fff'});       //modify
       // drag.css({'color': '#fff !important'});

        handler.css({'left': maxWidth});                   // add
        drag_bg.css({'width': maxWidth});                  // add

        handler.unbind('mousedown');
        $(document).unbind('mousemove');
        $(document).unbind('mouseup');
        $($('.next_but')[0]).css('background-color','#ff0036');
        
    }
};

function check_phone(){
	var phone=$('.user_phone').val();
	var reg=/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if(phone==null||phone==""){
		$('#phone_right_node').html('请输入手机号！');
		$('#phone_right_node').css({'display':'block','color':'#ff0039'});
		return false;
	}else if(phone.length!=11){
		$('#phone_right_node').html('请输入正确位数的手机号！');
		$('#phone_right_node').css({'display':'block','color':'#ff0039'});
		return false;
	}else if(!reg.test(phone)){
		$('#phone_right_node').html('请输入正确的手机号！');
		$('#phone_right_node').css({'display':'block','color':'#ff0039'});
		return false;
	}else{
		$('#phone_right_node').html('ok');
		$('#phone_right_node').css({'display':'block','color':'#5cb85c'});
		return true;
	}
}


function next(obj){
	var this_place=$(obj).parent().parent().parent();
	var li=0;
	var li_place=$('.top').children().children('li');
	switch(this_place.attr('class')){
	case 'set_username':
		li=1;
		break;
	case 'set_moreInfo':
		li=2;
		break;
	case 'set_password':
		li=3;
		break;
	case 'success':
		return;
	}
	this_place.css('display','none');
	$(li_place[li-1]).css('border-bottom-color','#999');
	$(li_place[li-1]).children('i').css({'background':'url(image/ico-circle2.png)'});
	$(li_place[li]).css('border-bottom-color','#ff0036');
	$(li_place[li]).children('i').css({'background':'url(image/ico-circle1.png)'});
	this_place.next().css('display','block');
	if(li==3){
		var countdown=3; 
		function settime(end) {
			if (countdown == 0) { 
				$(location).attr('href', 'login.html');
				return;
			} else { 
				end.html('..'+countdown+'..秒后将自动跳转到登录页面');
				countdown--; 
			} 
			setTimeout(function() {settime($('#end_node'));},1000);
		}
		setTimeout(function() {settime($('#end_node'));},1000);
	}
}



var input_1=0;
var input_2=0;
function check_moreInfo(obj,num){
	var input_value=$(obj).val();
	var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if(input_value==null||input_value==""){
		$(obj).parent().next().css('display', 'block');
		return;
	}else if(num==1){
		input_1=num;
	}else if(num==2&&!reg.test(input_value)){
		$(obj).parent().next().html('请输入正确的邮箱');
		$(obj).parent().next().css('display', 'block');
		return;
	}else if(num==2&&reg.test(input_value)){
		$(obj).parent().next().css('display', 'none');
		$(obj).parent().next().html('请输入邮箱');
		input_2=num;
		if(input_1==1&&input_2==2){
			$($('.next_but')[1]).css('background-color','#ff0036');
			$($('.next_but')[1]).click(function(){
				next(this);
			});
		}
	}
	$(obj).parent().next().css('display', 'none');
}

var password1=null;
function check_password(obj,num){
	var password=$(obj).val();
	if(password==null||password==""){
		$(obj).parent().next().css('display','block');
	}else{
		if(num==1){
			password1=password;
		}else if(password1!=password){
			alert("两次输入的密码不一致！");
		}else{
			$($('.next_but')[2]).css('background-color','#ff0036');
			$($('.next_but')[2]).click(function(){
				next(this);
			});
		}
		$(obj).parent().next().css('display','none');
	}
}