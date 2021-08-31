/*
 * 资源管理
 * @Author: zwb 
 * @Date: 2021-06-28 15:36:48 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 15:55:37
 */
import { IResMgr } from "../interface/IResMgr";
import { BaseIns } from "../base/BaseIns";

export class ResMgr extends BaseIns implements IResMgr {

    public static get ins(): ResMgr {
        return super.ins as ResMgr;
    }

    /** 读取资源 */
    public getRes(name: string): any {
        return Laya.loader.getRes(name);
    }

    /** 读取JSON */
    public getJson(name: string): any {
        
    }
}