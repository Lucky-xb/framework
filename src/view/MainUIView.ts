import { BaseView } from "../base/BaseView";
import { Mgr } from "../mgr/Mgr";
import { Utils } from "../utils/Utils";

export class MainUIView extends BaseView {

    public className: string = 'MainUIView';

    private img: Laya.Image;

    private _ske: Laya.Skeleton;
    private _ske2: Laya.Skeleton;

    private _line: Laya.Sprite;
    private drapShape: Laya.Image;
    private _pointArr = [];
    private _points = [new Laya.Point(435, 650), new Laya.Point(255, 500), new Laya.Point(140, 560), new Laya.Point(143, 793)]

    private _node1: Laya.Sprite;
    private _node3: Laya.Sprite;

    private _startX = 435;
    private _startY = 650;

    public constructor() {
        super();
        this.loadScene('mainui/MainUIView.scene');
    }

    protected createChildren(): void {
        this.on('onViewCreated', this, this.onViewCreated);

        // this._ske = new Laya.Skeleton();
        // this.addChild(this._ske);
        // this._ske.load('res/ske/Crew_02_1_ske_1.sk');
        // this._ske.pos(300, 800);
        // this._ske.scaleX = this._ske.scaleY = 0.5;

        // this._ske2 = new Laya.Skeleton();
        // this.addChild(this._ske2);
        // this._ske2.load('res/ske/Crew_02_2_ske_1.sk');
        // this._ske2.pos(300, 800);
        // this._ske2.scaleX = this._ske2.scaleY = 0.5;

        // this._line = new Laya.Sprite();
        // this.addChild(this._line);
        // this._line.graphics.drawLine(435, 650, 435, 750, "#ffffff", 2);
        // this._line.graphics.drawCurves(435, 650, [0, 0, 25, 50, 0, 100], "#ffffff", 2);

        this._node1 = new Laya.Sprite();
        this.addChild(this._node1);
        this._node1.pos(425, 640);

        this._node2 = new Laya.Sprite();
        this.addChild(this._node2);
        this._node2.pos(500, 640);

        this._node3 = new Laya.Sprite();
        this.addChild(this._node3);
    }

    private _prevBody: Laya.RigidBody;
    private onViewCreated(): void {
        this.setChildIndex(this.img, 0)

        // this._ske.play(Action.casting, true)
        // this._ske2.play(Action.casting, true)

        // let l = new Laya.Sprite();
        // this.addChild(l)
        // l.graphics.drawCurves(435, 650, [0, 0, -180, -190, -260, -10, -280, 50, -290, 130], "#ffffff", 2)

        let rb: Laya.RigidBody = this._node1.addComponent(Laya.RigidBody);
        rb.bullet = true;
        rb.type = 'static';
        rb.gravityScale = 0;
        rb.linearDamping = 30;
        let cc: Laya.CircleCollider = this._node1.addComponent(Laya.CircleCollider);
        cc.radius = 5;
        let preBody = rb;

        let width = 20, height = 1;
        let len = 5;
        for (let i = 0; i < len; i++) {
            let s = new Laya.Sprite();
            this.addChild(s);
            s.pivotX = s.pivotY = 0;
            s.pos(this._startX + i * width, this._startY)
            let r: Laya.RigidBody = s.addComponent(Laya.RigidBody);
            let b: Laya.BoxCollider = s.addComponent(Laya.BoxCollider);
            r.linearDamping = 0.5;
            b.width = width;
            b.height = height;
            b.density = 20;
            b.friction = 0.2;
            b.y = -height / 2;
            let rj: Laya.RevoluteJoint = new Laya.RevoluteJoint();
            rj.otherBody = preBody;
            s.addComponentIntance(rj);
            preBody = r;
            if (i == (len - 1)) {


                this._node3.pos(this._startX + i * width, this._startY);
                this._rb2 = this._node3.addComponent(Laya.RigidBody);
                this._rb2.bullet = true;
                let cc: Laya.CircleCollider = this._node3.addComponent(Laya.CircleCollider);
                cc.radius = 5;
                this._rj = new Laya.RevoluteJoint();
                this._rj.otherBody = preBody;
                this._node3.addComponentIntance(this._rj);
                this._prevBody = this._rb2;
            }
        }

        this.init();
    }

    private _rj: Laya.RevoluteJoint;
    private init(): void {
        let points = []
        let point1 = new Laya.Point(435, 650) // 起点
        let point2 = new Laya.Point(255, 500)//一个顶点 还可以继续添加 点
        let point3 = new Laya.Point(140, 560)//一个顶点 还可以继续添加 点
        let point4 = new Laya.Point(143, 793)//终点

        let img = new Laya.Image();
        this.addChild(img)
        img.pos(255, 500)
        img.skin = 'res/ui/ui1.png'
        img['idx'] = 1;
        img.on(Laya.Event.MOUSE_DOWN, this, this.onBeginHandler)

        img = new Laya.Image();
        this.addChild(img)
        img.pos(140, 560)
        img.skin = 'res/ui/ui1.png'
        img['idx'] = 2;
        img.on(Laya.Event.MOUSE_DOWN, this, this.onBeginHandler)

        img = new Laya.Image();
        this.addChild(img)
        img.pos(143, 793)
        img.skin = 'res/ui/ui1.png'
        img['idx'] = 3;
        img.on(Laya.Event.MOUSE_DOWN, this, this.onBeginHandler)

        img = new Laya.Image();
        this.addChild(img)
        img.pos(200, 1000)
        img.skin = 'res/ui/ui1.png'
        img.on(Laya.Event.CLICK, this, this.onImgClick)
    }

