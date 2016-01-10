window.onload=function(){
	
	//全局变量
	var oBot_nav=document.getElementById('bot_nav');
	var aImg=oBot_nav.getElementsByTagName('img');
	var oCont=document.getElementById('cont');
	var aPage=oCont.children;
	
	//图片调转个人资料
	;(function(){
		var oHeImg=document.getElementById('head_img');
		oHeImg.onclick=function(){
			move(oCont,{left:-aPage[1].offsetWidth});
		};
	})();
	
	//下面的按钮
	
	;(function(){
		var maxWidth=120;
		var maxHeight=120;
		document.onmousemove=function (ev){
			var oEvent=ev || event;
			
			for (var i=0; i<aImg.length; i++)
			{	
				var left=aImg[i].offsetLeft;
				var top=aImg[i].offsetTop+oBot_nav.offsetTop; 
				var x=left+aImg[i].offsetWidth/2;
				var y=top+aImg[i].offsetHeight/2;
				
				var a=oEvent.clientX-x;
				var b=y-oEvent.clientY;
				
				var c=Math.sqrt(a*a+b*b);
				
				// 感应距离
				var scale=1-c/500; 
				(scale<0.5) && (scale=0.5)
				
				aImg[i].style.width=scale*maxWidth+'px';
				aImg[i].style.height=scale*maxHeight+'px';
			}
		};
	})();
	
	//选项卡换页
	var oCont=document.getElementById('cont');
	var aPage=oCont.children;
	;(function(){
		for(var i=0;i<aImg.length;i++)
		{
			aImg[i].index=i;
			aImg[i].onclick=function(){
				changeClass();
				move(oCont,{left:-aPage[0].offsetWidth*this.index});
			};
			
			aImg[i].onmouseover=changeClass;
			
			aImg[i].onmouseout=function(){
				for(var i=0;i<aImg.length;i++)
				{
					aImg[i].className='';
				}
			};
			
			function changeClass(){
				for(var i=0;i<aImg.length;i++)
				{
					aImg[i].className='';
				}
			
				this.className='active';
			}
		};
	})();
	
	
	//上面的导航
	;(function(){
		var oNav=document.getElementById('nav_top');
        var aLi=oNav.children;
        var oBox=aLi[aLi.length-1];
		
        var iNow=0;

		for(var i=0; i<aLi.length-1; i++){
			aLi[i].index=i;
			aLi[i].onmouseover=function(){
				startMove(oBox,this.offsetLeft);
			};
			aLi[i].onmouseout=function(){
				startMove(oBox,iNow*aLi[0].offsetWidth);
			};
			aLi[i].onclick=function(){
				iNow=this.index;
				for(var i=0; i<aLi.length-1; i++)
				{
					aLi[i].className='';
				}
				if(iNow==aLi.length-2)
				{
					demo();
				}
				this.className='active';
				move(oCont,{left:-aPage[0].offsetWidth*this.index});
			};
		}
		
		
		var oDbox=document.getElementById('demo_box');
		var aDli=oDbox.getElementsByTagName('li');
		var aDp=oDbox.getElementsByTagName('p');
	
		for(var i=0;i<aDli.length;i++)
		{
			(function(index){
				aDli[i].onmouseover=function(){
					move(aDp[index],{opacity:1},{duration:1000});
					this.style.transform='scale(0.9)';
				};	
				aDli[i].onmouseout=function(){
					move(aDp[index],{opacity:0},{duration:1000});
					this.style.transform='scale(1)';
				};					
			})(i)		
		}
		
		
		
		function demo(){
			var now=0;
			var timer=setInterval(function(){
				move(aDli[now],{opacity:1});
				now++;
				if(now==aDli.length)
				{
					clearInterval(timer);	
				}
			},400);
		}
	})();
	
	//第四块	方法缩小
	(function(){
		var aUl=document.getElementById('html_5');
		var aLi=aUl.getElementsByTagName('li');
		var oSpan=aUl.getElementsByTagName('span');
		var n=1;
		
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseover=function(){
				n++;
				this.style.transition='1s all linear'; 
				this.style.transform='scale(1.5,1.5)';
				this.style.zIndex=n;
			};
			aLi[i].onmouseout=function(){
				this.style.transition='none';
				this.style.transform='scale(1,1)';
				this.style.zIndex=1;
			};
		}
	})();
	
	 
	//第三块 拉勾网效果
	;(function(){
		var oCon_con=document.getElementById('js_con_con');
		var aLi=oCon_con.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++)
		{
			enter(aLi[i]);
			leave(aLi[i]);	
		}
	})();
	


	//enter封装函数
	function enter(obj)
	{
		obj.onmouseenter=function(ev){
			var oSpan=obj.getElementsByTagName('span')[0];
			var oEvent=ev||event;
			var n=getN(obj, oEvent);
			//document.title=n;
			
			switch(n)
			{
				case 0:  //right
					oSpan.style.left=obj.offsetWidth+'px';
					oSpan.style.top=0;
					move(oSpan,{left:0,top:0});
					break;
				case 1:  //bottom
					oSpan.style.left=0;
					oSpan.style.top=obj.offsetHeight+'px';
					move(oSpan,{left:0,top:0});
					break;
				case 2:  //left
					oSpan.style.left=-obj.offsetWidth+'px';
					oSpan.style.top=0;
					move(oSpan,{left:0,top:0});
					break;
				case 3:  //top
					oSpan.style.left=0;
					oSpan.style.top=-obj.offsetHeight+'px';
					move(oSpan,{left:0,top:0});
					break;	
			}	
		};	
	}
	//leave封装函数
	function leave(obj)
	{
		obj.onmouseleave=function(ev){
			var oSpan=obj.getElementsByTagName('span')[0];
			var oEvent=ev||event;
			var n=getN(obj, oEvent);
			
			switch(n)
			{
				case 0:  //right
					move(oSpan,{left:300,top:0});
					break;
				case 1:  //bottom
					move(oSpan,{left:0,top:300});
					break;
				case 2:  //left
					move(oSpan,{left:-300,top:0});
					break;
				case 3:  //top
					move(oSpan,{top:-300,left:0});
					break;	
			}	
		};	
	}
	//getN封装函数
	function getN(obj, ev) 
	{
		var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;  //滚动高度
		var h=document.body.offsetHeight;  //页面高度
		var h2=document.documentElement.clientHeight*document.documentElement.clientHeight/h;
		//console.log(oScrollTop);
		var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX;
		var y=getPos(obj).top-oScrollTop+obj.offsetHeight/2-ev.clientY;
		
		var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
		return n;
	}
	//d2a封装函数
	function d2a(d)
	{
		return d*180/Math.PI;
	}
	//getPos封装函数
	function getPos(obj)       //（获得到页面左和到页面顶部的距离）
	{
		var left=0;
		var top=0;
		while(obj)
		{
			left+=obj.offsetLeft;
			top+=obj.offsetTop;
			obj=obj.offsetParent;        
		}
		return {left:left,top:top};    
	}
};

	
	
	

