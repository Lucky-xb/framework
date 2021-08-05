/*
 * 工具集调用
 * @Author: zwb 
 * @Date: 2021-08-05 14:21:22 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-05 14:21:42
 */
import { HashUtil } from "./HashUtil";
import { Md5Util } from "./Md5Util";

export class Utils {
    /** 哈希码工具 */
    static readonly hash = HashUtil;
    /** MD5工具 */
    static readonly md5 = Md5Util;
}