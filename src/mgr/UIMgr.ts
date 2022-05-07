/*
 * UI管理
 * @Author: zwb 
 * @Date: 2021-08-30 14:45:38 
 * @Last Modified by: zwb
 * @Last Modified time: 2022-01-20 10:50:39
 */
import { BaseIns } from "../base/BaseIns";
import { ClassName } from "../enum/Enums";
import { GameView } from "../view/GameView";
import { LoginView } from "../view/LoginView";
import { MainUIView } from "../view/MainUIView";

export class UIMgr extends BaseIns {

    public static get ins(): UIMgr {
        return super.ins as UIMgr;
    }

    /** 统一注册类，创建的界面都需要在这里注册才能用open接口打开 */
    public register(): void {
        this.regCpn();
        this.regView();
        this.regPopup();
    }

    /** 注册组件 */
    private regCpn() {
        let reg = Laya.ClassUtils.regClass;
        reg('Image', Laya.Image);
        reg('Box', Laya.Box);
        reg('List', Laya.List);
        reg('Label', Laya.Label);
        reg('Button', Laya.Button);
        reg('CheckBox', Laya.CheckBox);
        reg('Clip', Laya.Clip);
        reg('Dialog', Laya.Dialog);
        reg('FontClip', Laya.FontClip);
        reg('HBox', Laya.HBox);
        reg('HScrollBar', Laya.HScrollBar);
        reg('HSlider', Laya.HSlider);
        reg('Panel', Laya.Panel);
        reg('ProgressBar', Laya.ProgressBar);
        reg('Radio', Laya.Radio);
        reg('RadioGroup', Laya.RadioGroup);
        reg('Tab', Laya.Tab);
        reg('Text', Laya.Text);
        reg('TextArea', Laya.TextArea);
        reg('TextInput', Laya.TextInput);
        reg('Tree', Laya.Tree);
        reg('VBox', Laya.VBox);
        reg('VScrollBar', Laya.VScrollBar);
        reg('VSlider', Laya.VSlider);
        reg('View', Laya.View);
        reg('ViewStack', Laya.ViewStack);
        reg('Sprite', Laya.Sprite);
        // reg('HTMLDivElement', Laya.HTMLDivElement);
        reg('Animation', Laya.Animation);
    }

    /** 注册view界面 */
    private regView() {
        let reg = Laya.ClassUtils.regClass;
        reg(ClassName.MainUIView, MainUIView);
        reg(ClassName.LoginView, LoginView);
        reg(ClassName.GameView, GameView);
    }

    /** 注册popup弹窗 */
    private regPopup() {

    }
}