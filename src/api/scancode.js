import request from "@/utils/request";
import qs from "qs";

export function getScanCode(data){
    return request({
        // url:'http://fangwei.hefengzhimian.com/crm/hfj/queryProductCodeMark',
        url:`${process.env.VUE_APP_BASE_URL}/hfj/queryProductCodeMark`,
        method:"post",
        data:qs.stringify(data)
    })
}
