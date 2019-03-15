import React, {Component} from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import Spinner from "../../components/Spinner";

import store from "../../stores";

import "./style.scss";

class Edit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    store.userStore.getUser(id)
    if (store.userStore.currentUser.role === 'superadmin') {
      store.companyStore.getAll()
    }
  }

  submit(e) {
    e.preventDefault();
    store.userStore.update();
  }

  render() {
    if (store.userStore.loading || store.companyStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      );
    }
    if (store.companyStore.companies.length === 0 && store.userStore.currentUser.role === 'superadmin') {
      return (
        <div className="window-content center">
          No Company found
        </div>
      );
    }
    return (
      <div className="window-content company">
        <form>
          {
            store.userStore.currentUser.role === 'superadmin' &&
            <div className="form-group">
              <label>
                Company name <span className="required">*</span>
              </label>
              <select
                value={store.userStore.user.company_id}
                onChange={e =>
                  store.userStore.user.company_id = e.target.value
                }
                className="form-control"
              >
                <option key={1} value={0}>Select company</option>
                {
                  store.companyStore.companies.map((company, index) => (
                    <option key={index + 1} value={company.id}>{company.name}</option>
                  ))
                }
              </select>
            </div>
          }
          <div className="form-group">
            <label>
              Username <span className="required">*</span>
            </label>
            <input
              value={store.userStore.user.username}
              onChange={e =>
                store.userStore.user.username = e.target.value
              }
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              value={store.userStore.user.email}
              onChange={e =>
                store.userStore.user.email = e.target.value
              }
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>
              Password <span className="required">*</span>
            </label>
            <input
              style={{borderColor: store.userStore.user.password === store.userStore.user.passwordVerification ? '#ddd' : 'red'}}
              value={store.userStore.user.password}
              onChange={e =>
                store.userStore.user.password = e.target.value
              }
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label>
              Password verification <span className="required">*</span>
            </label>
            <input
              style={{borderColor: store.userStore.user.password === store.userStore.user.passwordVerification ? '#ddd' : 'red'}}
              value={store.userStore.user.passwordVerification}
              onChange={e =>
                store.userStore.user.passwordVerification = e.target.value
              }
              type="password"
              className="form-control"
              placeholder="Password verification"
            />
          </div>

          {
            this.renderUserRole()
          }
          <div className="form-group">
            <label>
              Tel
            </label>
            <input
              value={store.userStore.user.tel}
              onChange={e =>
                store.userStore.user.tel = e.target.value
              }
              type="text"
              className="form-control"
              placeholder="Tel"
            />
          </div>

          <div className="form-group">
            <label>
              Job for the user
            </label>
            <input
              value={store.userStore.user.job}
              onChange={e =>
                store.userStore.user.job = e.target.value
              }
              type="text"
              className="form-control"
              placeholder="Job for the user"
            />
          </div>

          <div className="form-actions">
            <button
              onClick={this.submit}
              type="submit"
              className="btn btn-form btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  renderUserRole() {
    if (store.userStore.currentUser.role === 'admin' || store.userStore.currentUser.role === 'superadmin') {
      return (
        <div className="form-group">
          <label>
            Role of the user <span className="required">*</span>
          </label>
          <select
            value={store.userStore.user.role}
            onChange={e =>
              store.userStore.user.role = e.target.value
            }
            className="form-control"
          >
            <option value="">Select a Role</option>
            {store.userStore.currentUser.role === 'superadmin' && <option value="admin">Admin</option>}
            <option value="superuser">Super user</option>
            <option value="user">User</option>
          </select>
        </div>
      )
    }

  }
}

export default observer(Edit);
