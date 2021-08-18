/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:59:31 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-03 18:13:12
 */
import { INetMgr } from "../interface/INetMgr";
import { BaseIns } from "../base/BaseIns";

export class NetMgr extends BaseIns implements INetMgr {

    public static get ins(): NetMgr {
        return super.ins as NetMgr;
    }

    private _byte: Laya.Byte;

    public init() {
        this.createHttp();
    }

    private createHttp() {
        let xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000;
        xhr.on(Laya.Event.PROGRESS, this, this.onHttpProgress);
        xhr.once(Laya.Event.COMPLETE, this, this.onHttpComplete);
        xhr.once(Laya.Event.ERROR, this, this.onHttpError);
        xhr.send('http://localhost:8001/test.json', '', 'get', 'json');
    }

    private onHttpProgress(msg: any) {
        console.log('连接HTTP进度');
        console.log(msg);
    }

    private onHttpComplete(msg: any) {
        console.log('连接HTTP成功');
        console.log(msg);
    }

    private onHttpError(msg: any) {
        console.log('连接HTTP错误');
        console.log(msg);
    }

    private createWebsocket() {
        this._byte = new Laya.Byte();
        this._byte.endian = Laya.Byte.LITTLE_ENDIAN;

        let so = new WebSocket('ws://127.0.0.1:9999');
        so.binaryType = 'arraybuffer';
        so.onopen = this.onOpen;
        so.onmessage = this.onMessage;
        so.onerror = this.onError;
        so.onclose = this.onClose;
        so.send('发送数据');

        // let so = new Laya.Socket('127.0.0.1', 9999);
        // so.endian = Laya.Byte.LITTLE_ENDIAN;
        // so.on(Laya.Event.OPEN, this, this.onOpen);
        // so.on(Laya.Event.MESSAGE, this, this.onMessage);
        // so.on(Laya.Event.CLOSE, this, this.onClose);
        // so.on(Laya.Event.ERROR, this, this.onError);
        // so.send('发送数据');
    }

    private onOpen() {
        console.log('连接成功')
    }

    private onMessage(msg: any = null) {
        console.log('接收消息')
        console.log(msg)
        // 这里我们假设收到的是二进制ArrayBuffer
        this._byte.clear();
        this._byte.writeArrayBuffer(msg); //把接收到的二进制数据读进byte数组便于解析。
        this._byte.pos = 0; //设置偏移指针；
        //下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
        let a: number = this._byte.getByte();
        let b: number = this._byte.getInt16();
        let c: number = this._byte.getFloat32();
        let d: string = this._byte.getString();
        let e: string = this._byte.getUTFString();
    }

    private onError() {
        console.log('连接错误')
    }

    private onClose() {
        console.log('连接关闭')
    }
}