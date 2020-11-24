var main = document.getElementsByClassName("main")[0];
var input = document.getElementsByTagName("input")[0];

var paperwidth = 170;
var paperheight = 170;

main.onmousedown = function (e) {
    var paper = paper(e);
    var paperStyle = getComputedStyle(paper);
    var paperLeft = parseFloat(paperStyle.left);
    var paperTop = parseFloat(paperStyle.top);

    var initX = e.pageX;
    var initY = e.pageY;
    main.onmousemove = function (t) {
        var dirtaX = t.pageX - initX;
        var dirtaY = t.pageY - initY;

        var panX = paperLeft + dirtaX;
        var panY = paperTop + dirtaY;
        if (panX < 0) {
            panX = 0;
        }
        if (panY < 0) {
            panY = 0;
        }
        if (panX > document.documentElement.clientWidth - paperwidth) {
            panX = document.documentElement.clientWidth - paperwidth;

        }
        if (panY > document.documentElement.clientHeight - paperheight - 80) {
            panY = document.documentElement.clientHeight - paperheight - 80;
        }

        paper.style.left = panX + "px";
        paper.style.top = panY + "px";
    }

    main.onmouseup = function () {
        this.onmousemove = null;
    }

    function paper(e) {
        if (e.target.tagName === "DIV") {
            return e.target;
        } else {
            return e.target.parentElement
        }
    }
}

input.onkeydown = function (e) {
    if (e.key === "Enter" && this.value.trim()) {
        createPaper(this.value);
        this.value = null;

    }

    function createPaper(v) {
        // main.innerHTML += "<div class=\"paper\"><p>" + v + "</p><span>X</span></div>";
        var div = document.createElement("div");
        div.innerHTML = "<p>" + v + "</p><span>X</span>";
        // var p = document.createElement("p");
        // var span = document.createElement("span");
        div.className = "paper";
        // p.innerText = v;
        div.style.backgroundColor = "rgb("+(Math.random()*101+100)+","+(Math.random()*101+100)+","+(Math.random()*101+100)+")";
        div.style.left = Math.random()*document.documentElement.clientWidth - paperwidth + "px";
        div.style.top = Math.random()*(document.documentElement.clientHeight - paperheight-80) + "px";

        // div.appendChild(p);
        // div.appendChild(span);
        main.appendChild(div);
    }
}

main.onclick = function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}
