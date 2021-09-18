/*
 * 物理工具
 * @Author: zwb 
 * @Date: 2021-09-01 11:59:07 
 * @Last Modified by: zwb
 * @Last Modified time: 2021-09-01 11:59:52
 */
export class PhysicsUtil {

    /**
     * 重力加速度
     * @param gravity 重力系数
     * @param deltaTime 增量时间，一般为帧间隔时间
     */
    public static gravitySpeed(gravity: number, deltaTime): number {
        return gravity * deltaTime;
    }

    /**
     * 调整x,y方向的重力加速度方向，使得物体可以朝目标点移动
     * @param curP		当前坐标
     * @param targetP	目标坐标
     * @param gravity	重力系数
     * @param speedY	y方向的加速度
     */
    public static adjustSpeed(curP: Laya.Point, targetP: Laya.Point, gravity: number, speedY: number): Laya.Point {
        let s = targetP.x - curP.x;        // 水平位移差
        let h = targetP.y - curP.y;        // 高度差
        let g = gravity;
        let vy = speedY;

        if (h < 0)        // 只考虑目标点在下方的情况
            return;

        let t = (-vy + Math.sqrt(vy * vy + 2 * g * h)) / g;    // 自由落体物理, 已知初速度vy和g, 求解下时间
        let vx = s / t;

        return new Laya.Point(vx, vy);
    }
}