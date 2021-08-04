/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:32:59 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-06-29 15:28:56
 */
import { IEventMgr } from "../interface/IEventMgr";
import { BaseIns } from "../base/BaseIns";

export class EventMgr extends BaseIns implements IEventMgr {

    public static get ins(): EventMgr {
        return super.ins as EventMgr;
    }

    private evtMap: any = {};

    public on(eventDispatcher: Laya.EventDispatcher, type: string, listener: Function, caller: any, args?: any[]): void {
        this.create(eventDispatcher, type, listener, caller, args);
    }

    public once(): void {
        
    }

    public create(eventDispatcher: Laya.EventDispatcher, type: string, listener: Function, caller: any, args?: any[], useCapture?: boolean, priority?: number, once?: boolean): void {
        eventDispatcher.on(type, caller, listener, args);
    }

    /** 播放点击音效 */
    private playClickSound(): void {
        
    }
}