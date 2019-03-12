import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, Route } from "react-router-dom";

import store from "../../stores";
import Message from '../../components/Message'

import "./style.scss";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

class Trackers extends Component {
  getTitle() {
    if (this.props.location.pathname.includes("/trackers/add")) {
      return "Add tracker";
    }
    if (this.props.location.pathname.includes("/trackers/edit")) {
      return "Edit tracker";
    }
    if (this.props.location.pathname.includes("/trackers")) {
      return "Trackers list";
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
                to={"/trackers"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/trackers" ? "active" : ""
                }`}
              >
                <span className="icon icon-list" />
              </Link>
              <Link
                to={"/trackers/add"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/trackers/add"
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

export default observer(Trackers);
