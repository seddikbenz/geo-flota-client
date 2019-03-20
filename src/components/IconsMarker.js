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
  iconUrl:       require('../img/marker-icon-green.png'),
  iconRetinaUrl: require('../img/marker-icon-2x-green.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});

const RedMarker = L.icon({
  iconUrl:       require('../img/marker-icon-red.png'),
  iconRetinaUrl: require('../img/marker-icon-2x-red.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});

const YellowMarker = L.icon({
  iconUrl:       require('../img/marker-icon-yellow.png'),
  iconRetinaUrl: require('../img/marker-icon-2x-yellow.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});

const GrayMarker = L.icon({
  iconUrl:       require('../img/marker-icon-gray.png'),
  iconRetinaUrl: require('../img/marker-icon-2x-gray.png'),
  shadowUrl:     require('../img/marker-shadow.png'),
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize:  [41, 41]
});

export {BlueMarker, GreenMarker, GrayMarker, YellowMarker, RedMarker};