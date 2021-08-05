/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:33:02 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-05 15:27:04
 */
export interface IEventMgr {
    /** 手机点击屏幕后调度 */
    onTap(eventDispatcher: Laya.EventDispatcher, listener: Function, caller: any, args?: any[]);
    /** 通用事件监听 带类型(一次性监听) */
    once(eventDispatcher: Laya.EventDispatcher, type: string, listener: Function, caller: any, args?: any[]);
}