import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

import Spinner from '../../components/Spinner'

class All extends Component {
  componentDidMount() {
    store.carStore.getAll()
    store.carStore.selectedIndex = 0
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
    if (store.carStore.cars.length === 0) {
      return (
        <div className="window-content center">
          No Car found
        </div>
      );
    }
    return (
      <div className="window-content companies">
        <input autoFocus={true} placeholder='Search car' className='form-control search' type="text"/>
        <div className='window-content'>
          <table className="table-striped">
            <thead>
            <tr>
              <th>index</th>
              <th>numberplate</th>
              <th>Code</th>
              <th>GPS code</th>
              <th className='actions'>Actions</th>
            </tr>
            </thead>
            <tbody>
            {store.carStore.cars.map((car, index) => (
              <tr onClick={() => store.carStore.selectedIndex = index} key={index}
                  className={store.carStore.selectedIndex === index ? 'active' : ''}>
                <td> {index + 1} </td>
                <td>{car.numberplate}</td>
                <td>{car.code}</td>
                <td>{car.gps_code}</td>
                <td className='actions'>
                  <Link to={'/cars/edit/' + car.id}
                        className={`btn btn-default ${this.props.location.pathname === '/cars/edit' ? 'active' : ''}`}>
                    <span className="icon icon-pencil"></span>
                  </Link>
                  <button onClick={()=>this.delete(car.id)} className="btn btn-default">
                    <span className="icon icon-trash"></span>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default observer(All);
//        message = {store.companyStore.message.body} type {store.companyStore.message.type}
