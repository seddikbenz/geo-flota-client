import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

import Spinner from '../../components/Spinner'

class All extends Component {
  componentDidMount() {
    store.userStore.getAll()
    store.userStore.selectedIndex = 0
    document.addEventListener("keydown", this._onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown, false);
  }

  _onKeyDown(e) {
    if (e.keyCode === 38) {
      if (store.userStore.selectedIndex === 0) {
        store.userStore.selectedIndex = store.userStore.users.length - 1
      } else {
        store.userStore.selectedIndex = Math.abs((store.userStore.selectedIndex - 1) % (store.userStore.users.length))
      }
    }
    if (e.keyCode === 40) {
      store.userStore.selectedIndex = Math.abs((store.userStore.selectedIndex + 1) % (store.userStore.users.length))
    }
  }

  delete(id) {
    if (window.confirm('Do you delete that User?')) {
      store.userStore.delete(id)
    }
  }

  render() {
    if (store.userStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    if (store.userStore.users.length === 0) {
      return (
        <div className="window-content center">
          No User found
        </div>
      );
    }
    return (
      <div className="window-content companies">
        <input autoFocus={true} placeholder='Search user' className='form-control search' type="text"/>
        <div className='window-content'>
          <table className="table-striped">
            <thead>
            <tr>
              <th>index</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {store.userStore.users.map((user, index) => {
              if(store.userStore.currentUser.id !== user.id){
                return (
                  <tr onClick={() => store.userStore.selectedIndex = index} key={index}
                      className={store.userStore.selectedIndex === index ? 'active' : ''}>
                    <td> {index + 1} </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className='actions'>
                      <Link
                        to={'/users/edit/' + user.id}
                        className={`btn btn-default ${this.props.location.pathname === '/users/edit' ? 'active' : ''}`}
                      >
                        <span className="icon icon-pencil" />
                      </Link>
                      <button onClick={()=>this.delete(user.id)} className="btn btn-default">
                        <span className="icon icon-trash" />
                      </button>
                    </td>
                  </tr>
                )
              }
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default observer(All);
//        message = {store.companyStore.message.body} type {store.companyStore.message.type}
