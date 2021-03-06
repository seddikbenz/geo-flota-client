import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";

import store from "../../stores";

import "./style.scss";

class Add extends Component {
  componentDidMount() {
    store.carStore.car = {
      id: 0,
      numberplate: "",
      code: "",
      gps_code: "",
      company_id: ""
    }
    if (store.userStore.currentUser.role === 'superadmin') {
      store.companyStore.getAll()
    }
  }
  submit(e) {
    e.preventDefault();
    store.carStore.create();
  }
  render() {
    if (store.carStore.loading || store.companyStore.loading) {
      return (
        <div className="window-content center">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="window-content company">
        <form>
          <div className="form-group">
            <label>
              Company name <span className="required">*</span>
            </label>
            <select
              value={store.carStore.car.company_id}
              onChange={e =>
                store.carStore.car.company_id = e.target.value
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

          <div className="form-group">
            <label>
              Numberplate <span className="required">*</span>
            </label>
            <input
              value={store.carStore.car.numberplate}
              onChange={e =>
                (store.carStore.car.numberplate = e.target.value)
              }
              type="text"
              className="form-control"
              placeholder="Numberplate"
            />
          </div>

          <div className="form-group">
            <label>
              Code
            </label>
            <input
              value={store.carStore.car.code}
              onChange={e =>
                (store.carStore.car.code = e.target.value)
              }
              type="text"
              className="form-control"
              placeholder="Code"
            />
          </div>

          <div className="form-group">
            <label>
              GPS code
            </label>
            <input
              value={store.carStore.car.gps_code}
              onChange={e =>
                (store.carStore.car.gps_code = e.target.value)
              }
              type="text"
              className="form-control"
              placeholder="GPS code"
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
}

export default observer(Add);
