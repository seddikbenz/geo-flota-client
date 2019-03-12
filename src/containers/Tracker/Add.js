import React, {Component} from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import Spinner from "../../components/Spinner";

import store from "../../stores";

import "./style.scss";

class Add extends Component {
  componentDidMount() {
    store.trackerStore.tracker = {
      id: 0,
      code: "",
      car_id: ""
    };
    store.companyStore.getAll()
  }

  submit(e) {
    e.preventDefault();
    store.trackerStore.create();
  }

  render() {
    if (store.trackerStore.loading || store.companyStore.loading) {
      return (
        <div className="window-content center">
          <Spinner/>
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
              value={store.companyStore.company.id}
              onChange={e => {
                store.companyStore.getCompanyCars(e.target.value);
                store.companyStore.company.id = e.target.value
              }}
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
              Car numberplate <span className="required">*</span>
            </label>
            <select
              value={store.trackerStore.tracker.car_id}
              onChange={e =>
                store.trackerStore.tracker.car_id = e.target.value
              }
              className="form-control"
            >
              <option key={1} value={0}>Select car</option>
              {
                store.carStore.cars.map((car, index) => (
                  <option key={index + 1} value={car.id}>{car.numberplate}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label>
              Code
            </label>
            <input
              value={store.trackerStore.tracker.code}
              onChange={e =>
                (store.trackerStore.tracker.code = e.target.value)
              }
              type="text"
              className="form-control"
              placeholder="Code"
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
