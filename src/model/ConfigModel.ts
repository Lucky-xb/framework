/** 工具生成，请勿手动修改 */
import { BaseIns } from "../base/BaseIns";

export class ConfigModel extends BaseIns {
	public static get ins(): ConfigModel {
		return super.ins as ConfigModel;
	}

	private _cfgMap = {};

	/** lang.xlsx */
	public get lang() {
		return this._cfgMap["Lang"];
	}

	/** window.xlsx */
	public get window() {
		return this._cfgMap["Window"];
	}

	public parseCfg(data: any): void {
		for (let k in data) {
			this._cfgMap[k] = data[k];
		}
	}
}