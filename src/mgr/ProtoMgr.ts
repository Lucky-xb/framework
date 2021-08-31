/*
 * proto管理
 * @Author: zwb 
 * @Date: 2021-08-26 15:01:25 
 * @Last Modified by:   zwb 
 * @Last Modified time: 2021-08-26 15:01:25 
 */
import { BaseIns } from "../base/BaseIns";

export class ProtoMgr extends BaseIns {

    public static get ins(): ProtoMgr {
        return super.ins as ProtoMgr;
    }
}