import { Utils } from "../utils/Utils";

export class BaseView extends Laya.View {

    public btnClose: Laya.Sprite;

    /** 哈希值 */
    private _hashCode: string;
    
    /** 层级 */
    public layer: string;

    constructor() {
        super();
    }

    /** 场景创建完成之前执行 */
    protected createChildren(): void {}

    /** 场景创建完成后的执行函数 */
    protected onViewCreated(): void {
        this.addEvent();
        this.initData();
        this.initView();
        this.initUpdate();
        if (this.btnClose) this.btnClose.on(Laya.Event.CLICK, this, this.closeView);
    }

    /** 统一添加事件侦听 */
    protected addEvent() {}

    /** 初始化数据 */
    protected initData() {}

    /** 初始化界面 */
    protected initView() {}

    /** 初始化刷新，首次打开或者重新打开都会进来这里 */
    protected initUpdate() {}

    /** 统一处理的点击事件 */
    protected onClick(e: Laya.Event) {}

    private closeView(e: Laya.Event) {
        this.onClose();
    }

    /** 关闭界面时的统一处理函数，这里不做其它操作，由子类继承 */
    public onClose() {}

    /** 哈希值 */
    public get hashCode(): string {
        return this._hashCode;
    }

    public set hashCode(className: string) {
        this._hashCode = Utils.hash.hashCode(className) + '';
    }
}