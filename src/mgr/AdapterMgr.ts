/*
 * 适配管理
 * @Author: zwb 
 * @Date: 2021-11-17 12:05:09 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-11-17 14:30:26
 */
import { BaseIns } from "../base/BaseIns";
import GameConfig from "../GameConfig";

export class AdapterMgr extends BaseIns {

    public static get ins(): AdapterMgr {
        return super.ins as AdapterMgr;
    }

    /** 适配后的实际宽度 */
    public realWidth: number;
    /** 适配后的实际高度 */
    public realHeight: number;

    public maxProportion: number = 20 / 9;
    public minProportion: number = 16 / 9;

    public init(): void {
        // 整个舞台在浏览器的布局
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";

        Laya.stage.frameRate = "slow";

        // 设置apk 帧率
        if (Laya.Browser.window.conchConfig && Laya.Browser.window.conchConfig.setSlowFrame) {
            Laya.Browser.window.conchConfig.setSlowFrame(true);//设置30帧
        }

        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL; //fixedheight noscale
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE; //vertical

        // 检测场景改变
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }

    private onResize(): void {

    }

    /**
     * 按width 宽度适配
     * 根据实际屏幕宽高获取与设计宽高的比例差值 
     * designHeight * ratioY = cur;
     */
    public realAdaptRatioY(): number {
        if (Laya.stage.scaleMode == Laya.Stage.SCALE_SHOWALL) return 1;
        let rRatio = this.realRatio();
        let dRatio = this.designRatio();
        if (rRatio > dRatio) {
            return rRatio / dRatio;
        } else if (rRatio < 1) {
            return rRatio;
        }
        return 1;
    }

    /* 设计比例 16：9  */
    public designRatio(): number {
        return GameConfig.height / GameConfig.width;
    }

    /* window.screen比例  */
    public realRatio(): number {
        return this.realHeight / this.realWidth;
    }
}