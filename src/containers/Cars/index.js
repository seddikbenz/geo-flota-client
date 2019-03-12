import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, Route } from "react-router-dom";

import store from "../../stores";
import Message from '../../components/Message'

import "./style.scss";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

class Cars extends Component {
  getTitle() {
    if (this.props.location.pathname.includes("/cars/add")) {
      return "Add car";
    }
    if (this.props.location.pathname.includes("/cars/edit")) {
      return "Edit car";
    }
    if (this.props.location.pathname.includes("/cars")) {
      return "Cars list";
    }
  }
  render() {
    return (
      <div className="window">
        <Message
          message={store.carStore.message}
          hideMessage={()=>store.carStore.hideMessage()}
        />
        <header className="toolbar toolbar-header">
          <h1 className="title"> {this.getTitle()} </h1>
          <div className="toolbar-actions">
            <div className="btn-group">
              <Link
                to={"/cars"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/cars" ? "active" : ""
                }`}
              >
                <span className="icon icon-list" />
              </Link>
              <Link
                to={"/cars/add"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/cars/add"
                    ? "active"
                    : ""
                }`}
              >
                <span className="icon icon-list-add" />
              </Link>
            </div>
          </div>
        </header>

        <Route path={`${this.props.match.path}`} component={All} exact />
        <Route path={`${this.props.match.path}/add`} component={Add} />
        <Route path={`${this.props.match.path}/edit/:id`} component={Edit} />
      </div>
    );
  }
}

export default observer(Cars);
