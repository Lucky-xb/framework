class XY {
	x: number = 0;
	y: number = 0;
}

/*
 * 数学计算工具类
 * @Author: zwb 
 * @Date: 2021-09-08 10:50:42 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-08 10:51:46
 */
export class MathUtils {

	/**
	 * 弧度制转换为角度值
	 * @param radian 弧度制
	 * @returns {number}
	 */
	public static getAngle(radian: number): number {
		return 180 * radian / Math.PI;

	}

	/**
	 * 角度值转换为弧度制
	 * @param angle
	 */
	public static getRadian(angle: number): number {
		return angle / 180 * Math.PI;
	}

	public static sin(angle: number): number {
		return Math.sin(MathUtils.getRadian(angle));
	}

	public static cos(angle: number): number {
		return Math.cos(MathUtils.getRadian(angle));
	}

	/**
	 * 获取两点间弧度
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let xdis: number = p2X - p1X;
		let ydis: number = p2Y - p1Y;
		return Math.atan2(ydis, xdis);
	}

	/**
	 * 获取两点间距离
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let disX: number = p2X - p1X;
		let disY: number = p2Y - p1Y;
		let disQ: number = disX * disX + disY * disY;
		return Math.sqrt(disQ);
	}

	public static getDistanceByObject(s: XY, t: XY): number {
		return this.getDistance(s.x, s.y, t.x, t.y);
	}

	/**获取两个点的距离的平方 */
	public static getDistanceX2ByObject(s: XY, t: XY): number {
		let disX: number = s.x - t.x;
		let disY: number = s.y - t.y;
		return disX * disX + disY * disY;
	}

	/** 角度移动点 */
	public static getDirMove(angle: number, distance: number, offsetX: number = 0, offsetY: number = 0): XY {
		let radian = this.getRadian(angle);
		let p = { x: 0, y: 0 };
		p.x = Math.cos(radian) * distance + offsetX;
		p.y = Math.sin(radian) * distance + offsetY;
		return p;
	}

	/**
	 * 获取两个点延长线上某个距离的点
	 * @param p1:起始点
	 * @param p2:结束点
	 */
	public static getPByDistance(p1: XY, p2: XY, disance: number): XY {
		let angle: number = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		let p: Laya.Point = new Laya.Point;
		p.x = p2.x + disance * Math.cos(angle);
		p.y = p2.y + disance * Math.sin(angle);
		return p;
	}

	/**
	 * 获取一个区间的随机数
	 * @param $from 最小值
	 * @param $end 最大值
	 * @returns {number}
	 */
	public static limit($from: number, $end: number): number {
		$from = Math.min($from, $end);
		$end = Math.max($from, $end);
		let range: number = $end - $from;
		return $from + Math.random() * range;
	}

	/**
	 * 获取一个区间的随机数(帧数)
	 * @param $from 最小值
	 * @param $end 最大值
	 * @returns {number}
	 */
	public static limitInteger($from: number, $end: number): number {
		return Math.round(this.limit($from, $end));
	}

	/**
	 * 在一个数组中随机获取一个元素
	 * @param arr 数组
	 * @returns {any} 随机出来的结果
	 */
	public static randomArray(arr: Array<any>): any {
		let index: number = Math.floor(Math.random() * arr.length);
		return arr[index];
	}

	/**取整 */
	public static toInteger(value: number): number {
		return value >> 0;
	}

	/**
	 * vertx, verty: 顶点X坐标和Y坐标分别组成的数组
	 * testx, testy: 需要测试的点的X坐标和Y坐标
	 */
	public static testInRect(vertx: number[], verty: number[], testx: number, testy: number): boolean {
		let i, j: number = 0;
		let result: boolean = false;
		let count = vertx.length;
		for (i = 0, j = count - 1; i < count; j = i++) {
			if (((verty[i] > testy) != (verty[j] > testy)) &&
				(testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
				result = !result;
		}
		return result;
	}

	/**
	 * 计算得到矩形范围内的单位
	 */
	public static getInRectList<T extends XY>(sender: T, target: T, range: number, width: number,
		enemys: T[], affectCount: number = Number.MAX_VALUE): T[] {
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

		let xVec = new Array<number>();
		let yVec = new Array<number>();

		xVec[0] = target.x + sw;
		yVec[0] = target.y - cw;

		xVec[1] = target.x - sw;
		yVec[1] = target.y + cw;

		xVec[3] = x3 + sw;
		yVec[3] = y3 - cw;

		xVec[2] = x3 - sw;
		yVec[2] = y3 + cw;

		let list: T[] = [];
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

	/**
	 * 获取圆形区域内的单位
	 */
	public static getInCircleList<T extends XY>(target: T, range: number,
		enemys: T[], affectCount: number = Number.MAX_VALUE): T[] {
		let list: T[] = [];
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