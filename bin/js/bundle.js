(function () {
    'use strict';

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "mainui/MainUIView.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = true;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class BaseIns {
        static get ins() {
            let Class = this;
            return Class._ins || (Class._ins = new Class());
        }
    }

    class EventMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this.evtMap = {};
        }
        static get ins() {
            return super.ins;
        }
        on(eventDispatcher, type, listener, caller, args) {
            this.create(eventDispatcher, type, listener, caller, args);
        }
        once() {
        }
        create(eventDispatcher, type, listener, caller, args, useCapture, priority, once) {
            eventDispatcher.on(type, caller, listener, args);
        }
        playClickSound() {
        }
    }

    class LayerMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
            this.container = new Laya.Sprite();
            Laya.stage.addChild(this.container);
            this.bgLayer = new Laya.Sprite();
            this.container.addChild(this.bgLayer);
            this.viewLayer = new Laya.Sprite();
            this.container.addChild(this.viewLayer);
            this.popupLayer = new Laya.Sprite();
            this.container.addChild(this.popupLayer);
            this.tipLayer = new Laya.Sprite();
            this.container.addChild(this.tipLayer);
            this.topLayer = new Laya.Sprite();
            this.container.addChild(this.topLayer);
        }
        addChild(obj, layer) {
            this[`${layer}`].addChild(obj);
        }
        resize() {
        }
    }

    class ConfigModel extends BaseIns {
        constructor() {
            super(...arguments);
            this._cfgDic = {};
        }
        static get ins() {
            return super.ins;
        }
        get lang() {
            return this._cfgDic["Lang"];
        }
        get window() {
            return this._cfgDic["Window"];
        }
        parseCfg(data) {
            for (let k in data) {
                this._cfgDic[k] = data[k];
            }
        }
    }

    class Model {
    }
    Model.config = ConfigModel.ins;

    class LoadMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
            this.loadCfg();
            this.loadRes();
            this.loadVer();
        }
        loadCfg() {
            Laya.loader.load('config/data.json', Laya.Handler.create(this, this.onCfgLoaded), null, Laya.Loader.JSON);
        }
        onCfgLoaded() {
            let data = Laya.loader.getRes('config/data.json');
            Model.config.parseCfg(data);
        }
        loadRes() {
        }
        loadVer() {
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
        }
    }

    class NetMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
            this.byte = new Laya.Byte();
            this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000;
            xhr.once(Laya.Event.COMPLETE, this, this.onOpen);
            xhr.once(Laya.Event.ERROR, this, this.onError);
            xhr.on(Laya.Event.PROGRESS, this, this.onMessage);
            xhr.send('http://127.0.0.1:9999/root/index.html');
        }
        onOpen() {
            console.log('连接成功');
        }
        onMessage(msg = null) {
            console.log('接收消息');
            this.byte.clear();
            this.byte.writeArrayBuffer(msg);
            this.byte.pos = 0;
            let a = this.byte.getByte();
            let b = this.byte.getInt16();
            let c = this.byte.getFloat32();
            let d = this.byte.getString();
            let e = this.byte.getUTFString();
        }
        onError() {
            console.log('连接错误');
        }
        onClose() {
            console.log('连接关闭');
        }
    }

    class ParamMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
        }
    }

    class ResMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        getJson(name) {
        }
    }

    class SoundMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
    }

    class TimerMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
    }

    class ViewMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this.viewMap = {};
            this.viewList = [];
            this.openViewMap = {};
        }
        static get ins() {
            return super.ins;
        }
        register() {
        }
        open(dispatcher, layer, isCloseOther) {
            let name = dispatcher.name;
            this.viewMap[name] = dispatcher;
            this.openViewMap[name] = dispatcher;
            this.viewList.push(dispatcher);
            Mgr.layer.addChild(dispatcher, layer);
        }
        close() {
        }
    }

    class Mgr {
    }
    Mgr.layer = LayerMgr.ins;
    Mgr.view = ViewMgr.ins;
    Mgr.evt = EventMgr.ins;
    Mgr.timer = TimerMgr.ins;
    Mgr.res = ResMgr.ins;
    Mgr.sound = SoundMgr.ins;
    Mgr.net = NetMgr.ins;
    Mgr.param = ParamMgr.ins;
    Mgr.load = LoadMgr.ins;

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Mgr.layer.init();
            Mgr.load.init();
            Mgr.net.init();
        }
    }
    new Main();

}());
