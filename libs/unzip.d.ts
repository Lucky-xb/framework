/**
 * 封装了调用了jsZip类库的方法
 * @author: deng
 * @since: 2019-01-26 12:24:42
 * @copyright: youai
 */
declare class unZip {
    private zipFiles;
    private files;
    private onTime;
    private callBack;
    private thisObject;
    private type;
    private zip;
    private _total;
    private _index;
    private static fileMap;
    constructor();
    /** html调用 */
    onStart(zipUrl: string, files: Array<string>, onTime?: Function, callBack?: Function, thisObject?: any): void;
    destroy():void;
    /** 加载zip */
    private loadZip(url, callBack);
    private createList();
    private upfiles(file);
    private unCallBack();
    /** 解压zip中的zip，暂未实现 */
    private createZip();
    /**
     * 解压zip中单个文件JS文件
     * @param file zip压缩的文件
     * @param callBack Function 回调
     */
    private createScript(file, callBack);
    /** 解压json
     * @param file zip压缩的文件
     * @param callBack Function 回调
     */
    private createJson(file, callBack);
    /** 解压图片
     * @param file zip压缩的文件
     * @param callBack Function 回调
     */
    private createImg(file, callBack);
    /** 读取文件
     * @param fileName string 文件名
     */
    static getFile(fileName: string): any;
}
