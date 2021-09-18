/*
 * UI管理
 * @Author: zwb 
 * @Date: 2021-08-30 14:45:38 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-01 14:22:28
 */
import { BaseIns } from "../base/BaseIns";
import { ClassName } from "../enum/Enums";
import { MainUIView } from "../view/MainUIView";

export class UIMgr extends BaseIns {

    public static get ins(): UIMgr {
        return super.ins as UIMgr;
    }

    /** 统一注册类，创建的界面都需要在这里注册才能用open接口打开 */
    public register(): void {
        let reg = Laya.ClassUtils.regClass;
        // view界面
        reg(ClassName.MainUIView, MainUIView);

        // popup弹窗
    }
}