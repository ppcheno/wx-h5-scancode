// import VueCookies from "vue-cookies";
import { Base64 } from "js-base64";
import axios from "axios";
import qs from "qs";
export const basePrefix = "/tmr";
const baseUrl = process.env.VUE_APP_BASE_API;
export function getStorageObj(key) {
    let valStr = localStorage.getItem(key);
    if (!valStr) {
        return null;
    }
    return JSON.parse(valStr);
}

export function setStorageObj(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

export function getSessionStorageObj(key) {
    let valStr = sessionStorage.getItem(key);
    if (!valStr) {
        return null;
    }
    return JSON.parse(valStr);
}

export function setSessionStorageObj(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
}

export async function post(path, urlParams = {}) {
    // path = basePrefix + path
    // Object.assign(urlParams, { userId: getSessionStorageObj("userId") });
    axios.defaults.baseURL = baseUrl;
    let ret = await axios.post(path, qs.stringify(urlParams));
    if (ret.status !== 200) {
        throw Error("请求失败");
    }
    ret = ret.data;
    if (ret.code !== "000000") {
        // Toast.fail({
        //     message: ret.msg,
        //     duration: 1.5 * 1000
        // });
        // throw Error("请求失败：" + ret.desc);
        return null;
    }
    return ret.data;
}

export function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

// export function getCookie(key) {
//     let valStr = VueCookies.get(key);
//     if (!valStr) {
//         return null;
//     }
//     //valStr = Base64.decode(valStr)
//     return valStr;
// }

export const getDeviceInfo = function() {
    let obj = {
        clientWidth: 375,
        clientHeight: 667,
        dpr: 2
    };

    try {
        obj.clientWidth = document.documentElement.clientWidth;
        obj.clientHeight = document.documentElement.clientHeight;
        obj.dpr = window.devicePixelRatio;
    } catch (error) {}

    return obj;
};

export const formatAvatarList = function(arr) {
    let avList = [];
    arr.forEach((e, i) => {
        if (e.helperInfo) {
            let obj = JSON.parse(e.helperInfo);
            avList.push(obj);
        }
    });
    return avList;
};

export function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
}

export function downloadByUrl(url, name) {
    try {
        const elt = document.createElement("a");
        elt.setAttribute("href", url);
        elt.setAttribute("download", name);
        elt.style.display = "none";
        document.body.appendChild(elt);
        elt.click();
        document.body.removeChild(elt);
    } catch (error) {
        console.log(error);
    }
}

export function utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
            return "&#" + code + ";";
        } else {
            return char;
        }
    });
    return str;
}

//转表情
export function uncodeUtf16(str) {
    var reg = /\&#.*?;/g;
    var result = str.replace(reg, function(char) {
        var H, L, code;
        if (char.length == 9) {
            code = parseInt(char.match(/[0-9]+/g));
            H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
            L = ((code - 0x10000) % 0x400) + 0xdc00;
            return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
        } else {
            return char;
        }
    });
    return result;
}


export function get_time_diff(time) {
    var diff = "";
    var time_diff = time - new Date().getTime(); //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
        // diff += days + "天";
    }
    //计算出小时数
    var leave1 = time_diff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
        if (hours < 10) {
            diff += "0" + hours + ":";
        } else {
            diff += hours + ":";
        }
    } else {
        if (diff !== "") {
            diff += hours + ":";
        }
    }
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
        if (minutes < 10) {
            diff += "0" + minutes + ":";
        } else {
            diff += minutes + ":";
        }
    } else {
        if (diff !== "") {
            diff += minutes + ":";
        }
    }
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    if (seconds > 0) {
        if (seconds < 10) {
            diff += "0" + seconds + "";
        } else {
            diff += seconds + "";
        }
    } else {
        if (diff !== "") {
            diff += seconds + "";
        }
    }

    return diff;
}
