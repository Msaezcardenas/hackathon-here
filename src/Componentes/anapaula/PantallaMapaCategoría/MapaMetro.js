import React, { Component } from 'react';
import { Map, TileLayer , Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

import './MapaCategoría.css'

class MapasCategoria extends Component {
constructor(props) {
   super(props);
   this.marker = React.createRef();
   this.state = {
    options: {
        zoom: 12,
        type: 'distance',
        range: 10000,
        mode: 'car',
        traffic: 'enabled',
        style: 'normal.day'
     },
     url: "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ&ppi=320",
     metro: false,
     metroData: props.data,
     mapsCoordinates: [-33.4726900, -70.6472400]
  }
   
 
}

componentDidMount(){

  let placesArr = [] 

  const placesMap = Object.values(this.state.metroData).flat(1)
  placesMap.map((item)=> {
    return placesArr.push({
      name: item.estacion,
      cordinates:[item.latitud,item.longitud]
    })
  }) 

  this.setState({
    ...this.state,
    metro: placesArr,
   
 })
}




render() {

  const iconMap = new L.Icon({
    iconUrl: require('./Asserts/pinMapa.png'),
    iconSize:     [40, 42], 
    shadowSize:   [50, 64],
    iconAnchor:   [20, 40],
    popupAnchor:  [0, -40]
  
  })
  
  const marker = this.state.metro ? ( this.state.metro.map((item)=>{
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMap}>
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )
  })): null

 
  
  
   return (
     <Map 
        center={this.state.mapsCoordinates} 
        zoom={this.state.options.zoom} 
        id="mapid" ref={e => { this.mapInstance = e }}>

       <TileLayer url={this.state.url}/>
      
      {marker}     

     </Map>

   );

 }

}

export default MapasCategoria;