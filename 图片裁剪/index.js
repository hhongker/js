var containerSize = 500; //左边容器的尺寸

//截图区域
var cut = {
    size: 150, //截图区域的宽高
    left: 150, //横坐标
    top: 150, //纵坐标
    dom: document.querySelector(".left .cut"), //关联的dom元素
    render: function () { //根据当前的尺寸、位置更新dom元素
        this.dom.style.width = this.size + "px";
        this.dom.style.height = this.size + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    },
    move: function (newLeft, newTop) { //移动到一个新的位置
        //保证newLeft和newTop一定在可用范围内
        if (newLeft < 0) {
            newLeft = 0;
        }
        var maxLeft = containerSize - this.size;//最大横坐标
        if (newLeft > maxLeft) {
            newLeft = maxLeft;
        }


        if (newTop < 0) {
            newTop = 0;
        }
        var maxTop = containerSize - this.size; //最大纵坐标
        if (newTop > maxTop) {
            newTop = maxTop;
        }
        //代码经过了上面两段，可以保证newLeft和newTop一定在可用范围内
        this.left = newLeft;
        this.top = newTop;
        //更新dom元素
        this.render();
        result.setResult();
    },
    moveEvent: function () { //关联移动的事件，调用该方法后，完成事件注册
        this.dom.onmousedown = function (e) {
            //记录按下时鼠标的位置
            var x = e.pageX;
            var y = e.pageY;
            //按下时截图区域的位置
            var left = cut.left;
            var top = cut.top;

            window.onmousemove = function (e) {
                //核心逻辑
                var disX = e.pageX - x;
                var disY = e.pageY - y;
                cut.move(left + disX, top + disY);
            }

            window.onmouseup = function (e) {
                window.onmousemove = null;
            }
        }
    },
    resize: function (newSize) { //变化为一个新的尺寸
        //控制newSize在合理的范围内
        if (newSize < 50) {
            newSize = 50;
        }
        //最大值是多少
        var maxWidth = containerSize - this.left; //横向到顶的尺寸
        var maxHeight = containerSize - this.top; //纵向到顶的尺寸
        var maxSize = Math.min(maxWidth, maxHeight); //取最小值，得到最大尺寸
        if (newSize > maxSize) {
            newSize = maxSize;
        }
        this.size = newSize;
        //更新dom元素
        this.render();
        result.setResult();
    },
    resizeEvent: function () { //关联尺寸事件
        var div = document.querySelector(".cut .resize");
        div.onmousedown = function (e) {
            //阻止冒泡
            e.stopPropagation();
            //记录按下时的相关数据
            var x = e.pageX;
            var y = e.pageY;
            var size = cut.size;
            window.onmousemove = function (e) {
                var disX = e.pageX - x;
                var disY = e.pageY - y;
                var dis = Math.max(disX, disY); //取鼠标的最大移动距离
                cut.resize(size + dis)
            }

            window.onmouseup = function () {
                window.onmousemove = null;
            }
        }
    }
}

cut.moveEvent(); //关联移动事件
cut.resizeEvent(); //关联尺寸事件

//结果区域
var result = {
    bgLeft: 0, //背景图的横位置
    bgTop: 0,  //背景图的纵坐标
    bgSize: 0, //背景图的尺寸
    size: 150, //结果区域的尺寸，固定
    dom: document.querySelector(".right"),
    render: function () {
        this.dom.style.backgroundSize = this.bgSize + "px " + this.bgSize + "px";
        this.dom.style.backgroundPosition = "-" + this.bgLeft + "px -" + this.bgTop + "px"
    },
    setResult: function () { //根据截图区域的尺寸和位置，重新计算结果区域的尺寸和位置
        this.bgSize = this.size / cut.size * containerSize;
        this.bgLeft = cut.left / containerSize * this.bgSize;
        this.bgTop = cut.top / containerSize * this.bgSize;

        this.render();
    }
}

result.setResult();