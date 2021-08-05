import { BaseView } from "./base/BaseView";
import { Utils } from "./utils/Utils";

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

    private _startX = 435;
    private _startY = 650;

    public constructor() {
        super();
        this.loadScene('mainui/MainUIView.scene');
        this.hashCode = Utils.hash.hashCode('MainUIView');
    }

    protected createChildren(): void {
        this.on('onViewCreated', this, this.onViewCreated);

        this._ske = new Laya.Skeleton();
        this.addChild(this._ske);
        this._ske.load('res/ske/Crew_02_1_ske_1.sk');
        this._ske.pos(300, 800);
        this._ske.scaleX = this._ske.scaleY = 0.5;

        this._ske2 = new Laya.Skeleton();
        this.addChild(this._ske2);
        this._ske2.load('res/ske/Crew_02_2_ske_1.sk');
        this._ske2.pos(300, 800);
        this._ske2.scaleX = this._ske2.scaleY = 0.5;

        // this._line = new Laya.Sprite();
        // this.addChild(this._line);
        // this._line.graphics.drawLine(435, 650, 435, 750, "#ffffff", 2);
        // this._line.graphics.drawCurves(435, 650, [0, 0, 25, 50, 0, 100], "#ffffff", 2);

        this._node1 = new Laya.Sprite();
        this.addChild(this._node1);
        this._node1.pos(425, 640);
    }

    private onViewCreated(): void {
        this.setChildIndex(this.img, 0)

        // this._ske.play(Action.casting, true)
        this._ske2.play(Action.casting, true)

        // let l = new Laya.Sprite();
        // this.addChild(l)
        // l.graphics.drawCurves(435, 650, [0, 0, -180, -190, -260, -10, -280, 50, -290, 130], "#ffffff", 2)

        let rb: Laya.RigidBody = this._node1.addComponent(Laya.RigidBody);
        rb.bullet = true;
        rb.type = 'static';
        let cc: Laya.CircleCollider = this._node1.addComponent(Laya.CircleCollider);
        cc.radius = 5;
        let preBody = rb;

        let width = 20, height = 1;
        for (let i = 0; i < 5; i++) {
            let s = new Laya.Sprite();
            this.addChild(s);
            s.pivotX = s.pivotY = 0;
            s.pos(this._startX + i * width, this._startY)
            let r: Laya.RigidBody = s.addComponent(Laya.RigidBody);
            let b: Laya.BoxCollider = s.addComponent(Laya.BoxCollider);
            b.width = width;
            b.height = height;
            b.density = 20;
            b.friction = 0.2;
            b.y = -height / 2;
            let rj: Laya.RevoluteJoint = new Laya.RevoluteJoint();
            rj.otherBody = preBody;
            s.addComponentIntance(rj);
            preBody = r;
        }

        this.init();
    }

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

        // points.push(point1)
        // points.push(point2)
        // points.push(point3)
        // points.push(point4)
        // this.drawP(this._points)

        // this.move(this._points);
    }

    private drawP(points): void {
        let array = this.CreateBezierPoints(points, 60)
        // console.log("array:", array)

        let index = 0
        //Laya.timer.loop()
        Laya.timer.loop(1, this, function () {
            if (index > array.length - 1) {
                Laya.timer.clearAll(this)
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
        // Laya.timer.frameLoop(1, this, function () {
        //     if (index > array.length - 1) {
        //         Laya.timer.clearAll(this)
        //         return;
        //     }
        //     // console.log("index:", index)
        //     // console.log("index:", array[index])
        //     if (!this._pointArr[index]) {
        //         this._pointArr[index] = new Laya.Sprite();
        //         this.addChild(this._pointArr[index])
        //     }
        //     this._pointArr[index].graphics.clear();
        //     this._pointArr[index].graphics.drawCircle(array[index].x, array[index].y, 2, 'red');

        //     index++
        // })
    }

    public CreateBezierPoints(anchorpoints, pointsAmount): Array<any> {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }

    private MultiPointBezier(points, t): any {
        let len: number = points.length;
        let x: number = 0, y: number = 0;
        for (let i: number = 0; i < len; i++) {
            let point: any = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }

    private erxiangshi(start: number, end: number): number {
        let cs: number = 1, bcs: number = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };

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
        console.log(e.stageX, e.stageY)
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
    private move(points): void {
        this._arr = this.CreateBezierPoints(points, 30)
        let i = 0;
        // this._node1.pos(this._arr[i].x, this._arr[i].y);
        this.play(i);
    }

    private play(i: number): void {
        let rb: Laya.RigidBody = this._node1.getComponent(Laya.RigidBody);
        // rb.type = 'dynamic'
        // let F = 0.5;
        // rb.applyForce({ x: 100, y: 100 }, F);
        console.log(rb.getMass())

        // let idx = i;
        // if (idx > (this._arr.length - 1)) {
        //     this._node1.pos(this._arr[i - 1].x, this._arr[i - 1].y)
        //     return;
        // }

        // Laya.Tween.to(this._node1, { x: this._arr[i].x, y: this._arr[i].y }, 0.1, null, Laya.Handler.create(this, () => {
        //     idx++;
        //     this.play(idx);
        // }))
    }

    private onImgClick(): void {
        this.move(this._points);
    }
}
// Laya.ClassUtils.regClass('MainUIView', MainUIView);

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