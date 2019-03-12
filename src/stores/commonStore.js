import { observable, reaction, action, decorate } from "mobx";
class CommonStore {
  appName = 'geo-flota';
  version = 'v-1.0.1';
  token = window.localStorage.getItem('jwt');
  appLoaded = false;
  history
  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
          window.location.reload()
        } else {
          window.localStorage.removeItem('jwt');
          window.location.reload()
        }
      }
    );
  }


  setToken(token) {
    this.token = token;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }

}

CommonStore = decorate(CommonStore, {
  appName: observable,
  version: observable,
  token: observable,
  appLoaded: observable,
  history: observable,
  setToken: action,
  setAppLoaded: action
});

export default new CommonStore();
