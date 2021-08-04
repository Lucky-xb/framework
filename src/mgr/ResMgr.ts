/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:36:48 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-07-30 17:39:12
 */
import { IResMgr } from "../interface/IResMgr";
import { BaseIns } from "../base/BaseIns";

export class ResMgr extends BaseIns implements IResMgr {

    public static get ins(): ResMgr {
        return super.ins as ResMgr;
    }

    /** 读取JSON */
    public getJson(name: string): any {
        
    }
}