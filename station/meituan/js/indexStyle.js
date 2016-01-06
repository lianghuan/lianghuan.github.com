// JavaScript Document
window.onload=function(){
	//图片
	var oBanner=document.getElementById('banner');
	var oClose=document.getElementById('close-btn');
	var oBanlist=document.getElementById('banner-list');
	var oChange=document.getElementById('change-btn');
	
	oClose.onclick=function(){
		oClose.style.display='none';
		oChange.style.display='none';
		oBanlist.style.display='none';
		oBanner.style.display='none';
	};
	
	//搜索框
	var oTxt=document.getElementById('txt');
	var oInpot=document.getElementById('import');
	
	oInpot.onclick=function(){
		oInpot.style.display='none';
		oTxt.focus();
	};
	oTxt.onfocus=function(){
		oInpot.style.display='none';
	};
	oTxt.onblur=function (){
		if (oTxt.value.length == 0)
		{
			oInpot.style.display='block';
		}
	};
	
	//自动播放选项卡
	(function (){
		var oNav=document.getElementById('nav_pic');
		var aLi1=oNav.getElementsByTagName('li');
		var oNext=document.getElementById('next');
		var oPrev=document.getElementById('prev');
		var n=0;
		
		for(var i=0;i<aLi1.length;i++)
		{
			aLi1[i].index=i;
			aLi1[i].onclick=function(){
				n=this.index;
				tab();
			};
		}
		
		oNext.onclick=tick;
		
		oPrev.onclick=function(){
			n--;
			
			if( n< 0)
			{
				n=aLi1.length-1;
			}
		};
		
		var timer=setInterval(tick,3000);
		
		oNav.onmouseover=function(){
			clearInterval(timer);
		};
		oNav.onmouseout=function(){
			timer=setInterval(tick,3000);
		};
		
		
		
		function tick()
		{
			n++;
			if (n == aLi1.length)
			{
				n=0;
			}
			tab();
		}

		function tab()
		{
			for (var i=0; i<aLi1.length; i++)
			{
				aLi1[i].className='';
			}
			aLi1[n].className='active';
		}

	})();
	
	
	
	//超级星期二
	var  oMt2=document.getElementById('mt2');
	var  oMli=oMt2.getElementsByTagName('li');
	var  oLeft=document.getElementById('left');
	var  oRight=document.getElementById('right');
	var  oMt2i=document.getElementById('mt2-i');
	var  oMi=oMt2i.getElementsByTagName('i');
	var  n=0;
	oLeft.onclick=function(){
		n--;
		if(n==-1){
			n=oMli.length-1;
			}
		Mtab();
		};
		oRight.onclick=function(){
		n++;
		if(n==oMli.length){
			n=0;
			}
		Mtab();
		};
	oMt2.onmouseover=function(){
		oRight.style.display='block';
		oLeft.style.display='block';
		};
	oMt2.onmouseout=function(){
		oRight.style.display='none';
		oLeft.style.display='none';
		};
	function  Mtab(){
			for(var i=0;i<oMli.length;i++){
			oMli[i].style.display='none';
			oMi[i].className='fl mt2-cir';
			}
			oMli[n].style.display='block';
			oMi[n].className='fl mt2-cir  active';
			};
	
	//倒计时
	var mt3Time=document.getElementById('mt3-time');
	var oSpan=mt3Time.getElementsByClassName('time');
	
	toTime();
	setInterval(toTime,1000);
	function toTime(){
		var oDate=new Date();
		oDate.setFullYear(2015,12,15);
		oDate.setHours(20, 0, 0,0);
		var oNow=new Date();
		var total=Math.floor((oDate.getTime()-oNow.getTime())/1000);
		
		var h=Math.floor(total/3600);
		total%=3600;
		var m=Math.floor(total/60);
		total%=60;
		var s=total;
		var str=toDub(h)+toDub(m)+toDub(s);
		
		for(var i=0;i<oSpan.length;i++){
			oSpan[i].innerHTML=str.charAt(i);
			
		}
	}
	function toDub(n){
		return n<10? '0'+n: ''+n;	
	}
	
	//选项卡
	var mt3con=document.getElementById('mt3-con');
	nPtab(mt3con);
	var mt2con=document.getElementById('mt2-con');
	nPtab(mt2con);
	
	function nPtab(oParent){
		var aBox=oParent.getElementsByTagName('li');
		var oBtnPre=oParent.getElementsByClassName('pre')[0];
		var oBtnNext=oParent.getElementsByClassName('next')[0];
		var now=0;
		
		oBtnPre.onclick=function(){
			now--;
			if(now==-1){
				now=aBox.length-1;	
			}
			tab();
		};
		oBtnNext.onclick=next;
		
		var timer=setInterval(next,3000);
		oParent.onmouseover=function(){
			oBtnPre.style.display='block';	
			oBtnNext.style.display='block';
			clearInterval(timer);
			
		};
		oParent.onmouseout=function(){
			oBtnPre.style.display='none';	
			oBtnNext.style.display='none';
			timer=setInterval(next,3000);
		};
		
		function next(){
			now++;
			if(now==aBox.length){
				now=0;	
			}
			oBtnNext.innerHTML=now+1+'/'+aBox.length;
			tab();	
		};
		
		function tab(){
			for(var i=0;i<aBox.length;i++){
				for(var i=0;i<aBox.length;i++){
					aBox[i].className='clearfix j-con';
				}
				aBox[now].className='clearfix show j-con';
			}
			
		}

	}

	setInterval(tick,3000);

	function tick()
	{
		now++;
		if(now==aBox.length){
			now=0;
		}
		oBtnNext.innerHTML=now+1+'/aBox.length';
		tab();
	}
	
	
	
	
	
};