import $ from "jquery";

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
        var deviceWidth = $(document).width();
        if (deviceWidth > 1920) {
            deviceWidth = 1920;
        }
        var fontSize = deviceWidth / 19.2;
        $("html").css("fontSize", fontSize);
        console.log(fontSize);
    }
};

export { tools };
