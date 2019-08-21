import { observable, action } from "mobx";

class SigninStore {
  @observable isLogin = false;
  @observable user;
  @observable jwt;

  @action
  login = user => {
    this.isLogin = true;
    this.user = user;
  };

  @action
  storeToken = jwt => {
    this.jwt = jwt;
  };
}
export default new SigninStore();
