/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:36:13 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 15:52:23
 */
export interface IResMgr {
    /** 读取资源 */
    getRes(name: string);
    /** 读取json */
    getJson(name: string);
}