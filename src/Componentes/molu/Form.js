import React, { Component } from "react";
import "./Form.css";

class Form extends Component {

  render() {

    return (

      <div className="form">

         
             <h1> Tu opinión ayudar hacer crecer City for all</h1>

           <form action="/action_page.php">


            <div>
             <label for="fname"> Nombre del lugar </label>
             <input type="text" id="fname" name="firstname" placeholder=" Escribe aquí" />
             </div>

             <div>
               <label for="categoria"> Categoría </label>
               <select id="categoria" name="categoria">
                <option value="entretenimiento"> Entretenimiento </option>
                <option value="bancos">  Bancos y Cajeros</option>
                <option value="metro"> Lineas de Metro </option>
             </select>
             </div>

             <div>
             <label for="lname"> Ubicación </label>
             <input type="text" id="lname" name="lastname" placeholder="Escribe aquí" />
             </div>

             <div>
             <textarea>Some text...</textarea>
             </div>

             <p> Selecciona las opciones de accesibilidad que cumple el lugar</p>


             <div className="select">
             <div className=" col-sm-12">
             <div className="radio">
              <label>
              <input type="radio" value="option1" checked={true} /> Option 1
              </label>
             </div>

              <div className="radio">
                <label>
                 <input type="radio" value="option2" />  Option 2
                </label>
              </div>

             <div className="radio">
              <label>
                 <input type="radio" value="option3" /> Option 3
             </label>
              </div>

              </div>
              </div>

           </form>
          </div>

    );
  }
}

export default Form;