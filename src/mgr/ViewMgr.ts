/*
 * @Author: zwb 
 * @Date: 2021-06-28 11:30:09 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-06-29 15:15:13
 */
import { IViewMgr } from "../interface/IViewMgr";
import { BaseIns } from "../base/BaseIns";
import { Mgr } from "./Mgr";

export class ViewMgr extends BaseIns implements IViewMgr {
    
    public static get ins(): ViewMgr {
        return super.ins as ViewMgr;
    }

    /** 视图字典 */
    private viewMap = {};
    /** 视图列表 */
    private viewList = [];
    /** 已开启的视图 */
    private openViewMap = {};

    public register() {

    }

    public open(dispatcher: any, layer?: string, isCloseOther?: boolean): void {
        let name = dispatcher.name;
        this.viewMap[name] = dispatcher;
        this.openViewMap[name] = dispatcher;
        this.viewList.push(dispatcher);
        Mgr.layer.addChild(dispatcher, layer);
    }

    public close(): void {

    }
}