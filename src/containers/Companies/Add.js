import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";

import store from "../../stores";

import "./style.scss";

class Add extends Component {
  componentDidMount() {
    store.companyStore.company = {
      id: 0,
      name: "",
      logo: ""
    };
  }
  submit(e) {
    e.preventDefault();
    store.companyStore.create();
  }
  render() {
    if (store.companyStore.loading) {
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
            <input
              value={store.companyStore.company.name}
              onChange={e =>
                (store.companyStore.company.name = e.target.value)
              }
              type="text"
              className="form-control"
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label>Company logo image 255 * 255</label>
            <input
              type="file"
              className="form-control"
              placeholder="Company name"
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
