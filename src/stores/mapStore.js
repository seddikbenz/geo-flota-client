import {observable, reaction, action, decorate} from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import {toast} from 'react-toastify';

class mapStore {
  cars = [];
  loading = false;
  getCarsLastPosition() {
    this.loading = true;
    return agent.Car.getCarsLastPosition()
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
        toast.error(body)
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }
}

mapStore = decorate(mapStore, {
  cars: observable,
  loading: observable,
});

export default new mapStore();
