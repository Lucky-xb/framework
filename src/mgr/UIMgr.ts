/*
 * UI管理
 * @Author: zwb 
 * @Date: 2021-08-30 14:45:38 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-30 14:48:03
 */
import { BaseIns } from "../base/BaseIns";
import { MainUIView } from "../view/MainUIView";

export class UIMgr extends BaseIns {

    public static get ins(): UIMgr {
        return super.ins as UIMgr;
    }

    /** 统一注册类 */
    public register(): void {
        let reg = Laya.ClassUtils;
        reg.regClass('MainUIView', MainUIView);
    }
}