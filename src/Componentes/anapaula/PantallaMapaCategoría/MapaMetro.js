import React, { Component } from 'react';
import { Map, TileLayer , Marker, Popup} from 'react-leaflet';
import {iconMetroOkL1, iconMetroOkL2, iconMetroOkL3, iconMetroOkL4, iconMetroOkL4a, iconMetroOkL5,iconMetroOkL6} from './vectores'
import {iconMetroMaloL1, iconMetroMaloL3, iconMetroMaloL4, iconMetroMaloL4a,iconMetroMaloL6,iconMetroMaloL2, iconMetroMaloL5} from './vectores'
import './MapaCategoría.css'

class MapasMetro extends Component {
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
  console.log(props.data)  
 
}

componentDidMount(){

  let placesArr = [] 

  const placesMap = Object.values(this.state.metroData).flat(1)
  placesMap.map((item)=> {
    return placesArr.push({
      name: item.estacion,
      cordinates:[item.latitud,item.longitud],
      nivel: item.acceso,
      linea: item.linea
    })
  }) 

  this.setState({
    ...this.state,
    metro: placesArr,
   
 })
}

render() {

  
  const marker = this.state.metro ? ( this.state.metro.map((item)=>{
    
    if( item.linea ==="L1" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL1}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )} if( item.linea ==="L1" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL1}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L2" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL2}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L2" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL2}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L3" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL3}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L3" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL3}

    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L4" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL4}
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L4" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL4}
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L4A" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL4a}
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L4A" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL4a}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L5" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL5}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L5" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL5}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L6" && item.nivel ==="Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroOkL6}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  if( item.linea ==="L6" && item.nivel ==="SIN Acceso Preferencial"){
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    icon={iconMetroMaloL6}
    >
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
    return false
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

export default MapasMetro;