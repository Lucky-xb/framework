import { ILayerMgr } from "../interface/ILayerMgr";
import { BaseIns } from "../base/BaseIns";
/*
 * 层级管理
 * @Author: zwb 
 * @Date: 2021-06-28 11:26:45 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-02 16:01:34
 */
export class LayerMgr extends BaseIns implements ILayerMgr {

    public static get ins(): LayerMgr {
        return super.ins as LayerMgr;
    }

    private container: Laya.Sprite;
    /** 背景层 */
    private bgLayer: Laya.Sprite;
    /** 视图层 */
    private viewLayer: Laya.Sprite;
    /** 弹窗层 */
    private popupLayer: Laya.Sprite;
    /** 提示层 */
    private tipLayer: Laya.Sprite;
    /** 最顶层 */
    private topLayer: Laya.Sprite;

    public init() {
        this.container = new Laya.Sprite();
        Laya.stage.addChild(this.container);

        this.bgLayer = new Laya.Sprite();
        this.container.addChild(this.bgLayer);

        this.viewLayer = new Laya.Sprite();
        this.container.addChild(this.viewLayer);

        this.popupLayer = new Laya.Sprite();
        this.container.addChild(this.popupLayer);

        this.tipLayer = new Laya.Sprite();
        this.container.addChild(this.tipLayer);

        this.topLayer = new Laya.Sprite();
        this.container.addChild(this.topLayer);
    }

    public addChild(obj: Laya.Sprite, layer: string) {
        this[`${layer}`].addChild(obj);
    }

    public resize() {

    }
}