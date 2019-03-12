import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

class Notifications extends Component{
  render(){
    return(
      <div>Notifications</div>
    )
  }
}

export default observer(Notifications);
