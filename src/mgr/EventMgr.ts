/*
 * 事件管理
 * @Author: zwb 
 * @Date: 2021-06-28 15:32:59 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 14:59:41
 */
import { IEventMgr } from "../interface/IEventMgr";
import { BaseIns } from "../base/BaseIns";
import { IEventData } from "../interface/IEventData";

export class EventMgr extends BaseIns implements IEventMgr {

    public static get ins(): EventMgr {
        return super.ins as EventMgr;
    }

    private _evtMap: Map<number, IEventData> = new Map();

    /** 手机点击屏幕后调度 */
    public onTap(eventDispatcher: Laya.EventDispatcher, listener: Function, caller: any, args?: any[]): void {
        this.create(eventDispatcher, Laya.Event.MOUSE_DOWN, listener, caller, args);
    }

    public once(eventDispatcher: Laya.EventDispatcher, type, listener: Function, caller: any, args?: any[]): void {
        this.create(eventDispatcher, type, listener, caller, args, true);
    }

    public create(eventDispatcher: Laya.EventDispatcher, type: string, listener: Function, caller: any, args?: any[], once?: boolean) {
        let self = this;

        let autoRemove = function () {
            caller.off(Laya.Event.REMOVED, autoRemove, caller);
            // self.removeGroup(hashCode);
        }

        let callback = function(e) {
            listener && listener.call(caller, e);
            self.sendClickTrack(eventDispatcher, type);
            self.disableSomeTime(eventDispatcher, type);
            self.playClickSound(eventDispatcher, type);
        }

        // 只响应一次的不需要管理，直接返回
        if (once) return eventDispatcher.once(type, caller, callback, args);

        let hashCode: number = caller.hashCode;
        if (!hashCode) {
            hashCode = -1;
        }

        let evtData = this._evtMap.get(hashCode);
        if (!evtData) {
            evtData = { hashCode: hashCode, evts: [], caller: caller };
            /** 回收池没有的时候，并且属于thisObject属于egret.EventDispatcher | egret.IEventDispatcher */
            "on" in caller && caller.on(Laya.Event.REMOVED, autoRemove, caller);
        }
        evtData.evts.push({
            eventDispatcher: eventDispatcher,
            type: type,
            listener: callback,
        })
        this._evtMap.set(hashCode, evtData);

        eventDispatcher.on(type, caller, callback, args);
    }

    /** 清除单个监听 */
    public remove(eventDispatcher: Laya.EventDispatcher, type: string, caller: any) {
        let hashCode: number = caller.hashCode;
        if (!hashCode) {
            hashCode = -1;
        }
        let evtData = this._evtMap.get(hashCode);
        if (evtData) {
            for (let i: number = evtData.evts.length - 1; i >= 0; i--) {
                let item = evtData.evts[i];
                // if (item.eventDispatcher.hashCode == eventDispatcher.hashCode && type == item.type) {
                //     eventDispatcher.off(type, caller, item.listener);
                //     evtData.evts.splice(i, 1);
                // }
            }
        }
    }

    /** 统一点击打点上报 */
    private sendClickTrack(eventDispatcher: Laya.EventDispatcher, type: string) {

    }

    /** 统一处理屏蔽按钮 */
    private disableSomeTime(eventDispatcher: Laya.EventDispatcher, type: string) {
        
    }

    /** 播放点击音效 */
    private playClickSound(eventDispatcher: Laya.EventDispatcher, type: string): void {
        
    }
}