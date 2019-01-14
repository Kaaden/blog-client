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

};

export { tools };
