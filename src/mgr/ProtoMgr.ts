import { BaseIns } from "../base/BaseIns";

export class ProtoMgr extends BaseIns {

    public static get ins(): ProtoMgr {
        return super.ins as ProtoMgr;
    }
}