if (!window.myPlugin) {
    window.myPlugin = {};
}
window.myPlugin.woterfall = function (peizhi) {
    var defaultPeizhi = {
        imgWidth: 120,
        mingrap: 10,
        main: document.getElementsByTagName("body")[0],
        imgs: []
    };
    var zhenshipeizhi = window.myPlugin.mixin(defaultPeizhi, peizhi);

    var imgsarr = [];

    inIt();



    function inIt() {
        setParent();
        createImg();
        winChange();
    }

    function winChange(){
        var debouse = window.myPlugin.debounce(setImgPosition,300);
        window.onresize = debouse;
    }

    function setImgPosition() {
        var numAndgrap = imgNumber();
        var imgarr = new Array(numAndgrap.imgNumber);
        imgarr.fill(0);
        imgsarr.forEach(function (e) {
            var minTop = Math.min.apply(null, imgarr);
            e.style.top = minTop + "px";
            var index = imgarr.indexOf(minTop);
            imgarr[index] += e.clientHeight + numAndgrap.grap;
            e.style.left = index * (zhenshipeizhi.imgWidth + numAndgrap.grap) + "px";
        });
        zhenshipeizhi.main.style.height = Math.max.apply(null,imgarr) - numAndgrap.grap +"px";
    }

    function setParent() {
        var style = getComputedStyle(zhenshipeizhi.main);
        if (style.position === "static") {
            zhenshipeizhi.main.style.position = "relative";
        }
        zhenshipeizhi.main.style.overflow = "hidden";
    }

    function createImg() {
        var debouse = window.myPlugin.debounce(setImgPosition,100);
        var imgs = document.createDocumentFragment();
        for (var i = 0; i < zhenshipeizhi.imgs.length; i++) {
            var img = document.createElement("img");
            img.src = zhenshipeizhi.imgs[i];
            img.style.width = zhenshipeizhi.imgWidth + "px";
            img.style.position = "absolute";
            img.style.transition = ".5s";
            img.onload = debouse;
            imgs.appendChild(img);
            imgsarr.push(img);
        }
        zhenshipeizhi.main.appendChild(imgs);
    }

    function imgNumber() {//计算一行多少个img
        var mainStyle = getComputedStyle(zhenshipeizhi.main);
        var imgnumber = Math.floor((parseFloat(mainStyle.width) + zhenshipeizhi.mingrap) / (zhenshipeizhi.imgWidth + zhenshipeizhi.mingrap));
        var grap = (parseFloat(mainStyle.width) - imgnumber * zhenshipeizhi.imgWidth) / (imgnumber - 1);
        var numberAndGrap = {};
        numberAndGrap.imgNumber = imgnumber;
        numberAndGrap.grap = grap;
        return numberAndGrap;
    }
}