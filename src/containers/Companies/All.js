import React, {Component} from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

import Spinner from '../../components/Spinner'

class All extends Component {
  componentDidMount() {
    store.companyStore.getAll()
    store.companyStore.selectedIndex = 0
    document.addEventListener("keydown", this._onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown, false);
  }

  _onKeyDown(e) {
    if (e.keyCode === 38) {
      if (store.companyStore.selectedIndex === 0) {
        store.companyStore.selectedIndex = store.companyStore.companies.length - 1
      } else {
        store.companyStore.selectedIndex = Math.abs((store.companyStore.selectedIndex - 1) % (store.companyStore.companies.length))
      }
    }
    if (e.keyCode === 40) {
      store.companyStore.selectedIndex = Math.abs((store.companyStore.selectedIndex + 1) % (store.companyStore.companies.length))
    }
    console.log('key')
  }

  delete(id) {
    if (window.confirm('Do you delete this Company')) {
      store.companyStore.delete(id)
    }
  }

  render() {
    if (store.companyStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    if (store.companyStore.companies.length === 0) {
      return (
        <div className="window-content center">
          No Company found
        </div>
      );
    }
    return (
      <div className="window-content companies">
        <input autoFocus={true} placeholder='Search company' className='form-control search' type="text"/>
        <div className='window-content'>
          <table className="table-striped">
            <thead>
            <tr>
              <th>index</th>
              <th>Name</th>
              <th className='actions'>Actions</th>
            </tr>
            </thead>
            <tbody>
            {store.companyStore.companies.map((company, index) => (
              <tr onClick={() => store.companyStore.selectedIndex = index} key={index}
                  className={store.companyStore.selectedIndex === index ? 'active' : ''}>
                <td> {index + 1} </td>
                <td>{company.name}</td>
                <td className='actions'>
                  <Link to={'/companies/edit/' + company.id}
                        className={`btn btn-default ${this.props.location.pathname === '/companies/edit' ? 'active' : ''}`}>
                    <span className="icon icon-pencil"></span>
                  </Link>
                  <button onClick={()=>this.delete(company.id)} className="btn btn-default">
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
