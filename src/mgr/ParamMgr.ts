/*
 * 参数管理
 * @Author: zwb 
 * @Date: 2021-08-26 15:02:20 
 * @Last Modified by: zwb
 * @Last Modified time: 2022-05-13 17:32:47
 */
import { BaseIns } from "../base/BaseIns";

export class ParamMgr extends BaseIns {

    public static get ins(): ParamMgr {
        return super.ins as ParamMgr;
    }

    /** url参数 */
    private urlParam = {};

    public init(): void {
        let url: string = window["url"];
        this.urlParam = this.getUrlParam(url);
    }

    /**
     * 获取url参数
     * @param url 路径
     */
    private getUrlParam(url: string) {
        let urlParam = {};
        if (!url) return {};
        let whIdx = url.indexOf("?");
        if (whIdx != -1) {
            let params: string[] = url.slice(whIdx + 1).split("&");
            for (let i = 0; i < params.length; i++) {
                if (params[i] == "") continue;
                let strs = params[i].split("=");
                urlParam[strs[0]] = strs[1];
            }
        }
        return urlParam;
    }

    /** 是否关闭新手引导 */
    public isCloseGuide() {
        return this.urlParam["g"] == "0" ? true : false;
    }
}