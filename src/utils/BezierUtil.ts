/*
 * 贝塞尔工具
 * @Author: zwb 
 * @Date: 2021-09-03 14:52:16 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-03 15:25:37
 */
export class BezierUtil {

    /** 获取贝塞尔曲线 */
    public static getBezier(t: number, p0: number, p1: number, p2: number): number {
        return (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2;
    }

    /**
     * 创建贝塞尔点
     * @param anchorpoints [new Laya.Point(x,y), new Laya.Point(x,y), new Laya.Point(x,y)]=[起点，顶点...，终点]
     * @param pointsAmount 要创建多少个点
     * @returns 
     */
    public static CreateBezierPoints(anchorpoints, pointsAmount): Array<any> {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }

    private static MultiPointBezier(points, t): any {
        let len: number = points.length;
        let x: number = 0, y: number = 0;
        for (let i: number = 0; i < len; i++) {
            let point: any = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
        }
        return { x: x, y: y };
    }

    private static erxiangshi(start: number, end: number): number {
        let cs: number = 1, bcs: number = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    }
}