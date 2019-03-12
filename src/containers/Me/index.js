import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'
import Spinner from '../../components/Spinner'

class Me extends Component{
  render(){
    return(
      <div className="window">
        <div className="window-content center">
          <div>
            <div className="form-group">
              <label>Username</label>
              <input
                value={store.userStore.currentUser.username}
                readOnly
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                readOnly
                value={store.userStore.currentUser.email}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Me);
