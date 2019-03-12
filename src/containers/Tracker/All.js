import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

import Spinner from '../../components/Spinner'

class All extends Component {
  componentDidMount() {
    store.trackerStore.getAll()
    store.trackerStore.selectedIndex = 0
    document.addEventListener("keydown", this._onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown, false);
  }

  _onKeyDown(e) {
    if (e.keyCode === 38) {
      if (store.trackerStore.selectedIndex === 0) {
        store.trackerStore.selectedIndex = store.trackerStore.trackers.length - 1
      } else {
        store.trackerStore.selectedIndex = Math.abs((store.trackerStore.selectedIndex - 1) % (store.trackerStore.trackers.length))
      }
    }
    if (e.keyCode === 40) {
      store.trackerStore.selectedIndex = Math.abs((store.trackerStore.selectedIndex + 1) % (store.trackerStore.trackers.length))
    }
  }

  delete(id) {
    if (window.confirm('Do you delete this Tracker')) {
      store.trackerStore.delete(id)
    }
  }

  render() {
    if (store.trackerStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    if (store.trackerStore.trackers.length === 0) {
      return (
        <div className="window-content center">
          No Tracker found
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
              <th>Code</th>
              <th>car_id</th>
              <th className='actions'>Actions</th>
            </tr>
            </thead>
            <tbody>
            {store.trackerStore.trackers.map((tracker, index) => (
              <tr onClick={() => store.trackerStore.selectedIndex = index} key={index}
                  className={store.trackerStore.selectedIndex === index ? 'active' : ''}>
                <td> {index + 1} </td>
                <td>{tracker.code}</td>
                <td>{tracker.car_id}</td>
                <td className='actions'>
                  <Link to={'/trackers/edit/' + tracker.id}
                        className={`btn btn-default ${this.props.location.pathname === '/trackers/edit' ? 'active' : ''}`}>
                    <span className="icon icon-pencil"></span>
                  </Link>
                  <button onClick={()=>this.delete(tracker.id)} className="btn btn-default">
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
