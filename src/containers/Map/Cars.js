import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import store from '../../stores'

import './style.scss'

import Spinner from '../../components/Spinner'

class All extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this._onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown, false);
  }

  _onKeyDown(e) {
    if (e.keyCode === 38) {
      if (store.carStore.selectedIndex === 0) {
        store.carStore.selectedIndex = store.carStore.cars.length - 1
      } else {
        store.carStore.selectedIndex = Math.abs((store.carStore.selectedIndex - 1) % (store.carStore.cars.length))
      }
    }
    if (e.keyCode === 40) {
      store.carStore.selectedIndex = Math.abs((store.carStore.selectedIndex + 1) % (store.carStore.cars.length))
    }
  }

  delete(id) {
    if (window.confirm('Do you delete this Company')) {
      store.carStore.delete(id)
    }
  }

  render() {
    if (store.carStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    if (store.mapStore.cars.length === 0) {
      return (
        <div className="window-content center">
          No Car found
        </div>
      );
    }
    return (
      <div className="map-cars">
        <ul className="list-group">
          <li className="list-group-header">
            <input onFocus={()=>store.mapStore.showListCars = true} className="form-control" type="text" placeholder="Search for car" />
          </li>
          { store.mapStore.showListCars &&
            store.mapStore.cars.map((car, index) => (
              <li
                onClick={() => {
                  if(car.positions.length !=0){
                    store.mapStore.zoomTo(car.id, car.positions[0])
                  }}}
                key={index}
                className={store.mapStore.selectedIndex === car.id ? 'list-group-item active' : 'list-group-item'}
              >
                <div className="media-body">
                  <strong>{car.code}</strong>
                  <p>{car.numberplate} </p>
                </div>
              </li>
            ))
          }
        </ul>

      </div>
    )
  }
}

export default observer(All);
//        message = {store.companyStore.message.body} type {store.companyStore.message.type}
