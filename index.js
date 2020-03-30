var slideModule = (function(){
    var index = 0;
    var timer;

    function createSlide(obj){
        // 绘制 DOM
        var container = $('#'+obj.container);
        var html = ''
            + '<div class="slider" id="slider">'
            + '</div>'
            + '<span id="left"><</span>'
            + '<span id="right">></span>'
            + '<ul class="nav" id="navs">'
            + '</ul>';
        container.html(html);
        var slider = $('#slider');
        var navs = $('#navs');
        var navList;
        for(var i = 0;i < obj.arr.length;i++){
            slider.append('<div class="slide"><img src="img/'+obj.arr[i]+'" alt=""></div>');
            navs.append('<li>'+(i+1)+'</li>');
        }
        slider.prepend('<div class="slide"><img src="img/'+obj.arr[obj.arr.length-1]+'" alt=""></div>');
        slider.append('<div class="slide"><img src="img/'+obj.arr[0]+'" alt=""></div>');
        navList = $('#navs').children();
        navList[0].className = 'active';

        // 鼠标滑入滑出效果
        container.mouseover(function(){
            clearInterval(timer);
            $('#left').css('opacity','0.8');
            $('#right').css('opacity','0.8');
        });
        container.mouseout(function(){
            timer = setInterval(function(){
                slideMove('next',navList,slider);
            },3000);
            $('#left').css('opacity','0');
            $('#right').css('opacity','0');
        });

        // 左右按钮切换banner
		$('#left').on('click',function(){
            slideMove('pre',navList,slider);
        });
        $('#right').on('click',function(){
            slideMove('next',navList,slider);
        });

        // 小圆点点击切换banner
        for(var i = 0;i < navList.length;i++){
			(function(j){
				navList[j].onclick = function(){
                    index = j;
                    var newL = -1200*(index+1) + 'px';
                    slider.css('left',newL);
                    navMove(navList);
				}
			})(i);
        }

        // 自动轮播
        timer = setInterval(function(){
            slideMove('next',navList,slider);
        },3000);
    }
    
    function slideMove(direct,nav,wrap){
        if(direct === 'next'){
            index++;
            if(index > 5){
                wrap.css('left','-1200px')
                index = 1;
            }
            animateFun(direct,index,wrap);
            navMove(nav);
        }else if(direct === 'pre'){
            if(index < 0){
                wrap.css('left','-6000px')
                index = 4;
            }
            animateFun(direct,index,wrap);
            index--;
            navMove(nav);
        }
    }
    
    function animateFun(d,idx,w){
        if(d === 'next'){
            idx++;
        }
        w.stop().animate({left:idx*-1200},500);
    }

    function navMove(list){
        for(var i = 0;i < list.length;i++){
            list[i].className = '';
        }
        if(index > 4){
            list[0].className = 'active';
        }else if(index < 0){
            list[4].className = 'active';
        }else{
            list[index].className = 'active';
        }
    }

    return{
        createSlide:createSlide,
    };
}());