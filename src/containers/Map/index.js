import React, { Component } from 'react';
import {observer} from 'mobx-react'
import  { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'



import store from '../../stores'

import './style.scss'

const osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const googleSatelite = 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'
const googleRoad = 'http://mt1.google.com/vt/lyrs=m@113&hl=en&&x={x}&y={y}&z={z}'
class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap style={{width: '100%', height: '100%'}} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">google maps</a> contributors'
          url={googleRoad}
        />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}
export default observer(Map);