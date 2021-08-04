import { IEventMgr } from "../interface/IEventMgr";
import { ILayerMgr } from "../interface/ILayerMgr";
import { INetMgr } from "../interface/INetMgr";
import { IResMgr } from "../interface/IResMgr";
import { ISoundMgr } from "../interface/ISoundMgr";
import { ITimerMgr } from "../interface/ITimerMgr";
import { IViewMgr } from "../interface/IViewMgr";
import { EventMgr } from "./EventMgr";
import { LayerMgr } from "./LayerMgr";
import { LoadMgr } from "./LoadMgr";
import { NetMgr } from "./NetMgr";
import { ParamMgr } from "./ParamMgr";
import { ResMgr } from "./ResMgr";
import { SoundMgr } from "./SoundMgr";
import { TimerMgr } from "./TimerMgr";
import { ViewMgr } from "./ViewMgr";

/*
 * 全局管理
 * @Author: zwb 
 * @Date: 2021-06-28 10:39:45 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-02 15:48:23
 */
export class Mgr {
    /** 层级管理 */
    static readonly layer: ILayerMgr = LayerMgr.ins;
    /** 视图管理 */
    static readonly view: IViewMgr = ViewMgr.ins;
    /** 事件管理 */
    static readonly evt: IEventMgr = EventMgr.ins;
    /** 时间管理 */
    static readonly timer: ITimerMgr = TimerMgr.ins;
    /** 资源管理 */
    static readonly res: IResMgr = ResMgr.ins;
    /** 音效管理 */
    static readonly sound: ISoundMgr = SoundMgr.ins;
    /** 网络管理 */
    static readonly net: INetMgr = NetMgr.ins;
    /** 参数管理 */
    static readonly param: ParamMgr = ParamMgr.ins;
    /** 加载管理 */
    static readonly load: LoadMgr = LoadMgr.ins;
}