import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'

class Repports extends Component{
  render(){
    return(
      <div>Repports</div>
    )
  }
}

export default observer(Repports);
