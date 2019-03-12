import React, { Component } from 'react';
import {observer} from 'mobx-react'
import './style.scss'
import store from "../../stores";

class Header extends Component{
  render(){
    return(
      <footer className="toolbar toolbar-footer">
        <h1 className="title" style={{fontWeight: 'bold'}}>Geo-Flota {store.commonStore.version}</h1>
      </footer>
    )
  }
}

export default observer(Header);
