/*
 * 红点管理
 * @Author: zwb 
 * @Date: 2021-08-26 14:58:40 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 15:35:21
 */
import { BaseIns } from "../base/BaseIns";

export class RedMgr extends BaseIns {

    public static get ins(): RedMgr {
        return super.ins as RedMgr;
    }

    private _redMap: Map<number, boolean> = new Map();

    /** 检测红点 */
    public checkRed(funcId: number) {
        
    }

    /** 是否有红点 */
    public isHasRed(funcId: number): boolean {
        if (!this._redMap.has(funcId)) this.checkRed(funcId);
        return this._redMap.get(funcId);
    }

    /**
     * 派发红点事件
     * @param funcId 功能id
     * @param isRed 是否有红点
     */
    public sendRedEvent(funcId: number, isRed?: boolean) {
        
    }
}