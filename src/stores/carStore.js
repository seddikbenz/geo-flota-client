import { observable, reaction, action, decorate } from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import { toast } from 'react-toastify';

class carStore {
  selectedIndex = 0;
  car = {
    id: 0,
    numberplate: "",
    code: "",
    gps_code: "",
    company_id: ""
  };
  cars = [];
  loading = false;
  message = {
    type: "",
    body: "",
    show: false
  };
  hideMessage(){
    this.message = {
      type: '',
      body: '',
      show: false
    }
  }
  showMessage(message){
    this.message = message
  }
  getCar(id) {
    this.loading = true;
    return agent.Car.getCar(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.car = data.data
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

  getCarLastPosition(id) {
    this.loading = true;
    return agent.Car.getCarLastPosition(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.car = data.data
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

  getAll() {
    this.loading = true;
    return agent.Car.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.cars = data.data;
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
  create() {
    this.loading = true;
    return agent.Car.create(this.car)
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
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  delete(id) {
    this.loading = true;
    return agent.Car.delete(id)
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
    return agent.Car.update(this.car)
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
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }
}

carStore = decorate(carStore, {
  selectedIndex: observable,
  car: observable,
  cars: observable,
  loading: observable,
  message: observable,
});

export default new carStore();
