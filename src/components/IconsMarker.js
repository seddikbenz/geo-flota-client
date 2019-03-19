import L from 'leaflet';



const BlueMarker = L.icon({
  iconUrl:       require('../img/marker-icon.png'),
  iconRetinaUrl: require('../img/marker-icon-2x.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});

const GreenMarker = L.icon({
  iconUrl:       require('../img/marker-icon-active.png'),
  iconRetinaUrl: require('../img/marker-icon-2x-active.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});


export {BlueMarker, GreenMarker};