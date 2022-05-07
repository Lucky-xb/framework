

(function (exports, Laya) {
    'use strict';
    class BaseView extends Laya.View {
        constructor() {
            super();
            this._popEffect = false;
            this._needBg = true;
            this._adapt = false;
            if (this.height >= Laya.stage.designHeight) {
                this.height = Laya.stage.designHeight * Laya.Stage.adaptRatioY;
                this._adapt = true;

                if (BaseView.adaptOffsetY != null) {
                    var backBtn = this.getChildByName("backBtn") || this.getChildByName("clothBtn");
                    if (backBtn) {
                        backBtn.y = backBtn.y + BaseView.adaptOffsetY;
                    }
                }
            }
            this._mediator = null;
            this._bgView = null;
            this.init();


        }
        init() {
            this.on(Laya.Event.ADDED, this, this.onAdded);
        }
        onAwake() {
            this._mediator ? this._mediator.onAwake() : null;
        }
        render(ctx, x, y) {
            super.render(ctx, x, y);
            this._mediator ? this._mediator.render() : null;
        }
        move(x, y) {
            this.x = x;
            this.y = y;
        }
        get adapt() {
            return this._adapt;
        }
        set adapt(value) {
            this._adapt = value;
        }
        get mediator() {
            return this._mediator;
        }
        set mediator(value) {
            this._mediator = value;
        }
        get popEffect() {
            return this._popEffect;
        }
        set popEffect(value) {
            this._popEffect = value;
        }
        get popAction() {
            return this._popAction;
        }
        set popAction(value) {
            this._popAction = value;
        }
        get bgView() {
            return this._bgView;
        }
        set bgView(value) {
            this._bgView = value;
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
            this.removeBg();
            this.userData = null;
            this.off(Laya.Event.ADDED, this, this.onAdded);
            this.mediator ? this.mediator.onDispose() : null;
        }
        loadScene(path) {
            super.loadUI(path);
        }
        bgClass(value) {
            if (this._bgClass != value) {
                this._bgClass = value;
                this.createBg();
            }
        }
        createBg() {
            if (this._needBg && this._bgClass) {
                this.removeBg();
                var bg = new this._bgClass();
                bg.mouseEnabled = false;
                this.addChildAt(bg, 0);
                this._bgView = bg;
            }
        }
        removeBg() {
            if (this._bgView) {
                this._bgView.removeSelf();
                this._bgView.destroy();
                this._bgView = null;
            }
        }
        playPopEffect(value) {
            if (this._popEffect) {
                var self = this;
                Laya.timer.callLater(this, function () {
                    var ease = value ? Laya.Ease.backOut : Laya.Ease.strongOut;
                    self._popAction ? self._popAction.call(null, self, value, 300, ease) :
                        BaseView.GAction && BaseView.GAction.popViewCenter(self, value, false, 300, ease, Laya.Handler.create(self, self.onPopEffectComplete));
                });
            }
        }
        onPopEffectComplete() {
            this.event("poped");
        }
        onClick(event) {
            var target = event.target;
            if (target) {
                var name = target.name;
                switch (name) {
                    case "btnClose":
                        this.onClose();
                        break;
                    case "btnBack":
                        this.onBack();
                        break;
                    case "btnHelp":
                        this.onHelp();
                        break;
                }
            }
            this.mediator ? this.mediator.onClick(event) : null;
            this.onClickHandler(target);
        }
        onClose() {
            if (BaseView.closeHandle) {
                BaseView.closeHandle.runWith(this);
            }
        }
        onBack() {
            if (BaseView.closeHandle) {
                BaseView.closeHandle.runWith(this);
            }
            if (BaseView.backHandle) {
                BaseView.backHandle.runWith(this);
            }
        }
        onHelp() {
            if (BaseView.helpHandle) {
                BaseView.helpHandle.runWith(this);
            }
        }
        onClickHandler(target) {
            if (BaseView.clickHandle) {
                BaseView.clickHandle.runWith(this, target);
            }
        }
        onResize() {
            this.mediator ? this.mediator.onResize() : null;
        }
        onShow() {

        }
        onHide() {

        }
        clearRecover(target) {
            for (var i = 0; i < target.length; i++) {
                var temp = target[i];
                if (temp instanceof Laya.List) {
                    if (temp.renderHandler) {
                        temp.renderHandler.recover();
                        temp.renderHandler = null;
                    }
                }
                if (temp.selectHandler) {
                    temp.selectHandler.recover();
                    temp.selectHandler = null;
                }
            }
        }

        /**
         * 此函数是清除界面上那几个WorthView(其他亦适用)
         * @param target
         */
        destroyComponent(target) {
            for (var i = 0; i < target.length; i++) {
                var temp = target[i];
                if (temp) {
                    temp.destroy(true);
                    temp = null;
                }
            }
        }

        refleshView(userData) {

        }
        resizeView() {
            if (this._adapt) {
                this.height = Laya.stage.designHeight * Laya.Stage.adaptRatioY;
            }
            this.mediator ? this.mediator.onResize() : null;
        }
        addEvent(type, listener, args) {
            if (BaseView.dispatcher)
                BaseView.dispatcher.on(type, this, listener, args);
        }
        offEvent(type, listener) {
            if (BaseView.dispatcher)
                BaseView.dispatcher.off(type, this, listener);
        }
        onAdded() {
            this.on(Laya.Event.CLICK, this, this.onClick);
            this.on(Laya.Event.REMOVED, this, this.onRemove);
            // this.stage.on(Laya.Event.RESIZE, this, this.onResize);
            this.mediator ? this.mediator.onShow() : null;
            this.playPopEffect(true);
            this.onShow();
        }
        onRemove() {
            this.off(Laya.Event.CLICK, this, this.onClick);
            this.off(Laya.Event.REMOVED, this, this.onRemove);
            // this.stage.off(Laya.Event.RESIZE, this, this.onResize);
            this.mediator ? this.mediator.onHide() : null;
            this.onHide();
        };
    }
    BaseView.closeHandle = null;
    BaseView.backHandle = null;
    BaseView.helpHandle = null;
    BaseView.GAction = null;
    BaseView.dispatcher = null;
    BaseView.clickHandle = null;
    BaseView.clickHandle = null;
    BaseView.adaptOffsetY = null;
    Laya.ClassUtils.regClass("laya.ui.BaseView", BaseView);
    Laya.ClassUtils.regClass("Laya.BaseView", BaseView);

    class BaseSceneView extends BaseView {
        constructor() {
            super();
            this._rootLayer = new Laya.Sprite();
            this.addChildAt(this._rootLayer, 0);
            this._bgLayer = new Laya.Sprite();
            this._rootLayer.addChildAt(this._bgLayer, 0);
            this._elementLayer = new Laya.Sprite();
            this._rootLayer.addChildAt(this._elementLayer, 1);
            this._bg = new Laya.Sprite();
            this._bgLayer.addChild(this._bg);
            // if (this.height >= Laya.stage.designHeight) {
            //     this.height = Laya.stage.designHeight * Laya.Stage.adaptRatioY;
            // }
        }
        get bg() {
            return this._bg;
        }
        set bg(value) {
            this._bg = value;
        }
        get bgLayer() {
            return this._bgLayer;
        }
        set bgLayer(value) {
            this._bgLayer = value;
        }
        get elementLayer() {
            return this._elementLayer;
        }
        set elementLayer(value) {
            this._elementLayer = value;
        }
        get rootLayer() {
            return this._rootLayer;
        }
        set rootLayer(value) {
            this._rootLayer = value;
        }
        addElementAt(value, index) {
            this._elementLayer.addChildAt(value, index);
        }
        addElement(value) {
            this._elementLayer.addChild(value);
        }
        removeElement(value) {
            value.removeSelf();
        }
        removeAllElement() {
            this._elementLayer.removeChildren();
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
            if (this._bg) {
                this._bg.removeSelf();
                this._bg.texture = null;
                this._bg = null;
            }
        }
        closeHandle() {

        }
        onClose() {
            if (BaseSceneView.closeSceneHandle) {
                BaseSceneView.closeSceneHandle.runWith(this);
            }
            else {
                this.closeHandle();
            }
        }
        onBack() {
            this.onClose();
        }
        onAdded() {
            super.onAdded();
        }

        initScene() {
            this.mediator ? this.mediator.onShow() : null;
        }
    }
    BaseSceneView.closeSceneHandle = null;
    Laya.ClassUtils.regClass("laya.ui.BaseSceneView", BaseSceneView);
    Laya.ClassUtils.regClass("Laya.BaseSceneView", BaseSceneView);

    class TitleListItem extends BaseView {
        constructor(list) {
            super();
            this._titleList = list;
            var vList = this.propList;
            if (vList) {
                vList.visible = false;
            }
        }
        get isExpand() {
            return this._expand;
        }
        set isExpand(value) {
            this._expand = value;
        }
        get height() {
            var rect = this.getSelfBounds();
            return rect.height;
        }
        get propList() {
            return this.getChildByName("list");
        }
        get propImg() {
            return this.getChildByName("img_bg");
        }
        get dataSource() {
            return this._dataSource;
        }
        set dataSource(value) {
            this._dataSource = value;
        }
        get titleList() {
            return this._titleList;
        }
        set titleList(value) {
            this._titleList = value;
        }
        get imgMaxH() {
            return this._imgMaxH;
        }
        set imgMaxH(value) {
            this._imgMaxH = value;
        }
        get imgMinH() {
            return this._imgMinH;
        }
        set imgMinH(value) {
            this._imgMinH = value;
        }
        set initBgH(value) {
            var pImg = this.propImg;
            if (pImg) {
                pImg.height = value;
            }
        }
        expand(value) {
            this._expand = value;
            var vList = this.propList;
            if (vList) {
                vList.visible = value;
            }
            var pImg = this.propImg;
            if (pImg) {
                pImg.height = value ? this.imgMaxH : this.imgMinH;
            }
            if (this._titleList) {
                this._titleList.refresh();
            }
        }
    }
    Laya.ClassUtils.regClass("laya.ui.TitleListItem", TitleListItem);
    Laya.ClassUtils.regClass("Laya.TitleListItem", TitleListItem);

    class TitleList extends Laya.Panel {
        constructor(render) {
            super();
            this._renderClass = render;
            this._vBox = new Laya.VBox();
            this.addChild(this._vBox);
            this._cells = [];
            this._pools = [];
            this._datas = null;
        }
        get space() {
            return this._vBox.space;
        }
        set space(value) {
            this._vBox.space = value;
        }
        get sizeW() {
            return this.width;
        }
        set sizeW(value) {
            this._vBox.width = value;
            this.width = value;
        }
        get sizeH() {
            return this.height;
        }
        set sizeH(value) {
            this._vBox.height = value;
            this.height = value;
        }
        get renderClass() {
            return this._renderClass;
        }
        set renderClass(value) {
            this._renderClass = value;
        }
        get array() {
            return this._datas;
        }
        set array(value) {
            this._datas = value;

            while (this._vBox.numChildren) {
                var element = this._vBox.removeChildAt(0);
                element.x = element.y = 0;
                this._pools.push(element);
                this.removeEvent(element);
            }
            this._cells.length = 0;
            if (!value) return;
            for (var i = 0; i < value.length; i++) {
                var element = value[i];
                var item = this._pools.shift();
                if (!item) {
                    item = new this._renderClass(this);
                }
                this._cells.push(item);
                this._vBox.addChild(item);
                this.addEvent(item);
                item.dataSource = element;
            }
        }
        refresh() {
            this._vBox.refresh();
        }
        setSize(w, h) {
            this.size(w, h);
        }
        addEvent(value) {
            value.on(Laya.Event.CLICK, this, this.onClick);
        }
        removeEvent(value) {
            value.off(Laya.Event.CLICK, this, this.onClick);
        }
        onClick(value) {
            var itemTarget = value.target;
            var target = value.currentTarget;
            if (target && itemTarget == target && target["expand"]) {
                if (this._expandTarget && this._expandTarget != target) {
                    this._expandTarget.expand(false);
                }
                this._expandTarget = target;
                target.expand(!target.isExpand);
            }
        }
        closeExpandTarget() {
            if (this._expandTarget) {
                this._expandTarget.expand(false);
            }
        }
    }
    Laya.ClassUtils.regClass("laya.ui.TitleList", TitleList);
    Laya.ClassUtils.regClass("Laya.TitleList", TitleList);


    class BaseItemRender extends BaseView {
        constructor(node) {
            super();
            this.node = node;
        }

        set node(value){
            this._node = value;
        }
        get node(){
            return this._node;
        }

        set dataSource(userData) {
            this._dataSource = userData;
            if (userData) {
                this.update();
            } else {
                this.clear();
            }
        }

        get dataSource() {
            return this._dataSource;
        }

        update() {}
        clear() {}
    }
    Laya.ClassUtils.regClass("laya.ui.BaseItemRender", BaseItemRender);
    Laya.ClassUtils.regClass("Laya.BaseItemRender", BaseItemRender);

    exports.BaseView = BaseView;
    exports.BaseSceneView = BaseSceneView;
    exports.TitleListItem = TitleListItem;
    exports.TitleList = TitleList;
    exports.BaseItemRender = BaseItemRender;
}(window.Laya = window.Laya || {}, Laya));