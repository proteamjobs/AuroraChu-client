import { observable, action } from "mobx";

class SigninStore {
  @observable isLogin = false;
  @observable user = {};

  @action
  login = user => {
    this.isLogin = true;
    this.user = user;
    console.log("isLogin ::: ", this.isLogin);
    console.log("user ::: ", this.user);
  };
}
export default new SigninStore();
