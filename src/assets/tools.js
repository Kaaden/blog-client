const tools = {
    sessionSet(name, data) {
        window.sessionStorage.setItem(name, data);
    },
    sessionGet(name) {
        return window.sessionStorage.getItem(name);
    },
    goNewPage(url, target) {
        target.$router.push(url);
    },
    goBack(target) {
        target.$route.back(-1);
    },
    fontSize() {
        let deviceWidth = document.documentElement.offsetWidth;
        if (deviceWidth > 1920) {
            deviceWidth = 1920;
        }
        let fontsize = deviceWidth / 19.2;
        document.documentElement.style = `font-size:${fontsize}px`
        console.log(fontsize);
    },
    scrollAnimate(scrollReveal) {
        scrollReveal.reveal(".rv", {
            //动画的时长
            duration: 300,
            //延迟时间
            delay: 0,
            //动画开始的位置，'bottom', 'left', 'top', 'right'
            origin: "top",
            //回滚的时候是否再次触发动画
            reset: true,
            //在移动端是否使用动画
            mobile: false,
            //滚动的距离，单位可以用%，rem等
            distance: "0",
            //其他可用的动画效果
            opacity: 0.8,
            easing: "ease-out",
            scale: 0.5
        });
    }

};

export { tools };
