function ajax(json)
{
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.timeout=json.timeout || 2000;
	json.type=json.type || 'get';

	var timer=null;

	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toLowerCase())
	{
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;

		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','pplication/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}

	json.fnLoading	&& json.fnLoading();

	oAjax.onreadystatechange=function(){
		if(oAjax.readyStete == 4)
		{
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				if(json.dataType == 'xml')
				{
					oAjax.success && oAjax.success(oAjax.responseXML);
				}
				else
				{
					oAjax.success && oAjax.success(oAjax.responseText);
				}
			}
			else
			{
				oAjax.success && oAjax.success(oAjax.status);
			}
		}
	};

	timer=setTimeout(function(){
		oAjax.onreadystatechange=null;
		alert('抱歉，网络超时');
	},json.timeout);
}

function json2url(json)
{
	json.t=Math.random();
	var arr=[];

	for(var name in json)
	{
		arr.push(name+'='+json[name]);
	}

	return arr.join('&');
}