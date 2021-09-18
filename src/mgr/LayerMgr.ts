import { ILayerMgr } from "../interface/ILayerMgr";
import { BaseIns } from "../base/BaseIns";
/*
 * 层级管理
 * @Author: zwb 
 * @Date: 2021-06-28 11:26:45 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-03 17:42:46
 */
export class LayerMgr extends BaseIns implements ILayerMgr {

    public static get ins(): LayerMgr {
        return super.ins as LayerMgr;
    }

    private _container: Laya.Sprite;
    /** 背景层 */
    private _bgLayer: Laya.Sprite;
    /** 视图层 */
    private _viewLayer: Laya.Sprite;
    /** 弹窗层 */
    private _popupLayer: Laya.Sprite;
    /** 提示层 */
    private _tipLayer: Laya.Sprite;
    /** 最顶层 */
    private _topLayer: Laya.Sprite;

    public init() {
        this._container = new Laya.Sprite();
        Laya.stage.addChild(this._container);

        this._bgLayer = new Laya.Sprite();
        this._container.addChild(this._bgLayer);

        this._viewLayer = new Laya.Sprite();
        this._container.addChild(this._viewLayer);

        this._popupLayer = new Laya.Sprite();
        this._container.addChild(this._popupLayer);

        this._tipLayer = new Laya.Sprite();
        this._container.addChild(this._tipLayer);

        this._topLayer = new Laya.Sprite();
        this._container.addChild(this._topLayer);

        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
    }

    public addChild(obj: Laya.Sprite, layer: string) {
        this[`_${layer}`].addChild(obj);
    }

    public resize() {
        this._viewLayer.width = this._popupLayer.width = this._tipLayer.width = Laya.stage.designWidth;
        this._viewLayer.height = this._popupLayer.height = this._tipLayer.height = Laya.stage.designHeight;
    }
}