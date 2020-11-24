(function () {
    config = {
        divSmall: document.getElementsByClassName("small")[0],
        divMove: document.getElementsByClassName("move")[0],
        divBig: document.getElementsByClassName("big")[0],

    }
    config.bigImageWidth = 800;
    config.bigImageHeigth = 800;

    config.bigStyle = getComputedStyle(config.divBig);

    config.bigStyleWidth = parseFloat(config.bigStyle.width);
    config.bigstyleHight = parseFloat(config.bigStyle.height);

    config.smallStyle = getComputedStyle(config.divSmall);

    config.smallStyleWidth = parseFloat(config.smallStyle.width);
    config.smallstyleHight = parseFloat(config.smallStyle.height);

    config.moveStyleWidth = config.bigStyleWidth / config.bigImageWidth * config.smallStyleWidth;
    config.moveStyleHeight = config.bigstyleHight / config.bigImageHeigth * config.smallstyleHight;

    inItMove();


    function inItMove(){
        
       config.divMove.style.width = config.moveStyleWidth + "px";
       config.divMove.style.height = config.moveStyleHeight + "px";

        // console.log(config.divMove.style.width);

        config.divSmall.onmouseenter = function(){
            config.divMove.style.display = "block";

        }


        config.divSmall.onmouseleave = function(){
            config.divMove.style.display = "none";
            config.divBig.style.background = "";
        }

        config.divSmall.onmousemove = function(e){
            var pos = position(e);
            // console.log(pos.x + ":" + pos.y);
            var left = pos.x - (config.moveStyleWidth / 2);
            var top = pos.y - (config.moveStyleHeight / 2);

            if(left < 0){
                left = 0;
            }
            if(top < 0){
                top = 0;
            }
            if(left > config.smallStyleWidth - config.moveStyleWidth){
                left = config.smallStyleWidth - config.moveStyleWidth;
            }
            if(top > config.smallstyleHight - config.moveStyleHeight){
                top = config.smallstyleHight - config.moveStyleHeight;
            }
            config.divMove.style.left = left + "px";
            config.divMove.style.top = top + "px";

            inItBig(- left /config.smallStyleWidth * config.bigImageWidth, - top / config.smallstyleHight * config.bigImageHeigth);
        }

        function position(e){
            if(e.target === config.divSmall){
                return {
                    x:e.offsetX,
                    y:e.offsetY
                }
            }else{
                var divMovestyle = getComputedStyle(config.divMove);
                return {
                    x:e.offsetX + parseFloat(divMovestyle.left),
                    y:e.offsetY + parseFloat(divMovestyle.top)
                }
            }
        }
    }

    function inItBig(x,y){
        config.divBig.style.background = "url('1.jpg') no-repeat "+x+"px "+y+"px";
    }
}())