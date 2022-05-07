import { BaseView } from "../base/BaseView";
import { ui } from "../ui/layaMaxUI";

export class GameView extends ui.game.GameViewUI {

    public className: string = 'GameView';

    public constructor() {
        super();
        // this.loadScene('game/GameView.scene');
    }
}