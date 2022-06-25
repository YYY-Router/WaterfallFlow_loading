window.onload = function () {
    waterFull();
    let container = document.getElementById("con");
    //监听滚动加载事件
    document.onscroll = throttle(function () {
        let itme = document.getElementsByClassName("item");
        //判断是否加载到底部
        if (itme[itme.length - 1].getBoundingClientRect().top < window.innerHeight) {
            //只有新加载的才执行缩放动画
            for (let i = 0; i < itme.length; i++) {
                itme[i].className = "item";
            };
            //console.log('加载中')
            //模拟数据，正常应该是向后台请求数据
            for (let i = 0; i < 20; i++) {
                //for (let i = 1; i < 4; i++) {
                    let num = Math.floor(Math.random()*6 + 1);
                    container.innerHTML += `
                <div class="item show">
                    <div class="picture">
                        <img src="./images/demo0${num}.jpg" alt="" srcset="">
                    </div>
                </div>`;
               // }
            }
            waterFull();
        }
    },100)
    window.onresize = throttle(function () {
        //进行节流设置
        waterFull();
    }, 300)
};

//定义一个节流函数
function throttle(callback, delay) {
    let flag = true;
    return function () {
        if (flag) {
            flag = false;
            setTimeout(() => {
                callback.bind(this)();
                flag = true;
            }, delay)
        }
    }
}

function waterFull() {
    //1.设置container盒子的宽度:先拿到浏览器的可视区域的宽度，再除以一个item元素的宽度，得出一行排列元素的个数
    let container = document.getElementById("con");
    let itme = document.getElementsByClassName("item");
    let clientWidth = document.documentElement.clientWidth;//获取浏览器(客户端)的窗口宽度
    //获取每一行应该展示的item的个数
    let columnCount = Math.floor(clientWidth / itme[0].offsetWidth);
    //求出container的宽度
    container.style.width = columnCount * itme[0].offsetWidth + "px";
    //2.设置每一个item元素的排列位置，第一行整体的top值都是0，后面的依次找上面高度最小的容器并排列在其下面
    //定义一个数组，用来存每一行盒子的高度
    let hrr = [];
    for (let i = 0; i < itme.length; i++) {
        //判断是否为第一行
        if (i < columnCount) {
            itme[i].style.top = 0 + 'px';
            itme[i].style.left = i * itme[0].offsetWidth + 'px';
            hrr.push(itme[i].offsetHeight)
        } else {
            //除了第一行以外的元素,使用扩展运算符展开数组
            let min = Math.min(...hrr);
            // console.log(hrr)
            let index = hrr.indexOf(min);
            itme[i].style.top = min + 'px';
            itme[i].style.left = index * itme[0].offsetWidth + 'px';
            hrr[index] += itme[i].offsetHeight
        }
    }

}