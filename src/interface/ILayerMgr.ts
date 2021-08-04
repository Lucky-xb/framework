/*
 * @Author: zwb 
 * @Date: 2021-06-28 11:30:34 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-02 15:36:06
 */
export interface ILayerMgr {
    init();
    resize();
    /**
     * 添加视图到层级
     * @param obj 要添加的对象
     * @param layer 要添加到的层级名
     */
    addChild(obj: Laya.Sprite, layer: string);
}