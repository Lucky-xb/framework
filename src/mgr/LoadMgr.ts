/*
 * 加载管理
 * @Author: zwb 
 * @Date: 2021-08-02 15:47:52 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-03 10:13:05
 */
import { BaseIns } from "../base/BaseIns";
import { MainUIView } from "../MainUIView";
import { Model } from "../model/Model";
import { Mgr } from "./Mgr";

export class LoadMgr extends BaseIns {

    public static get ins(): LoadMgr {
        return super.ins as LoadMgr;
    }

    public init() {
        this.loadCfg();
        this.loadRes();
        this.loadVer();
    }

    /** 加载配置表数据 */
    private loadCfg() {
        Laya.loader.load('config/data.json', Laya.Handler.create(this, this.onCfgLoaded), null, Laya.Loader.JSON);
    }

    private onCfgLoaded() {
        let data = Laya.loader.getRes('config/data.json');
        Model.config.parseCfg(data);
    }

    /** 加载资源 */
    private loadRes() {

    }

    /** 加载版本 */
    private loadVer() {
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }

    onVersionLoaded(): void {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }

    onConfigLoaded(): void {
        //加载IDE指定的场景
        // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        
        // let view = new MainUIView();
        // Mgr.layer.addChild(view, LayerName.bgLayer);
    }
}