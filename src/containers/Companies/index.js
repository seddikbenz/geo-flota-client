import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, Route } from "react-router-dom";

import store from "../../stores";

import "./style.scss";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

class Companies extends Component {
  getTitle() {
    if (this.props.location.pathname.includes("/companies/add")) {
      return "Add company";
    }
    if (this.props.location.pathname.includes("/companies/edit")) {
      return "Edit company";
    }
    if (this.props.location.pathname.includes("/companies")) {
      return "Companies list";
    }
  }
  render() {
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title"> {this.getTitle()} </h1>
          <div className="toolbar-actions">
            <div className="btn-group">
              <Link
                to={"/companies"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/companies" ? "active" : ""
                }`}
              >
                <span className="icon icon-list" />
              </Link>
              <Link
                to={"/companies/add"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/companies/add"
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

export default observer(Companies);
