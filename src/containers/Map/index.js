import React, { Component } from 'react';
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import  {
  Map as LeafletMap,
  LayersControl,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

import Spinner from '../../components/Spinner'
import {BlueMarker, GreenMarker, RedMarker, YellowMarker, GrayMarker} from '../../components/IconsMarker'


import store from '../../stores'

import './style.scss'

import Cars from './Cars'
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
      zoom: 11
    }
    this.updateCarsLastPositionIntervalID = 0;
  }
  componentDidMount(){
    store.mapStore.getCarsLastPosition()
    this.updateCarsLastPositionIntervalID = setInterval(this.updateCarsLastPosition, 60000)
  }

  componentWillUnmount(){
    clearInterval(this.updateCarsLastPositionIntervalID)
  }

  zoomOut(){
    const map = store.mapStore.mapRef.current;
    if (map != null) {
      map.leafletElement.zoomOut();
    }
  };

  updateCarsLastPosition(){
    store.mapStore.updateCarsLastPosition()
  }
  renderIconMarker(car){
    if(store.mapStore.selectedIndex === car.id){
      return GreenMarker
    }
    if(car.state === "on" && car.speed !== "0" ){
      return GreenMarker
    }
    return BlueMarker
  }
  render() {
    if(store.mapStore.loading){
      return (
        <div className="window">
          <div className="window-content center">
            <Spinner/>
          </div>
        </div>
      )
    }
    const position = [this.state.lat, this.state.lng];
    return (
      <div className='map' >
        <LeafletMap
          animate={true}
          zoomControl={false}
          onContextmenu={() => this.zoomOut()}
          ref={store.mapStore.mapRef}
          center={store.mapStore.mapCenter}
          zoom={store.mapStore.mapZoom}
          onClick={() => store.mapStore.showListCars = false}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org">OpenStreetMap</a>'
                url={osm}
              />
            </BaseLayer>
            <BaseLayer name="GoogleMap.Road">
              <TileLayer
                attribution='&copy; <a href="http://maps.google.com">google maps road</a>'
                url={googleRoad}
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
                  <Marker
                    onClick={()=>store.mapStore.selectedIndex = car.id}
                    key={index}
                    position={{
                      lat: car.positions[0].lat,
                      lng: car.positions[0].lng,
                    }}
                    icon={this.renderIconMarker(car)}
                  >
                    <Popup>
                      <b>Numberplate:</b> {car.numberplate}
                      <br/> <b>Code:</b> {car.code}
                      <br/> <b>speed:</b> {car.speed ? car.speed : 0 }  km/h
                      <b>, State:</b> {car.state ? car.state : 'off' }
                      <br/> <b>Lat:</b> {car.positions[0].lat}
                      <br/> <b>Lng:</b> {car.positions[0].lng}
                    </Popup>
                  </Marker>
                )
              }
            })
          }
        </LeafletMap>
        <Cars />
      </div>
    );
  }
}
export default observer(Map);