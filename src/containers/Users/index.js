import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, Route } from "react-router-dom";

import store from "../../stores";
import Message from '../../components/Message'

import "./style.scss";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

class Users extends Component {
  getTitle() {
    if (this.props.location.pathname.includes("/users/add")) {
      return "Add user";
    }
    if (this.props.location.pathname.includes("/users/edit")) {
      return "Edit user";
    }
    if (this.props.location.pathname.includes("/users")) {
      return "Users list";
    }
  }
  render() {
    return (
      <div className="window">
        <Message
          message={store.userStore.message}
          hideMessage={()=>store.userStore.hideMessage()}
        />
        <header className="toolbar toolbar-header">
          <h1 className="title"> {this.getTitle()} </h1>
          <div className="toolbar-actions">
            <div className="btn-group">
              <Link
                to={"/users"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/users" ? "active" : ""
                }`}
              >
                <span className="icon icon-list" />
              </Link>
              <Link
                to={"/users/add"}
                className={`btn btn-default ${
                  this.props.location.pathname === "/users/add"
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

export default observer(Users);
