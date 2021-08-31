/*
 * 视图工具
 * @Author: zwb 
 * @Date: 2021-08-30 11:02:07 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-30 11:03:25
 */
export class ViewUtil {
    
    /** 移除子节点 */
    public static removeChild(child: any) {
        if (child && child.parent) child.parent.removeChild(child);
    }
}