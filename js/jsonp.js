function jsonp(json)
{
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';

	var fnName='jsonp'+Math.random();
	fnName=fnName.replace('.','');

	window[fnName]=function(data){
		json.success && json.success(date);
		oHead.removeChild(oS);
	};

	json.date[json.cbName]=fnName;

	var oS=document.createElement('script');
	oS.src=json.url+'?'+json2url(json.date);
	oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}

function json2url(json)
{
	var arr=[];

	for(var name in json)
	{
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}

function getByClass(oParent,sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	else
	{
		var arr=[];
		var aEl=oParent.getElementsByTagName('*');
		var reg=new RegExp('\\d'+sClass+'\\d');

		for(var i=0;i<aEl.length;i++)
		{
			if(reg.test(aEl[i]))
			{
				arr.push(aEl[i]);
			}
		}
		return arr;
	}
}