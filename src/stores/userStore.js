import {observable, action, decorate} from "mobx";

import agent from "../agent";
import { toast } from 'react-toastify';

class UserStore {
  currentUser = {
    id: 0,
    company_id: 0,
    user_id: 0,
    username: "",
    email: "",
    job: null,
    role: "",
    tel: null,
    created_at: null,
    updated_at: null,
  }
  loadingUser = false;
  updatingUser = false;
  updatingUserErrors;
  user = {
    id: 0,
    username: "",
    email: "",
    tel: "",
    job: "",
    role: "",
    password: "",
    passwordVerification: "",
    user_id: 0,
    company_id: 0,
    created_at: "",
    updated_at: ""
  }
  users = [];
  loading = false;
  message = {
    type: "",
    body: "",
    show: false
  };

  hideMessage() {
    this.message = {
      type: '',
      body: '',
      show: false
    }
  }

  showMessage(message) {
    this.message = message
  }

  getAll() {
    this.loading = true;
    return agent.Auth.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.users = data.data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toast.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  create() {
    this.loading = true;
    return agent.Auth.create(this.user)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toast.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toast.error('Error verify your input data')
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  me() {
    this.loadingUser = true;
    return agent.Auth.me()
      .then(response => {
        return response.data.data;
      })
      .then(
        action(user => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  getUser(id) {
    this.loading = true;
    return agent.Auth.getUser(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.user = data.data
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        this.showMessage({
          type: 'error',
          body: body,
          show: true
        })
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  delete(id) {
    this.loading = true;
    return agent.Auth.delete(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toast.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toast.error(body)
      })
      .finally(action(() => this.getAll()));
  }

  update() {
    this.loading = true;
    return agent.Auth.update(this.user)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toast.success(data.message)
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toast.error('Error verify your input data')
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  forgetUser() {
    this.currentUser = undefined;
  }
}

UserStore = decorate(UserStore, {
  currentUser: observable,
  loadingUser: observable,
  updatingUser: observable,
  updatingUserErrors: observable,
  selectedIndex: observable,
  user: observable,
  users: observable,
  loading: observable,
  message: observable,
  pullUser: action,
  updateUser: action,
  forgetUser: action
});

export default new UserStore();
