/*
 * 音效管理
 * @Author: zwb 
 * @Date: 2021-06-28 15:57:43 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 15:01:56
 */
import { ISoundMgr } from "../interface/ISoundMgr";
import { BaseIns } from "../base/BaseIns";

export class SoundMgr extends BaseIns implements ISoundMgr {

    public static get ins(): SoundMgr {
        return super.ins as SoundMgr;
    }
}