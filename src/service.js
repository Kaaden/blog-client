import qs from "qs";
import axios from "axios";
async function request(options) {
    let response;
    options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    try {
        response = await axios(options);
        return response;
    } catch (err) {
        return response;
    }
}
// const host="http://127.0.0.1:80"
const host = "http://kaaden.orrzt.com";
const addr = {
    bing: host + "/getBing",
    content: host + "/getContent",
    detail: host + "/getDetail",
    getTags: host + "/getTags",
    getUser: host + "/getUser"
};
export const getBing = (body) => {
    return request({
        method: "post",
        url: addr.bing,
        data: qs.stringify(body)
    });
}
export const getContent = (body) => {
    return request({
        method: "post",
        url: addr.content,
        data: qs.stringify(body)
    });
}
export const getDetail = (body) => {
    return request({
        method: "post",
        url: addr.detail,
        data: qs.stringify(body)
    });
}
export const getTags = (body) => {
    return request({
        method: "post",
        url: addr.getTags,
        data: qs.stringify(body)
    });
}
export const getUser = (body) => {
    return request({
        method: "post",
        url: addr.getUser,
        data: qs.stringify(body)
    });
}