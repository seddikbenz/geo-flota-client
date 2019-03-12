import React, { Component } from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";
// import MobxDevTools from 'mobx-react-devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Sidebar from "./containers/Sidebar";
import Home from "./containers/Home";
import Map from "./containers/Map";
import Reports from "./containers/Reports";
import Companies from "./containers/Companies";
import Users from "./containers/Users";
import Tracker from "./containers/Tracker";
import Cars from "./containers/Cars";
import Settings from "./containers/Settings";
import Notifications from "./containers/Notifications";
import Login from "./containers/Login";
import Me from "./containers/Me";

import store from "./stores";

import "./app.scss";

import Spinner from "./components/Spinner";

class App extends Component {
  componentWillMount() {
    store.userStore.me();
  }

  render() {
    if (store.userStore.loadingUser) {
      return (
        <div className="window">
          <div className="window-content center">
            <Spinner />
          </div>
        </div>
      );
    }
    if (store.userStore.currentUser.username === '') {
      return <Login />;
    }
    return (
      <BrowserRouter>
        <div className="window">
          <Header />
          <div className="window-content">
            <div className="pane-group">
              <Sidebar />
              <div className="pane">
                <Route path={"/"} component={Home} exact />
                <Route path={"/map"} component={Map} />
                <Route path={"/reports"} component={Reports} />
                <Route path={"/cars"} component={Cars} />
                <Route path={"/settings"} component={Settings} />
                <Route path={"/notifications"} component={Notifications} />
                <Route path={"/me"} component={Me} />
                {store.userStore.currentUser.role !== 'user' && <Route path={"/users"} component={Users} />}
                {store.userStore.currentUser.role === 'superadmin' && <Route path={"/companies"} component={Companies} />}
                {store.userStore.currentUser.role === 'superadmin' && <Route path={"/trackers"} component={Tracker} />}
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default observer(App);
