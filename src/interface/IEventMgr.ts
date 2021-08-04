/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:33:02 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-06-29 15:39:15
 */
export interface IEventMgr {
    on(eventDispatcher: Laya.EventDispatcher, type: string, listener: Function, caller: any, args?: any[])
}