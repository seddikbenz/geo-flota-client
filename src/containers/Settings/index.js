import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

class Settings extends Component{
  render(){
    return(
      <div>Settings</div>
    )
  }
}

export default observer(Settings);
