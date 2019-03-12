import React, { Component } from 'react';
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import store from '../../stores'

import './style.scss'
import Spinner from '../../components/Spinner'

class Home extends Component{
  render(){
    return(
      <div className="window">
        <div className="window-content center">
          <Spinner></Spinner>
        </div>
      </div>
    )
  }
}

export default observer(Home);
