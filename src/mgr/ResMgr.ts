/*
 * 资源管理
 * @Author: zwb 
 * @Date: 2021-06-28 15:36:48 
 * @Last Modified by: zwb
 * @Last Modified time: 2022-01-13 10:03:21
 */
import { IResMgr } from "../interface/IResMgr";
import { BaseIns } from "../base/BaseIns";

export class ResMgr extends BaseIns implements IResMgr {

    public static get ins(): ResMgr {
        return super.ins as ResMgr;
    }

    /**
     * 加载UI资源，目前用于加载模块
     * @param url 
     * @param loadPlugs 
     * @param complete 
     * @param progress 
     * @param type 
     * @param priority 
     * @param group 
     */
    //  public loadUI(url: any, loadPlugs?: { new(): BaseLoadingPlugs }, complete?: Handler, progress?: Handler, type?: string, priority: number = 1, group?: string): void {
    //     if (loadPlugs) {
    //         let plugs: BaseLoadingPlugs = PlugsCreater.create(loadPlugs, loadPlugs["name"]) as BaseLoadingPlugs;
    //         if (!plugs.isDoing) {
    //             plugs.completeHandle = complete;
    //             plugs.progressHandle = progress;
    //             let data: any = { url: url, type: type, priority: priority, group: group };
    //             plugs.doThing(data);
    //         }
    //     } else {
    //         this.load(url, complete, progress, type, priority, group);
    //     }
    // }

    public loadRes(url: string, complete: laya.utils.Handler) {
        
    }

    /** 读取资源 */
    public getRes(name: string): any {
        return Laya.loader.getRes(name);
    }

    /** 读取JSON */
    public getJson(name: string): any {
        
    }
}