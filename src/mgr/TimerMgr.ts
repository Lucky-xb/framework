/*
 * 时间管理
 * @Author: zwb 
 * @Date: 2021-06-28 15:32:56 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 15:02:02
 */
import { ITimerMgr } from "../interface/ITimerMgr";
import { BaseIns } from "../base/BaseIns";

export class TimerMgr extends BaseIns implements ITimerMgr {

    public static get ins(): TimerMgr {
        return super.ins as TimerMgr;
    }

    /** 全局定时器 */
    public startTimer() {
        Laya.timer.loop(1000, this, this.onTimer);
    }

    /** 用于检测红点，避免其它操作，逻辑在model里面写 */
    private onTimer() {

    }
}