import { BaseView } from "../base/BaseView";
import { IPlotCfg } from "../interface/IConfig";
import { Model } from "../model/Model";
import { ui } from "../ui/layaMaxUI";

export class MainUIView extends ui.mainui.MainUIViewUI {

    public className: string = 'MainUIView';

    private _num = 1;

    public constructor() {
        super();
    }

    protected onViewCreated() {
        this.addEvent();
        this.initView();
    }

    protected addEvent() {
    }

    protected initView() {
        this.listContent.renderHandler = Laya.Handler.create(this, this.onRender, null, false);
        this.listContent.vScrollBarSkin = "";
        this._num = 1;
        this.setList();
    }

    private setList() {
        let arr = [];
        for (let i = 1; i <= this._num; i++) {
            let cfg: IPlotCfg = Model.config.plot[i];
            arr.push(cfg.desc);
        }
        this.listContent.array = arr;
    }

    private onRender(cell: Laya.Box, index: number) {
        let lbDesc = cell.getChildByName('lbDesc') as Laya.Label;
        lbDesc.text = cell.dataSource;
    }

    protected onClick(e: Laya.Event) {
        this._num++;
        this.setList();
        // this.listContent.scrollBar.value = 0
    }
}