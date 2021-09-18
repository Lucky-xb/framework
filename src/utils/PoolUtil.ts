/*
 * 对象池工具
 * @Author: zwb 
 * @Date: 2021-08-31 11:18:36 
 * @Last Modified by:   zwb 
 * @Last Modified time: 2021-08-31 11:18:36 
 */
export class PoolUtil {
    
    /**存储对象池的Object*/
    private static pool: Object = {};

    /**
     * 获取对象
     * @className 对象类名
     * @args 构造函数传参
     */
    public static pop(className: string, ...args: any[]): any {
        if (this.pool[className] == null) {
            this.pool[className] = [];
        }
        let list: Array<any> = this.pool[className];
        let obj: any;
        if (list.length > 0) {
            return list.pop();
        } else {
            let clz: any = Laya.ClassUtils.getClass(className);
            let argsLen: number = args.length;
            if (argsLen == 0) {
                obj = new clz();
            } else if (argsLen == 1) {
                obj = new clz(args[0]);
            } else if (argsLen == 2) {
                obj = new clz(args[0], args[1]);
            } else if (argsLen == 3) {
                obj = new clz(args[0], args[1], args[2]);
            } else if (argsLen == 4) {
                obj = new clz(args[0], args[1], args[2], args[3]);
            } else if (argsLen == 5) {
                obj = new clz(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.className = className;
        }
        return obj;
    }

    /**
     * 回收对象
     * @obj 需要回收的对象
     */
    public static push(obj: any): void {
        let className = obj.className;
        if (this.pool[className] == null) {
            console.warn("Recycled array of object doesn't exist");
            return;
        }
        this.pool[className].push(obj);
    }

    /**
     * 创建对象(用于将要大量使用前，预先创建，防止使用时大量创建卡顿)
     * @className 对象类定义
     * @num 创建数量
     * @args 构造函数传参
     */
    public static create(className: string, num: number, ...args: any[]) {
        let list = [];
        for (let i = 0; i < num; i++) {
            list.push(this.pop(className, ...args));
        }
        for (let i = 0; i < num; i++) {
            this.push(list.pop());
        }
    }

    /**
     * 获取对象池对象数量
     * @className 对象类定义
     * @return 对象数量
     */
    public static getLen(className: string): number {
        if (this.pool[className]) {
            return this.pool[className].length;
        }
        return 0;
    }

    /**
     * 清理对象
     * @className 对象类定义
    * @funName 清理前执行指定函数
     */
    public static clear(className: string, funName: string = null) {
        if (this.pool[className]) {
            funName && this.dealFun(className, funName);
            this.pool[className] = null;
            delete this.pool[className];
        }
    }

    /**
     * 对象池所有对象执行指定函数
     * @className 对象类定义
     * @funName 函数名
     */
    public static dealFun(className: string, funName: string) {
        if (this.pool[className]) {
            let list: Array<any> = this.pool[className];
            let len = list.length;
            for (let i = 0; i < len; i++) {
                list[i][funName] && list[i][funName]();
            }
        }
    }
}