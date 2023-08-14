import e from "axios"; import { Code as t, ERROR_CODES as o } from "./config.mjs"; 
import { isDev as s } from "./utils.mjs"; 
class r { constructor(e) { 
    this.verbose = !1 !== e?.verbose && s(e?.verbose), 
    this.instance = this.createAxios(e), 
    this.method = ["GET", "POST", "DELETE", "PUT", "PATCH"], 
    this.setMethodFun() } 
    
    createAxios(t) { 
        const o = e.create({ timeout: 6e4, headers: { "Content-Type": "application/json;charset=utf-8" }, ...t }); 
        
        return o.interceptors.request.use(
            (e => (this.verbose && (console.log("---------------请求_START---------------"), console.log(`请求的地址: baseURL --\x3e${e.baseURL}`),
             console.log(`请求的地址: URL     --\x3e${e.url}`), 
             console.log(`请求的方式:         --\x3e${e.method}`), 
             console.log(`请求的参数: ${JSON.stringify(e.params || e.data)}`), 
             console.log("---------------请求_END---------------\n\n\n")), e)), 
             (e => (console.error("接口请求错误"), Promise.reject(e)))), 


             o.interceptors.response.use((e => {
                 this.verbose && console.log("---------------接口请求返回中---------------"); 
                 const t = e.data; return this.checkCode(t) ? e.data.result || e.data.data || e.data.dataList || e.data : Promise.reject(t) }),
                  (e => (console.error("接口请求返回错误"), Promise.reject(e)))), o } 
                  checkCode(e) { const s = Number(e.code); 
                    if (!isNaN(s) && s !== t.OK) { const t = o[s] || e.msg; return console.error(t), !1 } return !0 } 

                    getRequestParams(e, t) { return "GET" === t ? { params: e } : { data: e } } request(e, t, o, s, r = {}) { return this.instance({ url: e, ...this.getRequestParams(t, s), method: s, headers: { "Content-Type": "application/json", ...o }, ...r }) } 

            setMethodFun() { this.method.forEach((e => { this[e.toLowerCase()] = (t, o = {}, s, r) => this.request(t, o, s, e, r) })) } } export { r as default };
