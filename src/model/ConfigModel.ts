/** 工具生成，请勿手动修改 */
import { BaseIns } from "../base/BaseIns";

export class ConfigModel extends BaseIns {
	public static get ins(): ConfigModel {
		return super.ins as ConfigModel;
	}

	private _cfgDic = {};

	public get lang() {
		return this._cfgDic["Lang"];
	}

	public get window() {
		return this._cfgDic["Window"];
	}

	public parseCfg(data: any): void {
		for (let k in data) {
			this._cfgDic[k] = data[k];
		}
	}
}