/*
 * 参数管理
 * @Author: zwb 
 * @Date: 2021-08-26 15:02:20 
 * @Last Modified by:   zwb 
 * @Last Modified time: 2021-08-26 15:02:20 
 */
import { BaseIns } from "../base/BaseIns";

export class ParamMgr extends BaseIns {

    public static get ins(): ParamMgr {
        return super.ins as ParamMgr;
    }

    public init(): void {
        
    }
}