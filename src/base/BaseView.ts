import { Mgr } from "../mgr/Mgr";
import { Utils } from "../utils/Utils";

export class BaseView extends Laya.View {

    /** 哈希值 */
    private _hashCode: string;
    
    /** 层级 */
    public layer: string;

    constructor() {
        super();
        // Mgr.evt.on(this, Laya.UIEvent.COMPONENT_ADDED, null, this);
    }

    /** 哈希值 */
    public get hashCode(): string {
        return this._hashCode;
    }

    public set hashCode(className: string) {
        this._hashCode = Utils.hash.hashCode(className) + '';
    }
}