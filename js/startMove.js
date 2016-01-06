;(function(global){
    var iSpeed=0;
    var left=0;
    var timer=null;

    global.startMove=function(obj,iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeed+=(iTarget-left)/5;
            iSpeed*=0.7;

            left+=iSpeed;
            obj.style.left=left+'px';

            if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
                clearInterval(timer);
            }
        },30);
    }
})(window);