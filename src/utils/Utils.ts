/*
 * 工具集调用
 * @Author: zwb 
 * @Date: 2021-08-05 14:21:22 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-08 10:52:21
 */
import { BezierUtil } from "./BezierUtil";
import { HashUtil } from "./HashUtil";
import { MathUtils } from "./MathUtil";
import { Md5Util } from "./Md5Util";
import { PhysicsUtil } from "./PhysicsUtil";
import { PoolUtil } from "./PoolUtil";
import { ViewUtil } from "./ViewUtil";

export class Utils {
    /** 哈希码工具 */
    static readonly hash = HashUtil;
    /** MD5工具 */
    static readonly md5 = Md5Util;
    /** 视图工具 */
    static readonly view = ViewUtil;
    /** 对象池工具 */
    static readonly pool = PoolUtil;
    /** 物理工具 */
    static readonly physics = PhysicsUtil;
    /** 贝塞尔工具 */
    static readonly bezier = BezierUtil;
    /** 数学工具 */
    static readonly math = MathUtils;
}