export interface ICfg {
	/** 唯一id */
	id: number;
}

/** lang.xlsx */
export interface ILangCfg extends ICfg {
	/** 描述 */
	desc: string;
}

/** plot.xlsx */
export interface IPlotCfg extends ICfg {
	/** 描述 */
	desc: string;
}

/** window.xlsx */
export interface IWindowCfg extends ICfg {
	/** 名称 */
	name: string;
	/** 功能名 */
	funName: string;
	/** 开启条件 */
	condition: any;
}

