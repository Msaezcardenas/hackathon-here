import React, { Component } from 'react';
import { BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import metro from './Json/metro.json'
import entretencion from './Json/entretencion.json'
import Home from './Componentes/molu/Home'
import Instructions from './Componentes/molu/Instructions'
import Filtro from './Componentes/anapaula/PantallaMapaCategoría/Filtro'
import MapaCategoria from './Componentes/anapaula/PantallaMapaCategoría/MapaCategoría'
import MapaMetro from './Componentes/anapaula/PantallaMapaCategoría/MapaMetro'
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">         
          <Switch>           
            <Route
              exact
              path="/"
              render={() => <Home/>} />
            <Route
              exact
              path="/Intructions"
              render={() => <Instructions/>}/> 
            <Route
              exact
              path="/Filtro"
              render={() => <Filtro/>}/> 
            <Route
              exact
              path="/Entretencion"
              render={() => <MapaCategoria data={entretencion}/>}/>  
            <Route
              exact
              path="/Metro"
              render={() => <MapaMetro data={metro}/>}/>                     
          <Redirect path="*" to="/"></Redirect>      
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;