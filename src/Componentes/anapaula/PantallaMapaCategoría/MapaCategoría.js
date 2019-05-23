import React, { Component } from 'react';
import { Map, TileLayer , Marker, Popup} from 'react-leaflet';
import {iconMall,iconMuseo,iconCine,iconBanco} from './vectores'
//import vectorMapa from './Asserts/pinMapa.png'
import './MapaCategoría.css'
import Instructions from '../../molu/Instructions';
import Form from '../../molu/Form';

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
     bancoEstado: false,
     mapsCoordinates: [-33.4726900, -70.6472400]
  }
   
    this.BCI=this.BCI.bind(this)
    this.BancoEstado=this.BancoEstado.bind(this)
 
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
 this.BancoEstado()
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

  BancoEstado () {

    const oficinasBancoEstado= [
      "21 De Mayo 4317,	Penaflor",
      "Ambrosio O'higgins 1665,	Curacavi",
      "Arturo Prat 200,	Tiltil",
      "Arturo Prat 621,	San Bernardo",
      "Avenida 10 De Julio 1113,	Santiago",
      "Avenida 5 De Abril 180,	Maipu",
      "Avenida Alfredo Silva 1401,	Maipu",
      "Avenida Americo Vespucio 399,	Maipu",
      "Avenida Americo Vespucio 2680,	Conchali",
      "Avenida Americo Vespucio 1501,	Cerrillos",
      "Avenida Andres Bello 2825,	Las Condes",
      "Avenida Apoquindo 4660,	Las Condes",
      "Avenida Apoquindo 6095,	Las Condes",
      "Avenida Bernardo O'higgins 119,	Quilicura",
      "Avenida Bernardo O'higgins 5199,	Estacion Central",
      "Avenida Bernardo O'higgins 3401,	Estacion Central",
      "Avenida Brasil 70,	Santiago",
      "Avenida Camilo Henr¡quez 3692,	Puente Alto",
      "Avenida Camilo Henr¡quez 3296,	Puente Alto",
      "Avenida Central 6298,	Pedro Aguirre Cerda",
      "Avenida Concepci¢n 170	,Colina",
     " Avenida Concha Y Toro 1149,	Puente Alto",
      "Avenida Cristobal Col¢n 7306	,Las Condes",
      "Avenida Del Libertador Bernardo O?higgins 2332,	Santiago",
      "Avenida Del Libertador Bernardo O'higgins 3890	,Estacion Central",
      "Avenida Del Libertador Bernardo O'higgins 1111,	Santiago",
     " Avenida Del Libertador Bernardo O'higgins 133,	Santiago",
      "Avenida Del Libertador. Bernardo O'higgins 2690,	Santiago",
      "Avenida Del Libertador. Bernardo O'higgins 4781,	Estacion Central",
      "Avenida Domingo Santa María 4054,	Renca",
      "Avenida Eduardo Frei Montalva 2250	,Renca",
      "Avenida El Salto 2833,	Recoleta",
      "Avenida Fermín Vivaceta 957,	Independencia",
      "Avenida Francisco Bilbao 5439	,La Reina",
      " Avenida Gral. Baquedano 502,Paine",
      "Avenida Grecia 7460,	Penalolen",
      "Avenida Grecia 5530,	Penalolen",
      "Avenida Independencia 2181	,Independencia",
      "Avenida Irarrazaval 2621	,Nunoa",
      "Avenida Irarrazaval 5544	,Nunoa",
      "Avenida Irarrazaval 3655	,Nunoa",
      "Avenida Jose Miguel Carrera 9632	,El Bosque",
      "Avenida Jose Miguel Carrera 7893,	La Cisterna",
      "Avenida Jose Miguel Carrera 5110	,San Miguel",
      "Avenida La Dehesa 1201	,Lo Barnechea",
      "Avenida La Florida 9089,	La Florida",
      "Avenida La Florida 10301	,La Florida",
      "Avenida La Florida 9660,	La Florida",
      "Avenida Larraín 9100,	Santiago",
      "Avenida Larra¡n 5961,	La Reina",
      "Avenida Las Condes 9170	,Las Condes",
      "Avenida Las Condes 11550	,Vitacura",
      "Avenida Libertador Bernardo O?higgins 620,	Santiago",
      "Avenida Lo Barnechea 800,	Lo Barnechea",
      "Avenida Los Pajaritos, 2042	Maipu",
      "Avenida Macul 3389,	Macul",
      "Avenida Matta 950,	Santiago",
      "Avenida Nueva Providencia 2064,	Providencia",
      "Avenida Ortuzar 1068,	Melipilla",
      "Avenida Padre Alberto Hurtado 60,	Estacion Central",
      "Avenida Pedro Aguirre Cerda 5933,	Cerrillos",
      "Avenida Presidente Jorge Alessandri 20040,	San Bernardo",
      "Avenida Principe De Gales 7027,La Reina",
      "Avenida Providencia 2690,	Providencia",
      "Avenida Providencia 1710	,Providencia",
      "Avenida Recoleta 51,	Recoleta",
      "Avenida Recoleta 2248,	Recoleta",
      "Avenida Ricardo Lyon 32,	Providencia",
      "Avenida Salvador 297,	Providencia",
      "Avenida San Pablo 8450,	Pudahuel",
      "Avenida San Pablo 3297,	Santiago",
      "Avenida San Pablo 8121,	Lo Prado",
      "Avenida Santa Rosa 7959,	San Ramon",
      "Avenida Santa Rosa 12960,	La Pintana",
      "Avenida Santelices 73,	Isla De Maipo",
      "Avenida Uno Sur 56,	San Jose De Maipo",
      "Avenida Vicente Valdes 85,	La Florida",
      "Avenida Vicuña Mackena 4102,	Macul",
      "Avenida Vicuña Mackenna 690,	Nunoa",
      "Avenida Vicuña Mackenna 1326,	Nunoa",
      "Avenida Vicuña Mackenna 3311,	San Joaquin",
      "Avenida Vicuña Mackenna 7357,	La Florida",
      "Avenida Vicuña Mackenna 9257,	La Florida",
      "Avenida Vicuña Mackenna Oriente 7110, La Florida",
      "Avenida Viel 1965,	Santiago",
      "Avenida Vitacura 6277,	Vitacura",
      "Avenida Vitacura 4200,	Vitacura",
      "Bandera 66,	Santiago",
      "Bandera 861,	Santiago",
      "Cerrillos 4030,	Pedro Aguirre Cerda",
      "Concha Y Toro 96,	Puente Alto",
      "Estado 348,	Santiago",
      "Eyzaguirre 603,	San Bernardo",
      "General Baquedano 791,	Lampa",
      "Gran Avenida Jose Miguel Carrera 13910,	San Bernardo",
      "Huérfanos 1169,	Santiago",
      "Huerfanos 120,	Santiago",
      "Jose Joaquin Perez 6658,	Cerro Navia",
      "Jose Joaquin Perez 7325,	Cerro Navia",
      "Jose Joaquin Perez 4242,	Quinta Normal",
      "Jose Leyan 853,	Talagante",
      "Manuel Rodr¡guez 63,	Puente Alto",
      "Moneda 1000,	Santiago",
      "Moneda 860,	Santiago",
      "Moneda 1138,	Santiago",
      "Monjitas 837,	Santiago",
      "Pedro De Valdivia 3377,	Nuñoa",      
      "Recoleta 5610,	Huechuraba",
      "San Diego 2230,	Santiago",
      "San Luis De Macul 5350,	Penalolen",
     " San Pablo 5877,	Lo Prado",
      "Santa Rosa 8846,	La Granja",
      "Santo Domingo 930,	Santiago",
      "Santo Domingo 1566,	Santiago"      
    ]
    
    const cordsBE= oficinasBancoEstado.map((of)=>{
    return (
      fetch('https://geocoder.api.here.com/6.2/geocode.json'
       +'?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ'
       +'&searchtext=' + of
       )
       .then((data)=> data.json())
       .then((response)=> {
          //console.log(response)
          return {
          banco: "Banco Estado",  
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
       return Promise.all(cordsBE)
       .then( (data)=>{            
         this.setState({
           ...this.state,
           bancoEstado: data
         })
         console.log(data)
        })
    
    }



render() { 
  
  const markerEnjoy = this.state.entretenimiento ? ( this.state.entretenimiento.map((item)=>{
    if( item.categories === "Centros Comerciales"){
      return (
        <Marker
        position={item.cordinates}
        ref={this.marker}
        key={item.name}
        icon={iconMall}>
        <Popup>{item.name}</Popup>
        </Marker>    
      )
    }if( item.categories === "Cine"){
        return (
          <Marker
          position={item.cordinates}
          ref={this.marker}
          key={item.name}
          icon={iconCine}>
          <Popup>{item.name}</Popup>
          </Marker>    
        )
    }if(item.categories === "Museos"){
      return (
        <Marker
        position={item.cordinates}
        ref={this.marker}
        key={item.name}
        icon={iconMuseo}>
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
   return (
      <Marker
      position={item.cordinates}
      ref={this.marker}
      key={item.address}
      icon={iconBanco}
      >
      <Popup>{item.banco}</Popup>
      </Marker>    
    )
   })): null

   const markerBEstado = this.state.bancoEstado ? ( this.state.bancoEstado.map((item)=>{
    return (
       <Marker
       position={item.cordinates}
       ref={this.marker}
       key={item.address}
       icon={iconBanco}
       >
       <Popup>{item.banco}</Popup>
       </Marker>    
     )
    })): null
  
   return (
     <div>
       <Instructions/>
       <Form/>
     <Map 
        center={this.state.mapsCoordinates} 
        zoom={this.state.options.zoom} 
        id="mapid" ref={e => { this.mapInstance = e }}>

       <TileLayer url={this.state.url}/>

      {markerEnjoy}
      {markerBCI} 
      {markerBEstado}    

     </Map>
     </div>
   );

 }

}

export default MapasCategoria;