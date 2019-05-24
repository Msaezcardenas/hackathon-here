import React, { Component } from "react";
import { Form, Container, Row} from 'react-bootstrap';
import firebase from '../../Firebase';
import "./Form.css";

class Formulario extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('boards');
        this.state = {
          lugar: '',
          description: '',
          ubicacion: '',
          accesibilidad:{
              baños:'',
              elevadores: '',
              estacionamiento: '',
              rampa:'',
          },
         categoria: '',
        };
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      onChangeCategories=(e) => {
          this.setState({
              ...this.state,
              categoria: e.target.value
          })
      }

      onChangeCheckBaño = (e) => {

          this.setState ({
              ...this.state,
              accesibilidad:{
                ...this.state.accesibilidad,
                  baño: e.target.value,
              }
          })
      }
    
      onChangeCheckRampa = (e) => {

        this.setState ({
            ...this.state,
            accesibilidad:{
                ...this.state.accesibilidad,
                rampa: e.target.value,
            }
        })
    }

    onChangeCheckEstacionamiento = (e) => {

        this.setState ({
            ...this.state,
            accesibilidad:{
                ...this.state.accesibilidad,
                estacionamiento: e.target.value,
            }
        })
    }

    onChangeCheckElevador = (e) => {

        this.setState ({
            ...this.state,
            accesibilidad:{
                ...this.state.accesibilidad,
                elevadores: e.target.value,
            }
        })
    }
      onSubmit = (e) => {
        e.preventDefault();
        const { lugar, ubicacion, description, accesibilidad, categoria  } = this.state;
    
        this.ref.add({
          ubicacion,
          description,
          lugar,
          accesibilidad,
          categoria,
        }).then((docRef) => {
          this.setState({
            description: '',
            ubicacion: '',
            lugar: '',
            accesibilidad:{},
            categoria:'',
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }

    render() {
      const { ubicacion, description, lugar, accesibilidad, entretenimiento,bancos, metro, salud,comida, tiendas} = this.state;
      return (
         <Container>
        <Row className="form">
  
        <div className="formStyle">
        <h4> Tu opinión ayuda a hacer crecer City for all</h4>

        <Form onSubmit={this.onSubmit} > 

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label> Nombre del Lugar </Form.Label>
          <input type="text" class="form-control" name="lugar" value={lugar} onChange={this.onChange} placeholder="Escribe aquí" />
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label> Categoría </Form.Label>
          <Form.Control as="select" onChange={this.onChangeCategories}>
            <option value={entretenimiento}     > Entretenimiento </option>
            <option value={bancos}    onChange={this.onChange} > Bancos y Cajeros</option>
            <option value={metro}    onChange={this.onChange} > Líneas de metro</option>
            <option value={salud}    onChange={this.onChange} > Centros de Salud</option>
            <option value={comida}    onChange={this.onChange} > Comida </option>
            <option value={tiendas}    onChange={this.onChange} > Tiendas </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label> Ubicación </Form.Label>
          <input type="text" class="form-control" name="ubicacion" value={ubicacion} onChange={this.onChange} placeholder="Escribe aquí" />        
          </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción</Form.Label>
          <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Escribe aquí" cols="80" rows="3">{description}</textArea>
        </Form.Group>

        <p>  Selecciona las opciones de accesibilidad que cumple  el lugar</p>


           <div>
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Baños con accesibilidad para silla de ruedas" value="si" onClick={this.onChangeCheckBaño}/>
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Rampas aptas para silla de ruedas" value="si" onClick={this.onChangeCheckRampa}/>
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox"   label="Estacionamientos reservados" value="si"  onClick={this.onChangeCheckEstacionamiento}/>
          </Form.Group>

         <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox"  label="Elevadores" value="Elevadores" onClick={this.onChangeCheckElevador}/>
          </Form.Group>
          </div>

      </Form>
      </div>
      
      <div className="btn">
      <div> <button> Cancelar </button></div>
      <div>  <button className="btnSave" type="submit" onClick={this.onSubmit}> Guardar </button></div>
      </div>


      </Row>
      </Container>
      );
    }
  }
  
  export default Formulario;