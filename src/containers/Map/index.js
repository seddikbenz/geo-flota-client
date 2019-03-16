import React, { Component } from 'react';
import {observer} from 'mobx-react'
import  {
  Map as LeafletMap,
  LayersControl,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

import Spinner from '../../components/Spinner'

import store from '../../stores'

import './style.scss'

const osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const googleSatelite = 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga'
const googleRoad = 'http://mt1.google.com/vt/lyrs=m@113&hl=en&&x={x}&y={y}&z={z}'

const { BaseLayer, Overlay } = LayersControl
class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      lat:36.08,
      lng:4.76,
      zoom: 13
    }
  }
  componentDidMount(){
    store.mapStore.getCarsLastPosition()
  }

  render() {
    if(store.mapStore.loading){
      return (
        <div className="window-content center">
          <Spinner/>
        </div>
      )
    }
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap style={{width: '100%', height: '100%'}} center={position} zoom={6}>
        <LayersControl position="topright">
          <BaseLayer name="GoogleMap.Road">
            <TileLayer
              attribution='&copy; <a href="http://maps.google.com">google maps road</a>'
              url={googleRoad}
            />
          </BaseLayer>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org">OpenStreetMap</a>'
              url={osm}
            />
          </BaseLayer>
          <BaseLayer name="GoogleMap.Satelite">
            <TileLayer
              attribution='&copy; <a href="http://maps.google.com">google maps satelite</a>'
              url={googleSatelite}
            />
          </BaseLayer>
        </LayersControl>
        {
          store.mapStore.cars.map((car, index) => {
            if(car.positions.length !== 0){
              return(
                <Marker key={index} position={{
                  lat: car.positions[0].lat,
                  lng: car.positions[0].lng,
                  zoom: 13
                }}>
                  <Popup>
                    <b>Numberplate</b> {car.numberplate}
                    <br/> <b>Code</b> {car.code}
                    <br/> <b>Lat:</b> {car.positions[0].lat}
                    <br/> <b>Lng:</b> {car.positions[0].lng}
                  </Popup>
                </Marker>
              )
            }
          })
        }
      </LeafletMap>
    );
  }
}
export default observer(Map);