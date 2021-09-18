/*
 * 排序工具
 * @Author: zwb 
 * @Date: 2021-09-13 12:19:49 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-13 12:20:58
 */
export class SortUtil {

    /**
     * list根据字段排序。升序
     * sortKey 排序字段，默认为权重weight
    */
    public static fieldAsc(dataList: Array<any>, key: string = "weight") {
        dataList.sort((a, b) => {
            return a[key] - b[key];
        })
    }

    /**
     * list根据字段排序。降序
     * sortKey 排序字段，默认为权重weight
    */
    public static fieldDesc(dataList: Array<any>, key: string = "weight") {
        dataList.sort((a, b) => {
            return b[key] - a[key];
        })
    }

    /** list数字排序。升序 */
    public static numAsc(list: number[]) {
        list.sort((a, b) => {
            return a - b;
        })
    }

    /** list数字排序。降序 */
    public static numDesc(list: number[]) {
        list.sort((a, b) => {
            return b - a;
        })
    }

    /** 
    * 多维排序
    * @param list 要排序的list
    * @param keys 要比较的表项中的多个key，
    * @param sortTypes 跟key对应的排序方式(升序: 0 还是降序: 1)
    * @传参格式：arg = [key1,key2,...],[0,1,...]
    不填写排序方式默认为升序
    */
    public static mixedSort(list: any[], keys: any[], sortTypes: Array<number>) {
        return list.sort(this.mixedSortFn.bind(list, keys, sortTypes));
    }

    /**
     * 多维排序工具函数
     * @param keys 要比较的表项中的多个key
     * @param sortTypes 跟key对应的排序方式(升序: 0, 还是降序: 1)
     * @param a 数组子项
     * @param b 数组子项
     */
    private static mixedSortFn(keys: any[], sortTypes: Array<number> = [], a: any, b: any) {
        for (let i = 0, length = keys.length; i < length; i++) {
            const argName = keys[i];
            const [pA, pB]: [number, number] = [a[argName], b[argName]];

            if (pA == pB) continue;

            return sortTypes[i] === 1 ? pB - pA : pA - pB;
        }

        return 0;
    }
}