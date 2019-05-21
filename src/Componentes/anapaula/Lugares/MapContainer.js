import React from 'react';
import { Map, TileLayer, Marker,Popup } from 'react-leaflet';
import { hereTileUrl, BCI } from './here';


export class MapContainer extends React.Component {

   constructor(props) {
      super(props);
      this.marker = React.createRef();
      this.state={
         coordinates: [-33.4168,-70.6058],
         places: false,

      }
      
   }
   componentDidMount = () => {

      BCI()

      fetch('https://places.demo.api.here.com/places/v1/discover/search?at=-33.454103%2C-70.6058&q=bancoestado&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg')
        .then(data => data.json())
        .then(data=> {
           let cinemaPosition= [];
            //console.log(data.results.items)
            data.results.items.forEach(element => {
               cinemaPosition.push({
                  name: element.title,
                  direction: element.vicinity,
                  coordinates: element.position
               })
            });   
            this.setState({
               ...this.state,
               places: cinemaPosition
            },() =>{
               //console.log(this.state.places)
            })
        })
   }
   handleDrag = () => {
      const coordinates = this.marker.current.leafletElement.getLatLng();
      this.props.handleDrag(this.props.index, [coordinates.lat, coordinates.lng]);
   }

   render() {

      const marker = this.state.places ? ( this.state.places.map((item)=>{
         return (
         <Marker
         position={item.coordinates}
         draggable={true}
         //onDragEnd={this.handleDrag}
         ref={this.marker}
         key={item.direction}
         >
         <Popup>{item.name}</Popup>
         </Marker>
         
      )})

       
   ) : null

      return (
            <Map
               center={this.props.center}
               zoom={parseInt(this.props.options.zoom)}
               zoomControl={false}
               attributionControl={this.props.index === 8}
            >
               <TileLayer
                  url={hereTileUrl(this.props.style)}
               />
               
              {marker}
              
            </Map>
      )
   }
}
