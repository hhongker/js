service();
function service() {
    var num = 100;
    var ul = document.getElementsByTagName("ul")[0];
    var ulStyle = getComputedStyle(ul);
    var ulWidth = parseFloat(ulStyle.width);
    var liWidth = ulWidth / 100;
    var dofomat = document.createDocumentFragment();
    for (var i = 0; i < num; i++) {
        var li = document.createElement("li");
        for (var j = 0; j < 4; j++) {
            var div = document.createElement("div");
            div.style.backgroundPositionX = i * (-liWidth) + "px";
            li.appendChild(div);
        }
        li.style.transitionDelay = (0.3 * i / num) + 's';
        li.style.width = liWidth + "px";
        dofomat.appendChild(li);
    }
    ul.appendChild(dofomat);

    play();
    function play() {


        var main = document.getElementsByClassName("main")[0];
        var n = 0;
        var timer = null;
        var uLi = document.querySelectorAll("ul li");
       
        var oLi = document.querySelectorAll("ol li");


        time();
        function time() {
            timer = setInterval(function () {
                var on = document.getElementsByClassName("on")[0];
                n %= 4;
                on.className = "";
                oLi[n].className = "on";
                n++;
                for (var i = 0; i < uLi.length; i++) {
                    uLi[i].style.transform = "translateZ(-180px) rotateX(" + (n * 90) + "deg)";
                }
            }, 2000);
        }
        main.onmouseenter = function () {
            clearInterval(timer);
        }
        main.onmouseleave = function () {
            time();
        }

        for(var j = 0; j < oLi.length; j ++){
            (function(i){
                oLi[i].onclick = function(){
                    document.getElementsByClassName("on")[0].className = "";
                    this.className = "on";
                    for (var n = 0; n < uLi.length; n++) {
                        uLi[n].style.transform = "translateZ(-180px) rotateX(" + (i * 90) + "deg)";
                    }
                }     
            }(j))
        }
    }
}

