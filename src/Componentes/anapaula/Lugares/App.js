import React from 'react';
import './App.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl} from './here';

class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

         //Coordinates are in format [Latitude, Longitude]
         maps: [
            {
               name: 'Santiago, Chile',
               coordinates: [-33.4726900, -70.6472400],
               polygon: []
            }
         ],
         options: {
            zoom: 12,
            type: 'distance',
            range: 10000,
            mode: 'car',
            traffic: 'enabled',
            style: 'normal.day'
         },
         places: []
      }
   }

   updateIsolines = () => {
      const promises = this.state.maps.map(m => 
         fetch(hereIsolineUrl(m.coordinates, this.state.options)).then(x => x.json()));
      Promise.all(promises).then(res => {

         const copy = this.state.maps.map((x, i) => {
            if (res[i].response.isoline[0].component.length > 0) {
               x.polygon = res[i].response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
            } else {
               x.polygon = [];
            }
            return x;
         });

         this.setState({
            maps: copy
         });
      })

   }

   componentDidMount = () => {
      this.updateIsolines();
   }

   handleDrag = (index, coordinates) => {
      fetch(hereIsolineUrl(coordinates, this.state.options))
      .then(res => res.json())
      .then(res => {

         const copy = this.state.maps.slice();
         if (res.hasOwnProperty('response')) {
            copy[index].polygon = res.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
         } else {
            copy[index].polygon = [];
         }
         copy[index].coordinates = coordinates;
         this.setState({
            maps: copy
         });
      });
   }

 

   render() {

      return (
         <div className="app">           
            <div className="map-grid">
               {this.state.maps.map((map, index) =>
                  <MapContainer
                     key={index}
                     index={index}
                     center={map.coordinates}
                     options={this.state.options}
                     handleDrag={this.handleDrag}
                     polygon={map.polygon}
                     style={this.state.options.style}
                  />
               )}

            </div>
         </div>
      );
   }
}

export default App;
