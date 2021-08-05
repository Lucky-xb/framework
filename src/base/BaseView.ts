import { Mgr } from "../mgr/Mgr";

export class BaseView extends Laya.Scene {

    /** 哈希值 */
    public hashCode: number;

    constructor() {
        super();
        // Mgr.evt.on(this, Laya.UIEvent.COMPONENT_ADDED, null, this);
    }
}