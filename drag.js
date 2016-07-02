var dom = '<div id="refresh"><i></i></div>';
$('body').append(dom);
var params = {
	top: 0,
	currentY: 0,
	flag: false
};

//拖拽的实现
var startDrag = function(bar, target, callback){
	var refresh = document.getElementById('refresh');
	var _refresh = false;
	var win_w = $(window).width();
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}
		}
		var e = event;
		params.currentY = e.clientY;
	};
	document.onmouseup = function(){
		params.flag = false;
		if (_refresh) {
			$(target).animate({"top": 60}, 100);
			$(refresh).animate({"height": 60}, 100);
			$(refresh).find('i').css({
				'opacity': 0.2,
				'height': win_w,
				'width': '100%',
				'margin-top': -win_w/2,
				'margin-left': '-50%'
			});
			setTimeout(function(){
				$(target).animate({"top": 0}, 100);
				setTimeout(function(){
					location.reload();
				},100);
			},500);
		} else {
			$(target).animate({"top": 0}, 100);
			$(refresh).animate({"height": 60}, 100);
		}
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowY = e.clientY;
			var disY = nowY - params.currentY;
			if (disY > 0) {
				target.style.top = disY + "px";
				if (disY > 60) {
					refresh.style.height = disY + "px";
				}
				if (disY > 100) {
					_refresh = true;
					$(refresh).addClass('active');
				}
			}
		}

		if (typeof callback == "function") {
			callback(parseInt(params.top) + disY);
		}
	}
};