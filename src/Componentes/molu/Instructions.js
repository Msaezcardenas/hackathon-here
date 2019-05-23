import React, { Component } from "react";
import "./Instructions.css";

class Instructions extends Component {

  render() {

    return (

      <div className="inst">

        <h1> ¿Qué permite City for all? </h1>
        <h3> City for all es una aplicación que te muestra espacios que cumplen con los requisitos de accesibilidad según tu ubicación eh intereses </h3>

        <div>
        <p> Encontrar los lugares de tu interés que cumplan las normativas de accesibilidad </p>
        </div>

        <div>
        <p> Previene antes de salir buscando lugares con accesibilidad cerca de tu destino  </p>
        </div>

       <div>
       <p> Puedes evaluar los lugares que visitaste según qué tan accesibles son </p>
       </div>

       <button> CONTINUAR </button>

      </div>
    );
  }
}

export default Instructions;