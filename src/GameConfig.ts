/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=720;
    static height:number=1280;
    static scaleMode:string="fixedwidth";
    static screenMode:string="vertical";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="game/GameView.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=true;
    static physicsDebug:boolean=true;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;

    }
}
GameConfig.init();