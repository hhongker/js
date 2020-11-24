
/**
 * 这个函数，才是真正实现功能的函数
 * @param option 一个对象，配置对象
 */
function _message(option) {
    // 生成一个最终的配置，如果用户传递的配置不存在，则使用默认值
    // 对象混合
    var defaultOption = { //该对象提供所有属性的默认值
        type: "info", //消息类型： info、warn、error、success
        content: "", //消息提示内容
        duration: 1, //多少秒后关闭
        onClose: null //关闭后的回调
    }
    // Object.assign  混合对象
    var opt = Object.assign({}, defaultOption, option)

    // 根据opt对象中的配置创建div

    var div = document.createElement("div");
    div.className = "message " + opt.type;
    div.innerHTML = "<div class=\"icon\"></div><div class=\"content\">" + opt.content + "</div>"
    //为了实现动画，添加div的时候，要将它设置为最小
    div.style.transform = "translate(-50%, -50%) scale(0)";
    document.body.appendChild(div);
    //强行让浏览器进行渲染：只要出现读取某个元素最终样式（位置、尺寸）的代码
    getComputedStyle(div).top; //这句代码除了让浏览器强行渲染之外，没有任何其他意义

    //将div变回原来的大小
    div.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(close, opt.duration * 1000);

    function close() {
        div.style.transform = "translate(-50%, -50%) scale(0)";
        setTimeout(function () {
            div.remove();
            if (opt.onClose) {
                //传递了回调函数
                opt.onClose();
            }
        }, 200)
    }
}

/**
 * 提供给外面的人调用的函数
 */
function message() {
    //根据参数的情况，构造出合适的对象，调用 _message 
    if (arguments.length === 0) {
        //没有参数
        _message({});
    }
    else if (arguments.length === 1) {
        //有一个参数
        if (typeof arguments[0] === "object") {
            _message(arguments[0]); //第一个参数就是对象
        }
        else {
            _message({
                content: arguments[0]
            })
        }
    }
    else {
        //参数数量大于等于2，这种情况只需要前两个参数即可
        _message({
            content: arguments[0],
            type: arguments[1]
        })
    }
}