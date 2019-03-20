import {observable, reaction, action, decorate} from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import {toast} from 'react-toastify';
import React from "react";
import store from "./index";

class mapStore {
  mapRef = React.createRef();
  mapZoom = 5
  mapCenter = {
    lat:30.08,
    lng:4.76
  }
  cars = [];
  loading = false;
  selectedIndex
  showListCars = false
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

  updateCarsLastPosition() {
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
        })
      );
  }

  zoomTo(id, position){
    const map = store.mapStore.mapRef.current;
    if (map != null) {
      map.leafletElement.flyTo(position, 15);
      this.selectedIndex = id
    }
  }
}

mapStore = decorate(mapStore, {
  mapRef: observable,
  mapZoom: observable,
  mapCenter: observable,
  cars: observable,
  showListCars: observable,
  selectedIndex: observable,
  loading: observable,
  zoomTo: action
});

export default new mapStore();
