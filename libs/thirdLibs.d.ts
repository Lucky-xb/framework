/*
 * 
 * @Author: ohg 
 * @Date: 2019-08-09 18:24:05 
 * @Last Modified by: ohg
 * @Last Modified time: 2020-03-19 16:20:03
 */

declare module laya.d3.shader {
    /**
     * @private
     *  <code>ShaderCustom3D</code> 自定义shader 声明
     */
    class ShaderCustom3D {
        constructor();
        /**
		 * 初始化材质
		 * 初始化自定义shader
		 */
        static __init__(): void;
    }
}

declare module Laya {
    class ShaderCustom3D extends laya.d3.shader.ShaderCustom3D {
    }
}
/**
 * zlib 声明
 */
declare module Zlib {
    export class Inflate {
        constructor(dataany);
        decompress(): any;
    }

    export class Deflate {
        constructor(dataany);
        compress(): any;
    }
}

/**
 * 移动设备
 */
declare class MobileDetect {
	static version: string;
	constructor(userAgent: string, maxPhoneWidth?: number);
    mobile(): string|null;
	userAgent(): string;
    os(): string;
    tablet(): string|null;

	version(value: string): number;
	versionStr(value: string): string;
}