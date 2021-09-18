/*
 * 界面管理
 * @Author: zwb 
 * @Date: 2021-06-28 11:30:09 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-31 14:09:37
 */
import { BaseIns } from "../base/BaseIns";
import { Mgr } from "./Mgr";
import { Model } from "../model/Model";
import { IWindowCfg } from "../interface/IConfig";
import { LayerName } from "../enum/Enums";
import { Utils } from "../utils/Utils";

export class ViewMgr extends BaseIns {

    public static get ins(): ViewMgr {
        return super.ins as ViewMgr;
    }

    /** 已开启的视图 */
    private _openViewMap: Map<string, any> = new Map();
    /** 各个层级开启的视图 */
    private _layerMap: Map<string, string> = new Map();

    /**
     * 界面开启统一接口
     * @param idOrName 功能id或者类名
     * @param layer 层级
     * @param isCloseOther 是否关闭其它界面
     * @param isMutex 是否开启同源互斥
     */
    public open(idOrName: number | string, layer: string = LayerName.viewLayer, isCloseOther: boolean = false, isMutex: boolean = true): void {
        if (this.isOpened(idOrName)) return;
        if (typeof idOrName === 'number') { 
            if (!this.isOpenFunc(idOrName)) return;
        }

        // 关闭其它界面
        if (isCloseOther) this.closeAll();

        // 同源互斥
        if (isMutex) {
            let prevName = this._layerMap.get(layer);
            if (prevName) this.close(prevName);
        }

        let className = this.getClassName(idOrName);
        let view = Utils.pool.pop(className);
        view.layer = layer;
        !view.hashCode && (view.hashCode = className);
        this._openViewMap.set(view.hashCode, view);
        this._layerMap.set(layer, className);
        Mgr.layer.addChild(view, layer);

        console.log(`open: ${className}`);
    }

    /**
     * 界面关闭统一接口
     * @param idOrName 功能id或者类名
     */
    public close(idOrName: number | string): void {
        let className = this.getClassName(idOrName);
        let view = this.getClassByName(className);
        if (!view) return;
        Utils.view.removeChild(view);
        Utils.pool.push(view);
        this._openViewMap.delete(view.hashCode);
        this._layerMap.delete(view.layer);

        console.log(`close: ${className}`);
    }

    /** 关闭所有开启的界面 */
    public closeAll(): void {
        this._openViewMap.forEach((val, key, map) => {
            Utils.view.removeChild(val);
            Utils.pool.push(val);
        });
        this._openViewMap.clear();
        this._layerMap.clear();
    }

    /**
     * 功能是否开启
     * @param funcId 功能id
     * @param isTips 是否提示
     */
    public isOpenFunc(funcId: number, isTips: boolean = true): boolean {
        let isOpen = false;
        this.checkFuncOpen(funcId);
        this.checkActOpen(funcId);
        return isOpen;
    }

    /**
     * 界面是否已打开
     * @param idOrName 
     */
    public isOpened(idOrName: number | string): boolean {
        let isOpen = false;
        let className = this.getClassName(idOrName);
        let view = this.getClassByName(className);
        if (view) isOpen = true;
        return isOpen;
    }

    /**
     * 对应层级开启的界面
     * @param layer 层级
     */
    public curLayerView(layer: string): any {
        let className = this._layerMap.get(layer);
        if (!className) return null;
        let view = this.getClassByName(className);
        return view;
    }

    /**
     * 根据类名获取开启的界面
     * @param className 类名
     */
    public getClassByName(className: string): any {
        let hashCode = Utils.hash.hashCode(className) + '';
        let view = this._openViewMap.get(hashCode);
        return view;
    }

    /** 检测功能开启 */
    private checkFuncOpen(funcId: number) {

    }

    /** 检测活动开启 */
    private checkActOpen(funcId: number) {

    }

    /** 获取类名 */
    private getClassName(idOrName: number | string): string {
        let className = '';
        if (typeof idOrName === 'number') {
            let cfg: IWindowCfg = Model.config.window[idOrName];
            className = cfg.funName;
        } else {
            className = idOrName;
        }
        return className;
    }
}