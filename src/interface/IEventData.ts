/*
 * 事件数据接口
 * @Author: zwb 
 * @Date: 2021-08-05 14:57:04 
 * @Last Modified by:   zwb 
 * @Last Modified time: 2021-08-05 14:57:04 
 */
export interface IEventData {
    /** 哈希值 */
    hashCode: number;
    /** 事件数据集 */
    evts: any[];
    /** 执行域 */
    caller: any;
}