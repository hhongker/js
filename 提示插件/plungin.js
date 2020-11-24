if (!window.myobj) {
    window.myobj = {};
}
window.myobj.myplugin = (function () {

    //全局的属性
    var main = null,
        tip = null,
        topTip = null,
        midTip = null,
        bottomTip = null,

        closeSure = null,
        sure = null,
        cancle = null,
        tips = null,
        sureClassName = null,
        cancleClassName = null,

        isReg = false,
        surecallback = null,
        canclecallback = null;

    function openPlugin(plugin) {
        plu = plugin || {};
        peiZhi(plu);
        createMC();
        createTip();
        setTip();
        listenner();
    }
    function peiZhi(plugin) {
        closeSure = plugin.closeSure || "确定关闭？";
        sure = plugin.sure || "确定";
        cancle = plugin.cancle || "取消";
        tips = plugin.tips || "提示";
        sureClassName = plugin.sureClassName || "";
        cancleClassName = plugin.cancleClassName || "";
        surecallback = plugin.surecallback;
        canclecallback = plugin.canclecallback;
    }

    //创建一个蒙层
    function createMC() {
        if (!main) {
            main = document.createElement("div");
            main.style.width = "100%";
            main.style.height = "100%";
            main.style.position = "fixed";
            main.style.left = main.style.top = main.style.right = main.style.bottom = "0";
            main.style.backgroundColor = "rgba(0,0,0,.2)";

            main.style.fontSize = "18px";
            document.body.appendChild(main);
        }
        if (main.style.display === "none") {
            main.style.display = "block";
        }
    }

    //中间的提示
    function createTip() {
        if (!tip) {
            tip = document.createElement("div");
            tip.style.width = "300px";
            tip.style.height = "180px";
            tip.style.backgroundColor = "#fff";
            tip.style.position = "absolute";
            tip.style.margin = "auto";
            tip.style.padding = "0 20px";
            tip.style.left = tip.style.top = tip.style.right = tip.style.bottom = "0";
            main.appendChild(tip);
        }
    }

    //设置一下提示
    function setTip() {
        if (!topTip) {
            topTip = document.createElement("div");
            topTip.style.overflow = "hidden";
            topTip.style.padding = "8px 0";
            topTip.innerHTML = `
                                    <span style = "float:left;">${tips}</span>
                                    <img class = "imgCancle" style = "float:right; width:18px; height:18px;margin-top: 4px;" 
                                    src='data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABiklEQVRoQ+2ZzU0DMRBGX5rgEIk+
                                    aIEDx9BELlABogJOUERyowpyoAxONIGMWGmV7K7HM5+1WPJe1+N5z+OfjbOh8WfTOD9dYO0K9gr0
                                    CgRHIDeFnoBb4Bo4AI/BfNbwV2AHfACfwPNcYE7gHbgbBR+BeyuFs10aqAQ/PCfgxivwBWzPgmtK
                                    nMOn1N/AlVfgBXiYCK4hMQWfUr8Be69AipvrWCnhzpFbA4O4O4FhHYT6tgrUqkQIPkGVCKglwvAe
                                    AZWEBN4rEJWQwUcEvBJS+KhAqYQcXiFglagCrxLISaT342+b4WiQHISl2+jSuTQ3ylMxEnhlBXIn
                                    9lhCBl9DYGk6pXdS+C4wMbkt60Bahb6I/6qwtM//+23UckhZ2hh+Olw2iU6hErCStmaZiIAHyBOz
                                    KOMViIBEYi9kPAIKAEUfvzKlArLEqtuOEgElfO7byXzYWQVqwEskLAI14cMSOYHmrxabv9xt/nq9
                                    +T84zN8kazXMLeK1uMx5u4B5qCo17BWoNLDmbpuvwA/as3wxVVDYfQAAAABJRU5ErkJggg=='/>
                                    `;
            tip.appendChild(topTip);
        }
        if (!midTip) {
            midTip = document.createElement("div");
            midTip.style.padding = "16px 0";
            midTip.style.marginTop = "2px";
            midTip.style.borderTop = "1px solid #ccc"
            midTip.innerText = closeSure;
            tip.appendChild(midTip);
        }
        if (!bottomTip) {
            bottomTip = document.createElement("div");
            bottomTip.style.padding = "25px 90px";
            bottomTip.style.overflow = "hidden";
            bottomTip.innerHTML = `
                    <button data-sure="sure" class = "${sureClassName}">${sure}</button>
                    <button data-cancle="cancle" class = "${cancleClassName}" style="float:right">${cancle}</button>
                `;
            tip.appendChild(bottomTip);
        }
    }

    function listenner() {
        if(!isReg){
            main.onclick = document.getElementsByClassName("imgCancle")[0].onclick = function (e) {
                if(e.target === this){
                    main.style.display = "none";
                }
            }
            document.querySelector("[data-sure]").onclick = function () {
                if (surecallback) {
                    surecallback();
                }
                main.style.display = "none";
            }
            document.querySelector("[data-cancle]").onclick = function () {
                if (canclecallback) {
                    canclecallback();
                }
                main.style.display = "none";
            }
        }
        isReg = true;
    }

    return openPlugin;
}())