    private drawP(points): void {
        let array = Utils.bezier.CreateBezierPoints(points, 30)
        let index = 0;
        let self = this;
        Laya.timer.loop(1, this, function te() {
            if (index > array.length - 1) {
                Laya.timer.clear(self, te)
                return;
            }
            if (!this._pointArr[index]) {
                this._pointArr[index] = new Laya.Sprite();
                this.addChild(this._pointArr[index])
            }
            this._pointArr[index].graphics.clear();
            this._pointArr[index].graphics.drawCircle(array[index].x, array[index].y, 2, 'red');

            index++
        })
    }

    private onBeginHandler(e: Laya.Event): void {
        e.stopPropagation();


        this.drapShape = <Laya.Image>e.currentTarget;
        this.drapShape.off(Laya.Event.MOUSE_DOWN, this, this.onBeginHandler);

        this.drapShape.mouseEnabled = false;

        this.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMoveHandler);
        this.stage.on(Laya.Event.MOUSE_UP, this, this.onEndHandler);
    }

    private onMoveHandler(e: Laya.Event): void {
        this.drapShape.x = e.stageX;
        this.drapShape.y = e.stageY;
    }

    private onEndHandler(e: Laya.Event): void {
        this.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMoveHandler);
        this.stage.off(Laya.Event.MOUSE_UP, this, this.onEndHandler);

        this.drapShape.mouseEnabled = true;

        this._points[1] = new Laya.Point(e.stageX, e.stageY)
        this.drawP(this._points)

        this.drapShape.on(Laya.Event.MOUSE_DOWN, this, this.onBeginHandler);
    }

    private _arr = [];
    private _prevPoint: any;
    private _rb: Laya.RigidBody;
    private move(points): void {
        let num = 30;
        this._prevPoint = points[0];
        this._arr = Utils.bezier.CreateBezierPoints(points, num);
        this.drawP(points)
        let i = 0;
        this._rb = this._node1.getComponent(Laya.RigidBody);
        this._rb.type = 'dynamic';

        let self = this;
        let ti = function () {
            i++;
            if (!self._arr[i]) {
                Laya.timer.clear(self, ti);

                if (self.isFirst) self.playNext();
                else self.playEnd();
                return;
            }
            self.play(self._arr[i], self._rb);
            self._prevPoint = self._arr[i];
        }

        Laya.timer.loop(50, this, ti);
        ti();
    }

    private isFirst = true;
    private _points2 = [new Laya.Point(143, 793), new Laya.Point(255, 400), new Laya.Point(435, 500)];
    private _points3 = [new Laya.Point(480, 400)];
    private playNext() {
        this.isFirst = false;
        this.move(this._points2);
    }

    private _node2: Laya.Sprite;
    private play(nextPoint, rb): void {
        let dx = Math.floor(nextPoint.x - this._prevPoint.x);
        let dy = Math.floor(nextPoint.y - this._prevPoint.y);

        let v = this.isFirst ? 1 : 1.3;
        rb.linearVelocity = { x: dx * v, y: dy * v }
    }

    private playEnd() {
        this._rb.type = 'static';


        let points = [new Laya.Point(this._node3.x, this._node3.y), new Laya.Point(700, 400)];
        this.pl(points)
    }

    private isOver = false;
    private _rb2: Laya.RigidBody;
    private _max: number = 65;
    private _curX = 0;
    private _curY = 0;
    private _nextX = 0;
    private _nextY = 0;
    private _curI = 0;
    private pl(points) {
        let num = 30;
        this._prevPoint = points[0];
        this._arr = Utils.bezier.CreateBezierPoints(points, num);
        this.drawP(points)
        let i = 0;
        this._rb2.type = 'dynamic';

        let width = 20, height = 1;
        let self = this;
        let startX = 0, startY = 0;
        let ti = function () {
            i++;
            if (!self._arr[i]) {
                Laya.timer.clear(self, ti);
                return;
            }

            let dis = 0;
            let d = 0;
            if (!self.isOver) {
                dis = Utils.math.getDistance(self._node3.x, self._node3.y, self._node1.x, self._node1.y);
                d = dis - self._max;
                if (d >= 0) self.isOver = true;
            }

            // 线延长
            if (self.isOver) {
                self._curI = i;
                Laya.timer.clear(self, ti);
                self.ti2();
                Laya.timer.loop(50, self, self.ti2);
                return;
            }

            self.play(self._arr[i], self._rb2);
            self._prevPoint = self._arr[i];
        }

        Laya.timer.loop(50, this, ti);
        ti();
    }

    private ti2() {
        this._rb2.type = 'staitc';
        let width = 20, height = 1;

        let s = new Laya.Sprite();
        this.addChild(s);
        s.pivotX = s.pivotY = 0;
        s.pos(this._node3.x, this._node3.y)
        let r: Laya.RigidBody = s.addComponent(Laya.RigidBody);
        let b: Laya.BoxCollider = s.addComponent(Laya.BoxCollider);
        r.linearDamping = 0.5;
        r.type = 'static';
        // b.width = d;
        b.height = height;
        b.density = 20;
        b.friction = 0.2;
        b.y = -height / 2;
        let rj: Laya.RevoluteJoint = new Laya.RevoluteJoint();
        rj.otherBody = this._prevBody;
        s.addComponentIntance(rj);
        this._prevBody = r;
    }

    private onImgClick(): void {
        this.move(this._points);
    }
}

enum Action {
    /** 投掷 */
    casting = 'casting',
    /** 上钩 */
    hook = 'hook',
    /** 等待 */
    idle = 'idle',
    /** 拉钩 */
    reeling = 'reeling'
}