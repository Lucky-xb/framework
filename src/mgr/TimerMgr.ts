/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:32:56 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-06-29 11:49:55
 */
import { ITimerMgr } from "../interface/ITimerMgr";
import { BaseIns } from "../base/BaseIns";

export class TimerMgr extends BaseIns implements ITimerMgr {

    public static get ins(): TimerMgr {
        return super.ins as TimerMgr;
    }
}