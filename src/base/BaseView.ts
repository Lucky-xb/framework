import { Mgr } from "../mgr/Mgr";

export class BaseView extends Laya.Scene {

    constructor() {
        super();

        Mgr.evt.on(this, Laya.UIEvent.COMPONENT_ADDED, null, this);
    }
}