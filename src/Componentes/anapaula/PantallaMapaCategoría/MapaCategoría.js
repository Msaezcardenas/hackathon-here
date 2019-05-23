import React, { Component } from 'react';
import { Map, TileLayer , Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
//import vectorMapa from './Asserts/pinMapa.png'
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
     entretenimiento: false,
     entretenimientoData: props.entretenimiento,
     bancoBCI: false,
     mapsCoordinates: [-33.4726900, -70.6472400]
  }
   
    this.BCI=this.BCI.bind(this)
 
}

componentDidMount(){ 
  let enjoyArr =[]

  const enjoyMap = Object.values(this.state.entretenimientoData).flat()
  enjoyMap.map((item)=>{
    return enjoyArr.push({
      name: item.nombre,
      categories: item.categoria,
      cordinates: [item.latitud, item.longitud],
    })   
  })

  this.setState({
    ...this.state,
    entretenimiento: enjoyArr
 })

 this.BCI()
 //this.BancoEstado()
}

BCI () {

  const oficinasBancoBCI= [
  'Avenida Américo Vespucio Sur 1816, Las Condes',
  'Av Apoquindo 5710, Las Condes',
  'El Golf 125, Las Condes',
  'Av Irarrázaval 5580, Ñuñoa',
  'Av Vitacura 4009, Vitacura',
  'Av 11 de Septiembre 2357, Providencia',
  'Andrés Bello 2461, Providencia',
  'Av Irarrázaval 2555, Ñuñoa',
  'Lo Fontecilla 441, Las Condes',
  'Avenida Plaza 2501, Las Condes',
  'Av del Parque 4023, Huechuraba',
  'Av Las Condes 11336, Las Condes',
  'Av Macul 2906, Macul',
  'Av Recoleta 286, Recoleta',
  'Miguel Cruchaga 920, Santiago',
  'Paseo Huérfanos 1134, Santiago',
  'Avenida Jose Alcalde Delano 10581, Lo Barnechea',
  'Av La Dehesa 1788, Lo Barnechea',
  'Av Vicuña Mackenna Oriente 7385, La Florida',
  'Gran Avenida José Miguel Carrera 4780, San Miguel',
  'Americo Vespucio Sur 2982, Conchali',
  'Club Hipico de Santiago 4676, Pedro Aguirre Cerda',
  'Gran Avenida José Miguel Carrera 8445, La Cisterna',
  'Camino lo Echevers 550, Quilicura',
  'Av. Los Pajaritos 2100, Maipú',
  'José Manuel Irarrázaval 178, Puente Alto',
  'Concha y Toro 231, Puente Alto',
  'Camino A Melipilla 6049, Cerrillos',
  'Covadonga 664, San Bernardo'
  ]
  
  const cordsBCI= oficinasBancoBCI.map((of)=>{
  return (
    fetch('https://geocoder.api.here.com/6.2/geocode.json'
     +'?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ'
     +'&searchtext=' + of
     )
     .then((data)=> data.json())
     .then((response)=> {
        //console.log(response)
        return {
        banco: "BCI",  
        lat : response.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
        long: response.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
        cordinates:[response.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,response.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude],
        address: response.Response.View[0].Result[0].Location.Address.Label,
              
     }})
     .catch((error)=>{
        return console.log(of)
     })
     )
  })
     return Promise.all(cordsBCI)
     .then( (data)=>{            
       this.setState({
         ...this.state,
         bancoBCI: data
       })
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
  
  const markerEnjoy = this.state.entretenimiento ? ( this.state.entretenimiento.map((item)=>{
    if( item.categories === "Centros Comerciales"){
      return (
        <Marker
        position={item.cordinates}
        ref={this.marker}
        key={item.name}
        icon={iconMap}>
        <Popup>{item.name}</Popup>
        </Marker>    
      )
    }if( item.categories === "Cine"){
        return (
          <Marker
          position={item.cordinates}
          ref={this.marker}
          key={item.name}
          icon={iconMap}>
          <Popup>{item.name}</Popup>
          </Marker>    
        )
    }if(item.categories === "Museos"){
      return (
        <Marker
        position={item.cordinates}
        ref={this.marker}
        key={item.name}
        icon={iconMap}>
        <Popup>{item.name}</Popup>
        </Marker>    
      )
    }else{
    return (
    <Marker
    position={item.cordinates}
    ref={this.marker}
    key={item.name}
    >
    <Popup>{item.name}</Popup>
    </Marker>    
  )}
  })
  ): null

  const markerBCI = this.state.bancoBCI ? ( this.state.bancoBCI.map((item)=>{
    console.log(item)
    return (
      <Marker
      position={item.cordinates}
      ref={this.marker}
      key={item.address}
      >
      <Popup>{item.banco}</Popup>
      </Marker>    
    )
   })): null
  
   return (

     <Map 
        center={this.state.mapsCoordinates} 
        zoom={this.state.options.zoom} 
        id="mapid" ref={e => { this.mapInstance = e }}>

       <TileLayer url={this.state.url}/>

      {markerEnjoy}
      {markerBCI}     

     </Map>

   );

 }

}

export default MapasCategoria;