import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, Route } from "react-router-dom";
import Spinner from '../../components/Spinner'

import store from "../../stores";

import "./style.scss";

class Edit extends Component {
  state = {
    company: {
      id: undefined,
      name: "no name",
      logo: ""
    }
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    store.companyStore.getCompany(id)
  }
  submit(e) {
    e.preventDefault();
    store.companyStore.update()
  }
  render() {
    if(store.companyStore.loading){
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    if (store.companyStore.message.type === 'error') {
      return <div className="window-content">not found</div>;
    }
    return (
      <div className="window-content company">
        <form>
          <div className="form-group">
            <label>
              Company name <span className="required">*</span>
            </label>
            <input
              onChange={e => store.companyStore.company.name = e.target.value}
              value={store.companyStore.company.name}
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

export default observer(Edit);
