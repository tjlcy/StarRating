// max      最大的分数（总星数）
// score    当前的评分
// message  评分的描述
// disabled 是否禁用(是否可以修改分数 false可以修改 true不可以修改)
function StarRating(options) {
    // 如果options里有 执行前者，没有的话执行后者（默认）
    this.max = options.max || 5;
    this.score = options.score || 0;
    this.message = options.message || ['极差', '差', '合格', '良好', '优秀'];
    this.disabled = options.disabled || false;
    this.Dom = null;
}
// 初始化结构以及功能
StarRating.prototype.init = function() {
    // 1.创建评分结构
    this.createElement(); //调用评分结构
    // 2.修改评分功能
    if (!this.disabled) {
        this.bindEvent(); //调用绑定事件
    }
};
// 创建评分结构
StarRating.prototype.createElement = function() {
    // 创建div标签
    var Dom = document.createElement("div");
    // 给div标签设置类名
    Dom.className = 'myRating';
    this.Dom = Dom;
    // 遍历
    for (let i = 1; i <= this.max; i++) {
        // 创建span标签  放星星
        var span = document.createElement("span");
        // 给span标签设置类名
        span.className = 'myRating-item';
        // setAttribute() 方法添加指定的属性，并为其赋指定的值。
        // 需要添加属性名和属性值  都是必须的，缺一会报错
        span.setAttribute("data-score", i);
        // 添加评分后效果
        if (i <= this.score) {
            // 添加特殊样式
            span.classList.add('item-complete');
        }
        // 将span插入到dom之中
        Dom.appendChild(span);
    }
    // 创建span标签  放置描述信息
    var spanMessage = document.createElement("span");
    // 给span标签设置类名
    spanMessage.className = 'myRating-message';
    // 将spanMessage呈现到页面中
    spanMessage.innerText = this.score + "分" + this.message[this.score - 1];
    // 将spanMessage 插入到dom之中
    Dom.appendChild(spanMessage);
    document.body.appendChild(Dom);
};
// 绑定事件
StarRating.prototype.bindEvent = function() {
    var self = this;
    this.Dom.onmouseover = function(e) {
        // target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。（注：IE不支持）
        // getAttribute() 方法返回指定属性名的属性值。
        var score = e.target.getAttribute("data-score");
        if (score) {
            // 修改评分的样式
            self.changeRating(score);
        }
    }
    this.Dom.onmouseleave = function(e) {
        self.changeRating(self.score);
    }
    this.Dom.onclick = function(e) {
        // getAttribute() 方法返回指定属性名的属性值。
        var score = e.target.getAttribute("data-score");
        if (score) {
            self.score = score;
            // 修改评分的样式
            self.changeRating(score);
        }
    }
};
// 修改评分
StarRating.prototype.changeRating = function(score) {
    var spanItems = this.Dom.getElementsByClassName('myRating-item');
    for (var i = 0; i < spanItems.length; i++) {
        // 判断当前星星是不是小于等于评分 如果是，则添加class类名；如果不是，则移除class类名
        i < score ? spanItems[i].classList.add("item-complete") : spanItems[i].classList.remove("item-complete");
    }
    var spanMessage = this.Dom.querySelector(".myRating-message");
    spanMessage.innerText = score + "分" + "  " + this.message[score - 1 > 0 ? score - 1 : 0];
};
// 写在原型链上---所有共有的方法，可以继承
Element.prototype.insertStarRating = function(options) {
    // 构造对象存储信息
    // this 代表调用insertStarRating的方法的元素
    var obj = new StarRating(options, this);
    // 初始化当前的星级评分信息
    obj.init();
}