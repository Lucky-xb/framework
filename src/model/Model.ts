/*
 * @Author: zwb 
 * @Date: 2021-08-02 11:24:36 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-02 11:24:59
 */
import { ConfigModel } from "./ConfigModel";

export class Model {
    /** 配置表 */
    static readonly config: ConfigModel = ConfigModel.ins;
}