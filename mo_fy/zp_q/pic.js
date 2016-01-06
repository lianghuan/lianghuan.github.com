window.onload=function(){
	var oWall=document.getElementById('wall');
	var oWall_li=oWall.getElementsByTagName('li');
	var oBtn=document.getElementById('wall_btn');
	
	var zIndex=1;
	var oNear=0;
	var arrWall=[];
	//转换类型
	for(var i=0;i<oWall_li.length;i++)
	{
		arrWall.push({
			left:oWall_li[i].offsetLeft,
			top:oWall_li[i].offsetTop
		});
	}
	
	for(var i=0;i<oWall_li.length;i++)
	{
		oWall_li[i].style.position='absolute';
		oWall_li[i].style.left=arrWall[i].left+'px';
		oWall_li[i].style.top=arrWall[i].top+'px';
		oWall_li[i].style.margin=0;
	}
	//按钮点击
	oBtn.onclick=function(){
		arrWall.sort(function(){
			return Math.random()-0.5;
		});
		for(var i=0;i<oWall_li.length;i++)
		{
			move(oWall_li[i],arrWall[i]);
		}
	};
	
	for(var i=0;i<oWall_li.length;i++)
	{
		oWall_li[i].index=i;
		darg(oWall_li[i]);
	}
	
	function darg(obj)
	{
		obj.onmousedown=function(ev){
			var oEvent=ev || event;
			obj.style.zIndex=zIndex++;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;

			document.onmousemove=function(ev){
				var oEvent=ev || event;
				var left=oEvent.clientX-disX;
				var top=oEvent.clientY-disY;
				obj.style.left=left+'px';
				obj.style.top=top+'px';

				oNear=findArr(obj);
				if(oNear)
				{
					for(var i=0;i<oWall_li.length;i++)
					{
						oWall_li[i].className='';
					}
					oNear.className='active';
				}
				else
				{
					for(var i=0;i<oWall_li.length;i++)
					{
						oWall_li[i].className='';
					}
				}
			};

			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;

				if(oNear)
				{
					move(obj,arrWall[oNear.index],{
						duration:1000,
						easing:Tween.Circ.easeIn
					});
					move(oNear,arrWall[obj.index]);
					
					//换下标
					var tmp=obj.index;
					obj.index=oNear.index;
					oNear.index=tmp;
					for(var i=0;i<arrWall.length;i++)
					{
						oWall_li[i].className='';
					}
				}
				else
				{
					move(obj,arrWall[obj.index]);
				}
				obj.releateRequest && obj.releatedRequest();
			};
			obj.setRequest && obj.releateRequest;
			return false;
		};
	}

	function findArr(obj)
	{
		var minArr=9999;
		var minIndex=-1;
		for(var i=0;i<oWall_li.length;i++)
		{
			if(oWall_li[i] != obj)
			{
				if(test(obj,oWall_li[i]))
				{
					var dis=getDis(obj,oWall_li[i]);
					if(dis<minArr)
					{
						minArr=dis;
						minIndex=i;
					}
				}
			}
		}
		if(minIndex == -1)
		{
			return null;
		}
		else
		{
			return oWall_li[minIndex];
		}
	}
};