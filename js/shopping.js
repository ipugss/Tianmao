//car
var car = [];
function shoper(){
	var shop;
	var goods;
	var price;
	var img;
	var num;
	var id;
}
//加载后运行代码段
$(function(){
	$('.button-car').click(	function() {
		if ($('#car').css("display") == "block"){
			$('#car').animate({
				opacity:"-=1",
	            right:"+=32px"  
	        },1000,function(){$('#car').css("display", "none");});
			
		}
		else{
			$('#car').css("display", "block");
			$('#car').animate({
				opacity:"+=1",
	            right:"-=32px"  
	        },800);
		}
		//$('#car').fadeToggle(500);
		
		
	});
	$('.jian').bind('click',jian);
	$('.jia').bind('click',jia);
	$('.join').bind('click',join);
});


function jian() {
	var num = Number($(this).next().attr("value")) - 1;
	if (num > 0) {
		$(this).next().attr("value", num);
	}else{
		return;
	}
	var id=$(this).parent().parent().parent().attr("id");
	for(var i=0;i<car.length;i++){
		if(id==car[i].id){
			car[i].num=num;
		}
	}
	count();

}


function jia() {
	var number = Number($(this).prev().attr("value")) + 1;
	$(this).prev().attr("value", number);
	var id=$(this).parent().parent().parent().attr("id");
	for(var i=0;i<car.length;i++){
		if(id==car[i].id){
			car[i].num=number;
		}
	}
	count();
	//alert(car.length);
}

function shanchu(){
	var id=$(this).parent().parent().parent().attr("id");
	
	
	$(this).parent().parent().parent().remove();

	//alert("删除成功，还有："+id);
	for(var i=0;i<car.length;i++){
		if(Number(id)==car[i].id){
			//car.pop(i);
			Objout(id);
		}
	}
	count();
	$('.gouwuche').html("购物车"+car.length+"件");
}

function join(e) {
	var guy=new shoper();
	guy.shop = $(this).prev().text();
	guy.goods = $(this).prev().prev().text();
	guy.price = $(this).prev().prev().prev().children('span').text();
	guy.img = $(this).prev().prev().prev().prev().attr("src");
	guy.num = 1;
	guy.id=(parseInt(Math.random()*185010))*66;
	   
	
	
	
	//var json = "{\"shop\":\"" + shop + "\",\"goods\":\"" + goods + "\",\"price\":" + price + ",\"img\":\"" + img + "\",\"num\":" + num +",\"id\":"+id+ "}";
	//json = JSON.parse(json);
	//alert(json);
	
	
	//car.push(guy);
	Objin(guy);
	
	addcar(guy);
	$('.gouwuche').html("购物车"+car.length+"件");
	
}


function count(){
	var count_all=0;
	for(var i=0;i<car.length;i++){
		count_all+=car[i].price*car[i].num;
	}
	if(car.length==0)
		$('.count-price').html('¥0.00');
	else
		$('.count-price').html('¥'+count_all+'.00');
}


function addcar(jsonObj) {
	//jsonObj = JSON.parse(jsonObj);
	
	
	var shop = jsonObj.shop;
	var goods = jsonObj.goods;
	var price = jsonObj.price;
	var img = jsonObj.img;
	var num = jsonObj.num;
	var id=jsonObj.id;
	var html = 
		'<li class="car-item" id=\''+id+'\'>' +
		'<img alt="" src="' + img + '" class="car-image">' +
		'<div class="car-info">' +
		'<p style="color:#333;">' + goods + '</p>' +
		'<p style="color:#999;font-size:10px;">' + shop + '</p>' +
		'<div class="car-num">' +
		'<img class="jiajian jian" src="image/jian.png">' +
		'<input type="text" value="1" onkeyup="value=value.replace(/[^\d]/g,"")">' +
		'<img class="jiajian jia" src="image/jia.png">' +
		'<img class="shanchu" src="image/shanchu.png">' +
		'</div>' +
		'<h3>¥' + price + '.00</h3>' +
		'</div>' +
		'</li>';
	$('.car').children('ul').append(html);
	$('.jian').unbind('click');
	$('.jia').unbind('click');
	$('.shanchu').unbind('click');
	$('.jian').bind('click',jian);
	$('.jia').bind('click',jia);
	$('.shanchu').bind('click', shanchu);
	count();
}

function subcar() {
}







/*
 * 
 * 自定义可变长数组
 * 
 */
function Objin(obj){
	var car_length=car.length;
	var new_car=new Array(car_length+1);
	var i=0;
	for(i=0;i<car_length;i++){
		new_car[i]=car[i];
	}
	new_car[i]=obj;
	car=new_car;
}

function Objout(id){
	var car_length=car.length;
	var new_car=new Array(car_length-1);
	var i=0,j=0;
	for(i=0;i<car_length-1;i++){
		if(car[i].id==id){
			j=1;
		}
		new_car[i]=car[i+j];
	}
	car=new_car;
}