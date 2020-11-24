if (!this.myPlugin) {
    this.myPlugin = {};
}

this.myPlugin.inherit = (function () {//继承
    var Temp = function () { }
    return function (son, farther) {
        Temp.prototype = father.prototype;
        son.prototype = new Temp();
        son.prototype.constructor = son;
        son.prototype.uber = fater.prototype;
    }
}())

this.myPlugin.mixin = function (obj1, obj2) {//混合对象
    // return Object.assign({},obj1,obj2);

    var newObj = {};
    for (var prop in obj2) {
        newObj[prop] = obj2[prop];
    }
    for (var prop in obj1) {
        if (!(prop in obj2)) {
            newObj[prop] = obj1[prop];
        }
    }
    return newObj;
}

this.myPlugin.clone = function (obj, deep) {//克隆
    if (Array.isArray(obj)) {
        if (deep) {
            var newArr = [];
            for (var i = 0; i < obj.length; i++) {
                newArr.push(this.clone(obj[i], deep));
            }
            return newArr;
        } else {
            return obj.slice();//复制数组
        }
    } else if (typeof obj === "object") {
        var newObj = {};
        for (var prop in obj) {
            if (deep) {
                newObj[prop] = this.clone(obj[prop], deep);
            } else {
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    } else {
        return obj;
    }
}

this.myPlugin.debounce = function (callback, time) {//函数防抖
    var timer;
    return function () {
        clearTimeout(timer);
        var args = arguments;
        timer = setTimeout(function () {
            callback.apply(null, args)
        }, time);
    }
}

this.myPlugin.throttle = function (callback, time, immediately) {//函数节流
    if (immediately) {
        var t;
        return function () {
            if (!t || Date.now() - t >= time) {
                callback.apply(null, arguments);
                t = Date.now();
            }
        }
    } else {
        var timer;
        return function () {
            if (timer) {
                return;
            }
            var args = arguments;
            timer = setTimeout(function () {
                callback.apply(null, args);
                tiemr = null;
            }, time);
        }
    }
}

this.myPlugin.curry = function (func) {//柯里化函数
    //截取下标为1及之后的参数
    var args = Array.prototype.splice.call(arguments, 1);
    var that = this;
    return function () {
        var curArgs = Array.from(arguments);
        var totalArgs = args.concat(curArgs);//当前调用的函数
        if (totalArgs.length >= func.length) {//参数数量够了
            return func.apply(null, totalArgs);
        } else {//参数数量不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}

this.myPlugin.pipe = function(){//函数管道
    var args = Array.from(arguments);
    for(var i = 0; i < args.length; i ++){
        var func = args[i];
        val = func(val);
    }
    return val;
}