/*
 * @Author: zwb 
 * @Date: 2021-06-28 15:59:31 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-08-26 11:58:33
 */
import { INetMgr } from "../interface/INetMgr";
import { BaseIns } from "../base/BaseIns";

export class NetMgr extends BaseIns implements INetMgr {

    public static get ins(): NetMgr {
        return super.ins as NetMgr;
    }

    private _socket: Laya.Socket;

    private _byte: Laya.Byte;

    public init() {
        // this.createHttp();
        this.createSocket();
    }

    private createHttp() {
        let xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000;
        xhr.on(Laya.Event.PROGRESS, this, this.onHttpProgress);
        xhr.once(Laya.Event.COMPLETE, this, this.onHttpComplete);
        xhr.once(Laya.Event.ERROR, this, this.onHttpError);
        xhr.send('http://45.76.111.94:9000/', '', 'get', 'json');
        // xhr.send('http://127.0.0.1:8001/test.json', '', 'get', 'json');
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

    private createSocket() {
        this._byte = new Laya.Byte();
        this._byte.endian = Laya.Byte.LITTLE_ENDIAN;

        this._socket = new Laya.Socket();
        let so = this._socket;
        so.connectByUrl('ws://45.76.111.94:9000');
        so.endian = Laya.Byte.LITTLE_ENDIAN;
        so.on(Laya.Event.OPEN, this, this.onOpen);
        so.on(Laya.Event.MESSAGE, this, this.onMessage);
        so.on(Laya.Event.CLOSE, this, this.onClose);
        so.on(Laya.Event.ERROR, this, this.onError);
    }

    private onOpen(e: Laya.Event) {
        console.log('连接成功')
        this._socket.send('send data');
    }

    private onMessage(msg: any): void {
        console.log('接收消息')
        console.log(msg)
        // 这里我们假设收到的是二进制ArrayBuffer
        // this._byte.clear();
        // this._byte.writeArrayBuffer(msg); //把接收到的二进制数据读进byte数组便于解析。
        // this._byte.pos = 0; //设置偏移指针；
        // //下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
        // let a: number = this._byte.getByte();
        // let b: number = this._byte.getInt16();
        // let c: number = this._byte.getFloat32();
        // let d: string = this._byte.getString();
        // let e: string = this._byte.getUTFString();


        // let receiveBuff = new egret.ByteArray();
        // M.login.resetHeartTickCount();
        // if (this.isServerConnected) {
        //     this.serverSocket.readBytes(receiveBuff);
        // } else if (this.isGateConnected) {
        //     this.gateSocket.readBytes(receiveBuff);
        // }

        // // 头部占8个字节。前四个字节是 客户端序号  后四个字节是返回ID
        // let msgTopLength: number = 8;

        // // 接到不少于长度值和id值的数据，就有消息需要处理了，=8，是一条空消息，
        // if (receiveBuff.length >= msgTopLength) {
        //     //客户端发过去的ID
        //     let clientId: number = receiveBuff.readInt();
        //     //返回协议号
        //     let resId: number = receiveBuff.readInt();
        //     try {
        //         let cmdDataBA: egret.ByteArray = new egret.ByteArray();
        //         if (receiveBuff.length > msgTopLength) { // 空消息体就不去读
        //             receiveBuff.readBytes(cmdDataBA, 0, receiveBuff.length - msgTopLength);
        //         }
        //         let bytesLength = cmdDataBA.bytes.length;
        //         let decodeData = M.proto.decode(resId, cmdDataBA.bytes);
        //         let packList = decodeData.packList;
        //         let data = decodeData.data;
        //         let sendId: number;
        //         let promiseObj = this.requestRecord.get(clientId);
        //         if (promiseObj != null) {
        //             sendId = promiseObj.sendId;
        //             promiseObj = null;
        //             this.requestRecord.delete(clientId);
        //             //主动协议返回
        //             if (!M.proto.isExcludeId(sendId)) {
        //                 M.guide.checkWait(GUIDE_WAIT_TYPE.PROTO, sendId);
        //             }
        //             if (this.isRecvAllWaitProto()) {
        //                 H.Cm.hideWaitPanel();
        //             }
        //         }
        //         for (let i: number = 0; i < packList.length; i++) {
        //             let item = packList[i];
        //             app.sendNotification(item.protoId + "", { data: item.itemProtData, sendId: sendId, isFilter: true, length: bytesLength });
        //         }
        //         app.sendNotification(resId + "", { data: data, sendId: sendId, length: bytesLength });

        //     } catch (e) {
        //         H.Log.error(`onReceiveMessage: ${resId} error:`, e);
        //     }
        // }
    }

    private onError(e: Laya.Event) {
        console.log('连接错误')
    }

    private onClose(e: Laya.Event) {
        console.log('连接关闭')
    }

    public send(sendId: number, args: any = {}, isWait: boolean = true) {
        // if (!this.isGateConnected && !this.isServerConnected) {
        //     return;
        // }

        // let buffer = M.proto.encode(sendId, args);

        // if (!M.proto.isExcludeId(sendId)) {
        //     H.Log.info("proto send:" + sendId, args ? args : "");
        // }

        // isWait && H.Cm.showWaitPanel();

        // this.clientId += 1;

        // this.requestRecord.set(this.clientId, {
        //     sendId: sendId,
        //     isWait: isWait,
        //     data: buffer
        // })
        // let msgContent = new egret.ByteArray(buffer);
        // let sendMsg = new egret.ByteArray();
        // sendMsg.writeInt(this.clientId);
        // sendMsg.writeInt(sendId);
        // if (this.isServerConnected && sendId != 112011) {
        //     let cryptCode = H.Encrypt.getEncryptCode();
        //     H.Encrypt.encode(msgContent, 0, cryptCode);
        // }
        // sendMsg.writeBytes(msgContent);
        // if (this.isServerConnected) {
        //     this.serverSocket.writeBytes(sendMsg);
        // } else if (this.isGateConnected) {
        //     this.gateSocket.writeBytes(sendMsg);
        // } else {
        //     H.Log.error("can't send msg");
        // }
    }
}