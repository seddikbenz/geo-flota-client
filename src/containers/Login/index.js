import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'
import './style.scss'
import All from "../Users/All";
import Edit from "../Users/Edit";
import Add from "../Users/Add";

class Login extends Component{
  login(e){
    e.preventDefault()
    store.authStore.login()
  }
  render(){
    return(
      <div className="window">
        <div className="window-content center">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                value={store.authStore.values.email}
                onChange={(e)=>{store.authStore.setEmail(e.target.value)}}
                type="email"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={store.authStore.values.password}
                onChange={(e)=>{store.authStore.setPassword(e.target.value)}}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-actions">
              <button onClick={this.login} className="btn btn-form btn-primary">
                <span className="icon icon-login" style={{color: 'white'}}></span>
                &nbsp;Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default observer(Login);
