(function (window,undefined) {
    var dom = {
        /*
         * 绑定事件
         * 参数：node：节点；eventName：事件名称；handler：操作者
         * */
        on: function (node, eventName, handler) {
            if (node.addEventListener) {  //FF
                node.addEventListener(eventName, handler);
            }
            else {
                node.attachEvent("on" + eventName, handler);  //IE
            }
        },
        //获取元素的样式
        getStyle: function (node, styleName) {
            var realStyle = null;
            if (window.getComputedStyle) {
                realStyle = window.getComputedStyle(node, null)[styleName];
            }
            else if (node.currentStyle) {
                realStyle = node.currentStyle[styleName];
            }
            return realStyle;
        },
        //获取设置元素的样式
        setCss: function (node, css) {
            for (var key in css) {
                node.style[key] = css[key];
            }
        }
    };
    //拖拽配置
    var draggableConfig = {
        zIndex: 1
    };
    //拖拽元素 node
    function DragElement(node) {
        this.none = node;
        this.x = 0;
        this.y = 0;
    }
    DragElement.prototype = {
        constructor: DragElement,
        init: function () {
            this.setEleCss({
                "left": dom.getStyle(node, "left"),
                "top": dom.getStyle(node, "top")
            })
        },
        //设置拖拽元素的x, y
        setXY: function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
            return this;
        },
        //设置元素节点的样式
        setEleCss: function (css) {
            dom.setCss(this.node, css);
            return this;
        }
    }
    //鼠标
    function Mouse() {
        this.mouseX = 0;
        this.mouseY = 0;
    }

    //获取网页可视宽度
    function getWidth(){
        if(window.innerWidth){
            return window.innerWidth;
        }
        else{
            if(document.compatMode == "CSS1Compat"){
                return document.documentElement.clientWidth;
            }
            else{
                return document.body.clientWidth;
            }
        }
    }
    //获取网页可视高度
    function getHeight(){
        if(window.innerHeight){
            return window.innerHeight;
        }
        else{
            if(document.compatMode == "CSS1Compat"){
                return document.documentElement.clientHeight;
            }
            else{
                return document.body.clientHeight;
            }
        }
    }
})();