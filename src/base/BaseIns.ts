/*
 * @Author: zwb 
 * @Date: 2021-06-28 11:38:28 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-06-29 11:53:49
 */
export class BaseIns {

    public static get ins(): any {
        let Class: any = this;
        return Class._ins || (Class._ins = new Class());
    }
}