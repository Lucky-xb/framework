import { BaseView } from "../base/BaseView";

export class LoginView extends BaseView {

    public className: string = 'LoginView';

    public constructor() {
        super();
        this.loadScene('login/LoginView.scene');
    }
}