import React, { Component } from "react";
import { Form, Container, Row} from 'react-bootstrap';
import "./Form.css";

class Formulario extends Component {

    render() {
  
      return (
         <Container>
        <Row className="form">
  
        <div className="formStyle">
        <h4> Tu opinión ayuda a hacer crecer City for all</h4>
        <Form>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label> Nombre del Lugar </Form.Label>
          <Form.Control placeholder="Escribe aquí" />
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label> Categoría </Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label> Ubicación </Form.Label>
          <Form.Control  placeholder="Escribe aquí" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows="2" />
        </Form.Group>

        <p>  Selecciona las opciones de accesibilidad que cumple  el lugar</p>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Baños con accesibilidad para silla de ruedas" />
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Rampas aptas para silla de ruedas" />
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Estacionamientos reservados" />
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Elevadores" />
          </Form.Group>

      </Form>
      </div>
      
      <div className="btn">
      <div> <button> Cancelar </button></div>
      <div>  <button className="btnSave"> Guardar </button></div>
      </div>


      </Row>
      </Container>
      );
    }
  }
  
  export default Formulario;

































// class Form extends Component {

//   render() {

//     return (

//       <div className="form">

//              <h1> Tu opinión ayudar hacer crecer City for all</h1>

//            <form >

//             <div className="boxForm">

//             <div className="algo">
//              <label for="fname"> Nombre del lugar </label>
//              <input type="text" id="fname" name="firstname" placeholder=" Escribe aquí" />
//              </div>

//              <div>
//                <label for="categoria"> Categoría </label>
//                <select id="categoria" name="categoria">
//                 <option value="entretenimiento"> Entretenimiento </option>
//                 <option value="bancos">  Bancos y Cajeros</option>
//                 <option value="metro"> Lineas de Metro </option>
//              </select>
//              </div>

//              <div>
//              <label for="lname"> Ubicación </label>
//              <input type="text" id="lname" name="lastname" placeholder="Escribe aquí" />
//              </div>

//              <div>
//              <p> Descripción</p>    
//              <textarea>Some text...</textarea>
//              </div>

//              </div>

//              <p> Selecciona las opciones de accesibilidad que cumple el lugar</p>


//              <div className="select">
//              <div className=" col-sm-12">
//              <div className="radio">
//               <label>
//               <input type="radio" value="option1" checked={true} /> Option 1
//               </label>
//              </div>

//               <div className="radio">
//                 <label>
//                  <input type="radio" value="option2" />  Option 2
//                 </label>
//               </div>

//              <div className="radio">
//               <label>
//                  <input type="radio" value="option3" /> Option 3
//              </label>
//               </div>

//               </div>
//               </div>

//            </form>
//           </div>

//     );
//   }
// }

// export default Form;