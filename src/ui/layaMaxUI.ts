/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.game {
    export class GameViewUI extends Laya.BaseView {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("game/GameView");
        }
    }
    REG("ui.game.GameViewUI",GameViewUI);
}
export module ui.login {
    export class LoginViewUI extends Laya.BaseView {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("login/LoginView");
        }
    }
    REG("ui.login.LoginViewUI",LoginViewUI);
}
export module ui.mainui {
    export class MainUIViewUI extends Laya.BaseView {
		public bg:Laya.Image;
		public boxContent:Laya.Box;
		public listContent:Laya.List;
		public btn:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("mainui/MainUIView");
        }
    }
    REG("ui.mainui.MainUIViewUI",MainUIViewUI);
}