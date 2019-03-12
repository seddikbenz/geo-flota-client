import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

class Map extends Component{
  render(){
    return(
      <div>Maps</div>
    )
  }
}

export default observer(Map);
