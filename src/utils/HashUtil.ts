/*
 * 哈希码工具
 * @Author: zwb 
 * @Date: 2021-08-05 12:27:03 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-30 15:45:27
 */
export class HashUtil {

    private static _hashMap = {};
    
    /** 获取一个字符串的哈希码（通用的方法） */
    public static hashCode(str: string): number {
        let hash = 0;
        if (hash == 0 && str.length > 0) {
            for (let i = 0, len = str.length; i < len; i++) {
                hash = 31 * hash + str.charCodeAt(i);
            }
        }
        if (this._hashMap[hash]) { 
            console.error(`已存在的哈希值：${str}`); 
            return hash; 
        }
        this._hashMap[hash] = str;
        return hash;
    }

    /**
     * 获取类名
     * @param hashCode 哈希值
     * @returns 类名
     */
    public static getNameByHash(hashCode: number): string {
        return this._hashMap[hashCode] || "";
    }
}