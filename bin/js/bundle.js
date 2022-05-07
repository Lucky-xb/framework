(function () {
    'use strict';

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "game/GameView.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = true;
    GameConfig.physicsDebug = true;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class BaseIns {
        static get ins() {
            let Class = this;
            return Class._ins || (Class._ins = new Class());
        }
    }

    class AdapterMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this.maxProportion = 20 / 9;
            this.minProportion = 16 / 9;
        }
        static get ins() {
            return super.ins;
        }
        init() {
            Laya.stage.alignH = "center";
            Laya.stage.alignV = "middle";
            Laya.stage.frameRate = "slow";
            if (Laya.Browser.window.conchConfig && Laya.Browser.window.conchConfig.setSlowFrame) {
                Laya.Browser.window.conchConfig.setSlowFrame(true);
            }
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }
        onResize() {
        }
        realAdaptRatioY() {
            if (Laya.stage.scaleMode == Laya.Stage.SCALE_SHOWALL)
                return 1;
            let rRatio = this.realRatio();
            let dRatio = this.designRatio();
            if (rRatio > dRatio) {
                return rRatio / dRatio;
            }
            else if (rRatio < 1) {
                return rRatio;
            }
            return 1;
        }
        designRatio() {
            return GameConfig.height / GameConfig.width;
        }
        realRatio() {
            return this.realHeight / this.realWidth;
        }
    }

    class EventMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this._evtMap = new Map();
        }
        static get ins() {
            return super.ins;
        }
        onTap(eventDispatcher, listener, caller, args) {
            this.create(eventDispatcher, Laya.Event.MOUSE_DOWN, listener, caller, args);
        }
        once(eventDispatcher, type, listener, caller, args) {
            this.create(eventDispatcher, type, listener, caller, args, true);
        }
        create(eventDispatcher, type, listener, caller, args, once) {
            let self = this;
            let autoRemove = function () {
                caller.off(Laya.Event.REMOVED, autoRemove, caller);
            };
            let callback = function (e) {
                listener && listener.call(caller, e);
                self.sendClickTrack(eventDispatcher, type);
                self.disableSomeTime(eventDispatcher, type);
                self.playClickSound(eventDispatcher, type);
            };
            if (once)
                return eventDispatcher.once(type, caller, callback, args);
            let hashCode = caller.hashCode;
            if (!hashCode) {
                hashCode = -1;
            }
            let evtData = this._evtMap.get(hashCode);
            if (!evtData) {
                evtData = { hashCode: hashCode, evts: [], caller: caller };
                "on" in caller && caller.on(Laya.Event.REMOVED, autoRemove, caller);
            }
            evtData.evts.push({
                eventDispatcher: eventDispatcher,
                type: type,
                listener: callback,
            });
            this._evtMap.set(hashCode, evtData);
            eventDispatcher.on(type, caller, callback, args);
        }
        remove(eventDispatcher, type, caller) {
            let hashCode = caller.hashCode;
            if (!hashCode) {
                hashCode = -1;
            }
            let evtData = this._evtMap.get(hashCode);
            if (evtData) {
                for (let i = evtData.evts.length - 1; i >= 0; i--) {
                    let item = evtData.evts[i];
                }
            }
        }
        sendClickTrack(eventDispatcher, type) {
        }
        disableSomeTime(eventDispatcher, type) {
        }
        playClickSound(eventDispatcher, type) {
        }
    }

    class LayerMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
            this._container = new Laya.Sprite();
            Laya.stage.addChild(this._container);
            this._bgLayer = new Laya.Sprite();
            this._container.addChild(this._bgLayer);
            this._viewLayer = new Laya.Sprite();
            this._container.addChild(this._viewLayer);
            this._popupLayer = new Laya.Sprite();
            this._container.addChild(this._popupLayer);
            this._tipLayer = new Laya.Sprite();
            this._container.addChild(this._tipLayer);
            this._topLayer = new Laya.Sprite();
            this._container.addChild(this._topLayer);
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        }
        addChild(obj, layer) {
            this[`_${layer}`].addChild(obj);
        }
        resize() {
            this._viewLayer.width = this._popupLayer.width = this._tipLayer.width = Laya.stage.designWidth;
            this._viewLayer.height = this._popupLayer.height = this._tipLayer.height = Laya.stage.designHeight;
        }
    }

    var LayerName;
    (function (LayerName) {
        LayerName["bgLayer"] = "bgLayer";
        LayerName["viewLayer"] = "viewLayer";
        LayerName["popupLayer"] = "popupLayer";
        LayerName["tipLayer"] = "tipLayer";
        LayerName["topLayer"] = "topLayer";
    })(LayerName || (LayerName = {}));
    var ClassName;
    (function (ClassName) {
        ClassName["MainUIView"] = "MainUIView";
        ClassName["LoginView"] = "LoginView";
        ClassName["GameView"] = "GameView";
    })(ClassName || (ClassName = {}));

    class ConfigModel extends BaseIns {
        constructor() {
            super(...arguments);
            this._cfgMap = {};
        }
        static get ins() {
            return super.ins;
        }
        get lang() {
            return this._cfgMap["Lang"];
        }
        get plot() {
            return this._cfgMap["Plot"];
        }
        get window() {
            return this._cfgMap["Window"];
        }
        parseCfg(data) {
            for (let k in data) {
                this._cfgMap[k] = data[k];
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
        }
        loadCfg() {
            Laya.loader.load('config/data.json', Laya.Handler.create(this, this.onCfgLoaded), null, Laya.Loader.JSON);
        }
        onCfgLoaded() {
            let data = Mgr.res.getRes('config/data.json');
            Model.config.parseCfg(data);
        }
        loadRes() {
            Laya.loader.load('ui.json', Laya.Handler.create(this, this.loadVer), null, Laya.Loader.JSON);
        }
        loadVer() {
            let uiUrl = `ui.json`;
            let res = Laya.loader.getRes(uiUrl);
            if (res)
                Laya.View.uiMap = res;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Mgr.view.open(ClassName.GameView);
        }
    }

    class NetMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
            this.createSocket();
            this.createByte();
        }
        createHttp() {
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000;
            xhr.on(Laya.Event.PROGRESS, this, this.onHttpProgress);
            xhr.once(Laya.Event.COMPLETE, this, this.onHttpComplete);
            xhr.once(Laya.Event.ERROR, this, this.onHttpError);
            xhr.send('http://45.76.111.94:9000/', '', 'get', 'json');
        }
        onHttpProgress(msg) {
            console.log('连接HTTP进度');
            console.log(msg);
        }
        onHttpComplete(msg) {
            console.log('连接HTTP成功');
            console.log(msg);
        }
        onHttpError(msg) {
            console.log('连接HTTP错误');
            console.log(msg);
        }
        createByte() {
            this._byte = new Laya.Byte();
            this._byte.endian = Laya.Byte.LITTLE_ENDIAN;
        }
        createSocket() {
            this._socket = new Laya.Socket();
            let so = this._socket;
            so.connectByUrl('ws://45.76.111.94:9000');
            so.endian = Laya.Byte.LITTLE_ENDIAN;
            so.on(Laya.Event.OPEN, this, this.onOpen);
            so.on(Laya.Event.MESSAGE, this, this.onMessage);
            so.on(Laya.Event.CLOSE, this, this.onClose);
            so.on(Laya.Event.ERROR, this, this.onError);
        }
        onOpen(e) {
            console.log('连接成功');
            this._socket.send('send data');
        }
        onMessage(msg) {
            console.log('接收消息');
            console.log(msg);
        }
        onError(e) {
            console.log('连接错误');
        }
        onClose(e) {
            console.log('连接关闭');
        }
        send(sendId, args = {}, isWait = true) {
        }
    }

    class ParamMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        init() {
        }
    }

    class RedMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this._redMap = new Map();
        }
        static get ins() {
            return super.ins;
        }
        checkRed(funcId) {
        }
        isHasRed(funcId) {
            if (!this._redMap.has(funcId))
                this.checkRed(funcId);
            return this._redMap.get(funcId);
        }
        sendRedEvent(funcId, isRed) {
        }
    }

    class ResMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        loadRes(url, complete) {
        }
        getRes(name) {
            return Laya.loader.getRes(name);
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
        startTimer() {
            Laya.timer.loop(1000, this, this.onTimer);
        }
        onTimer() {
        }
    }

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var game;
        (function (game) {
            class GameViewUI extends Laya.BaseView {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("game/GameView");
                }
            }
            game.GameViewUI = GameViewUI;
            REG("ui.game.GameViewUI", GameViewUI);
        })(game = ui.game || (ui.game = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var login;
        (function (login) {
            class LoginViewUI extends Laya.BaseView {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("login/LoginView");
                }
            }
            login.LoginViewUI = LoginViewUI;
            REG("ui.login.LoginViewUI", LoginViewUI);
        })(login = ui.login || (ui.login = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var mainui;
        (function (mainui) {
            class MainUIViewUI extends Laya.BaseView {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("mainui/MainUIView");
                }
            }
            mainui.MainUIViewUI = MainUIViewUI;
            REG("ui.mainui.MainUIViewUI", MainUIViewUI);
        })(mainui = ui.mainui || (ui.mainui = {}));
    })(ui || (ui = {}));

    class GameView extends ui.game.GameViewUI {
        constructor() {
            super();
            this.className = 'GameView';
        }
    }

    class BezierUtil {
        static getBezier(t, p0, p1, p2) {
            return (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2;
        }
        static CreateBezierPoints(anchorpoints, pointsAmount) {
            var points = [];
            for (var i = 0; i < pointsAmount; i++) {
                var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
                points.push(point);
            }
            return points;
        }
        static MultiPointBezier(points, t) {
            let len = points.length;
            let x = 0, y = 0;
            for (let i = 0; i < len; i++) {
                let point = points[i];
                x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
                y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            }
            return { x: x, y: y };
        }
        static erxiangshi(start, end) {
            let cs = 1, bcs = 1;
            while (end > 0) {
                cs *= start;
                bcs *= end;
                start--;
                end--;
            }
            return (cs / bcs);
        }
    }

    class HashUtil {
        static hashCode(str) {
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
        static getNameByHash(hashCode) {
            return this._hashMap[hashCode] || "";
        }
    }
    HashUtil._hashMap = {};

    class XY {
        constructor() {
            this.x = 0;
            this.y = 0;
        }
    }
    class MathUtils {
        static getAngle(radian) {
            return 180 * radian / Math.PI;
        }
        static getRadian(angle) {
            return angle / 180 * Math.PI;
        }
        static sin(angle) {
            return Math.sin(MathUtils.getRadian(angle));
        }
        static cos(angle) {
            return Math.cos(MathUtils.getRadian(angle));
        }
        static getRadian2(p1X, p1Y, p2X, p2Y) {
            let xdis = p2X - p1X;
            let ydis = p2Y - p1Y;
            return Math.atan2(ydis, xdis);
        }
        static getDistance(p1X, p1Y, p2X, p2Y) {
            let disX = p2X - p1X;
            let disY = p2Y - p1Y;
            let disQ = disX * disX + disY * disY;
            return Math.sqrt(disQ);
        }
        static getDistanceByObject(s, t) {
            return this.getDistance(s.x, s.y, t.x, t.y);
        }
        static getDistanceX2ByObject(s, t) {
            let disX = s.x - t.x;
            let disY = s.y - t.y;
            return disX * disX + disY * disY;
        }
        static getDirMove(angle, distance, offsetX = 0, offsetY = 0) {
            let radian = this.getRadian(angle);
            let p = { x: 0, y: 0 };
            p.x = Math.cos(radian) * distance + offsetX;
            p.y = Math.sin(radian) * distance + offsetY;
            return p;
        }
        static getPByDistance(p1, p2, disance) {
            let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            let p = new Laya.Point;
            p.x = p2.x + disance * Math.cos(angle);
            p.y = p2.y + disance * Math.sin(angle);
            return p;
        }
        static limit($from, $end) {
            $from = Math.min($from, $end);
            $end = Math.max($from, $end);
            let range = $end - $from;
            return $from + Math.random() * range;
        }
        static limitInteger($from, $end) {
            return Math.round(this.limit($from, $end));
        }
        static randomArray(arr) {
            let index = Math.floor(Math.random() * arr.length);
            return arr[index];
        }
        static toInteger(value) {
            return value >> 0;
        }
        static testInRect(vertx, verty, testx, testy) {
            let i, j = 0;
            let result = false;
            let count = vertx.length;
            for (i = 0, j = count - 1; i < count; j = i++) {
                if (((verty[i] > testy) != (verty[j] > testy)) &&
                    (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
                    result = !result;
            }
            return result;
        }
        static getInRectList(sender, target, range, width, enemys, affectCount = Number.MAX_VALUE) {
            let dx = target.x - sender.x;
            let dy = target.y - sender.y;
            let radian = Math.atan2(dy, dx);
            let lx = width * Math.cos(radian);
            let ly = range * Math.sin(radian);
            let cv = Math.cos(radian);
            let sv = Math.sin(radian);
            let sl = range * Math.sin(radian);
            let cl = range * Math.cos(radian);
            let sw = width * Math.sin(radian);
            let cw = width * Math.cos(radian);
            let x3 = target.x + cl;
            let y3 = target.y + sl;
            let xVec = new Array();
            let yVec = new Array();
            xVec[0] = target.x + sw;
            yVec[0] = target.y - cw;
            xVec[1] = target.x - sw;
            yVec[1] = target.y + cw;
            xVec[3] = x3 + sw;
            yVec[3] = y3 - cw;
            xVec[2] = x3 - sw;
            yVec[2] = y3 + cw;
            let list = [];
            list.push(target);
            for (let enemy of enemys) {
                if (enemy == target) {
                    continue;
                }
                if (list.length >= affectCount) {
                    break;
                }
                if (this.testInRect(xVec, yVec, enemy.x, enemy.y)) {
                    list.push(enemy);
                }
            }
            return list;
        }
        static getInCircleList(target, range, enemys, affectCount = Number.MAX_VALUE) {
            let list = [];
            for (let enemy of enemys) {
                if (list.length >= affectCount) {
                    break;
                }
                if (this.getDistance(target.x, target.y, enemy.x, enemy.y) <= range) {
                    list.push(enemy);
                }
            }
            return list;
        }
    }

    class Md5Util {
        constructor() {
        }
        static hex_md5(s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); }
        static b64_md5(s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); }
        static any_md5(s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); }
        static hex_hmac_md5(k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        static b64_hmac_md5(k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        static any_hmac_md5(k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); }
        static md5_vm_test() {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }
        static rstr_md5(s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        }
        static rstr_hmac_md5(key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        }
        static rstr2hex(input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        }
        static rstr2b64(input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        }
        static rstr2any(input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        }
        static str2rstr_utf8(input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        }
        static str2rstr_utf16le(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        }
        static str2rstr_utf16be(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        }
        static rstr2binl(input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        }
        static binl2rstr(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        }
        static binl_md5(x, len) {
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        }
        static md5_cmn(q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        }
        static md5_ff(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        static md5_gg(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        static md5_hh(a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        static md5_ii(a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        static safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        static bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
        static getCdnKey() {
            return Md5Util.cdnKey;
        }
    }
    Md5Util.hexcase = 0;
    Md5Util.b64pad = "";
    Md5Util.cdnKey = "iqwl1xkmkdo";

    class PhysicsUtil {
        static gravitySpeed(gravity, deltaTime) {
            return gravity * deltaTime;
        }
        static adjustSpeed(curP, targetP, gravity, speedY) {
            let s = targetP.x - curP.x;
            let h = targetP.y - curP.y;
            let g = gravity;
            let vy = speedY;
            if (h < 0)
                return;
            let t = (-vy + Math.sqrt(vy * vy + 2 * g * h)) / g;
            let vx = s / t;
            return new Laya.Point(vx, vy);
        }
    }

    class PoolUtil {
        static pop(className, ...args) {
            if (this.pool[className] == null) {
                this.pool[className] = [];
            }
            let list = this.pool[className];
            let obj;
            if (list.length > 0) {
                return list.pop();
            }
            else {
                let clz = Laya.ClassUtils.getClass(className);
                let argsLen = args.length;
                if (argsLen == 0) {
                    obj = new clz();
                }
                else if (argsLen == 1) {
                    obj = new clz(args[0]);
                }
                else if (argsLen == 2) {
                    obj = new clz(args[0], args[1]);
                }
                else if (argsLen == 3) {
                    obj = new clz(args[0], args[1], args[2]);
                }
                else if (argsLen == 4) {
                    obj = new clz(args[0], args[1], args[2], args[3]);
                }
                else if (argsLen == 5) {
                    obj = new clz(args[0], args[1], args[2], args[3], args[4]);
                }
                obj.className = className;
            }
            return obj;
        }
        static push(obj) {
            let className = obj.className;
            if (this.pool[className] == null) {
                console.warn("Recycled array of object doesn't exist");
                return;
            }
            this.pool[className].push(obj);
        }
        static create(className, num, ...args) {
            let list = [];
            for (let i = 0; i < num; i++) {
                list.push(this.pop(className, ...args));
            }
            for (let i = 0; i < num; i++) {
                this.push(list.pop());
            }
        }
        static getLen(className) {
            if (this.pool[className]) {
                return this.pool[className].length;
            }
            return 0;
        }
        static clear(className, funName = null) {
            if (this.pool[className]) {
                funName && this.dealFun(className, funName);
                this.pool[className] = null;
                delete this.pool[className];
            }
        }
        static dealFun(className, funName) {
            if (this.pool[className]) {
                let list = this.pool[className];
                let len = list.length;
                for (let i = 0; i < len; i++) {
                    list[i][funName] && list[i][funName]();
                }
            }
        }
    }
    PoolUtil.pool = {};

    class ViewUtil {
        static removeChild(child) {
            if (child && child.parent)
                child.parent.removeChild(child);
        }
    }

    class Utils {
    }
    Utils.hash = HashUtil;
    Utils.md5 = Md5Util;
    Utils.view = ViewUtil;
    Utils.pool = PoolUtil;
    Utils.physics = PhysicsUtil;
    Utils.bezier = BezierUtil;
    Utils.math = MathUtils;

    class BaseView extends Laya.View {
        constructor() {
            super();
        }
        createChildren() { }
        onViewCreated() {
            this.addEvent();
            this.initData();
            this.initView();
            this.initUpdate();
            if (this.btnClose)
                this.btnClose.on(Laya.Event.CLICK, this, this.closeView);
        }
        addEvent() { }
        initData() { }
        initView() { }
        initUpdate() { }
        onClick(e) { }
        closeView(e) {
            this.onClose();
        }
        onClose() { }
        get hashCode() {
            return this._hashCode;
        }
        set hashCode(className) {
            this._hashCode = Utils.hash.hashCode(className) + '';
        }
    }

    class LoginView extends BaseView {
        constructor() {
            super();
            this.className = 'LoginView';
            this.loadScene('login/LoginView.scene');
        }
    }

    class MainUIView extends ui.mainui.MainUIViewUI {
        constructor() {
            super();
            this.className = 'MainUIView';
            this._num = 1;
        }
        onViewCreated() {
            this.addEvent();
            this.initView();
        }
        addEvent() {
        }
        initView() {
            this.listContent.renderHandler = Laya.Handler.create(this, this.onRender, null, false);
            this.listContent.vScrollBarSkin = "";
            this._num = 1;
            this.setList();
        }
        setList() {
            let arr = [];
            for (let i = 1; i <= this._num; i++) {
                let cfg = Model.config.plot[i];
                arr.push(cfg.desc);
            }
            this.listContent.array = arr;
        }
        onRender(cell, index) {
            let lbDesc = cell.getChildByName('lbDesc');
            lbDesc.text = cell.dataSource;
        }
        onClick(e) {
            this._num++;
            this.setList();
        }
    }

    class UIMgr extends BaseIns {
        static get ins() {
            return super.ins;
        }
        register() {
            this.regCpn();
            this.regView();
            this.regPopup();
        }
        regCpn() {
            let reg = Laya.ClassUtils.regClass;
            reg('Image', Laya.Image);
            reg('Box', Laya.Box);
            reg('List', Laya.List);
            reg('Label', Laya.Label);
            reg('Button', Laya.Button);
            reg('CheckBox', Laya.CheckBox);
            reg('Clip', Laya.Clip);
            reg('Dialog', Laya.Dialog);
            reg('FontClip', Laya.FontClip);
            reg('HBox', Laya.HBox);
            reg('HScrollBar', Laya.HScrollBar);
            reg('HSlider', Laya.HSlider);
            reg('Panel', Laya.Panel);
            reg('ProgressBar', Laya.ProgressBar);
            reg('Radio', Laya.Radio);
            reg('RadioGroup', Laya.RadioGroup);
            reg('Tab', Laya.Tab);
            reg('Text', Laya.Text);
            reg('TextArea', Laya.TextArea);
            reg('TextInput', Laya.TextInput);
            reg('Tree', Laya.Tree);
            reg('VBox', Laya.VBox);
            reg('VScrollBar', Laya.VScrollBar);
            reg('VSlider', Laya.VSlider);
            reg('View', Laya.View);
            reg('ViewStack', Laya.ViewStack);
            reg('Sprite', Laya.Sprite);
            reg('Animation', Laya.Animation);
        }
        regView() {
            let reg = Laya.ClassUtils.regClass;
            reg(ClassName.MainUIView, MainUIView);
            reg(ClassName.LoginView, LoginView);
            reg(ClassName.GameView, GameView);
        }
        regPopup() {
        }
    }

    class ViewMgr extends BaseIns {
        constructor() {
            super(...arguments);
            this._openViewMap = new Map();
            this._layerMap = new Map();
        }
        static get ins() {
            return super.ins;
        }
        open(idOrName, layer = LayerName.viewLayer, isCloseOther = false, isMutex = true) {
            if (this.isOpened(idOrName))
                return;
            if (typeof idOrName === 'number') {
                if (!this.isOpenFunc(idOrName))
                    return;
            }
            if (isCloseOther)
                this.closeAll();
            if (isMutex) {
                let prevName = this._layerMap.get(layer);
                if (prevName)
                    this.close(prevName);
            }
            let className = this.getClassName(idOrName);
            let self = this;
            let view = Utils.pool.pop(className);
            view.layer = layer;
            !view.hashCode && (view.hashCode = className);
            self._openViewMap.set(view.hashCode, view);
            self._layerMap.set(layer, className);
            Mgr.layer.addChild(view, layer);
            console.log(`open: ${className}`);
        }
        close(idOrName) {
            let className = this.getClassName(idOrName);
            let view = this.getClassByName(className);
            if (!view)
                return;
            view.onClose();
            Utils.view.removeChild(view);
            Utils.pool.push(view);
            this._openViewMap.delete(view.hashCode);
            this._layerMap.delete(view.layer);
            console.log(`close: ${className}`);
        }
        closeAll() {
            this._openViewMap.forEach((val, key, map) => {
                val.onClose();
                Utils.view.removeChild(val);
                Utils.pool.push(val);
            });
            this._openViewMap.clear();
            this._layerMap.clear();
        }
        isOpenFunc(funcId, isTips = true) {
            let isOpen = false;
            this.checkFuncOpen(funcId);
            this.checkActOpen(funcId);
            return isOpen;
        }
        isOpened(idOrName) {
            let isOpen = false;
            let className = this.getClassName(idOrName);
            let view = this.getClassByName(className);
            if (view)
                isOpen = true;
            return isOpen;
        }
        curLayerView(layer) {
            let className = this._layerMap.get(layer);
            if (!className)
                return null;
            let view = this.getClassByName(className);
            return view;
        }
        getClassByName(className) {
            let hashCode = Utils.hash.hashCode(className) + '';
            let view = this._openViewMap.get(hashCode);
            return view;
        }
        checkFuncOpen(funcId) {
        }
        checkActOpen(funcId) {
        }
        getClassName(idOrName) {
            let className = '';
            if (typeof idOrName === 'number') {
                let cfg = Model.config.window[idOrName];
                className = cfg.funName;
            }
            else {
                className = idOrName;
            }
            return className;
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
    Mgr.red = RedMgr.ins;
    Mgr.ui = UIMgr.ins;
    Mgr.adapter = AdapterMgr.ins;

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Mgr.adapter.init();
            Mgr.ui.register();
            Mgr.layer.init();
            Mgr.load.init();
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
