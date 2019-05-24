import React, { Component } from 'react';
import './MapaCategoría.css'
import back from '../../camila/Vector.png'

class Filtro extends Component {
    constructor(props) {
       super(props);
        this.state={
            holi: "holi",
            wrapperStyleEnjoy: false,
            wrapperStyleMetro: false,
            wrapperStyleBank: false,
            bank:false,
            metro: false,
            enjoy: false,
        }
    this.handleChangeEnjoy = this.handleChangeEnjoy.bind(this);
    this.handleChangeBank = this.handleChangeBank.bind(this);
    this.handleChangeMetro = this.handleChangeMetro.bind(this);
    this.handleNavegation = this.handleNavegation.bind(this);
    }

    handleChangeEnjoy (){

        this.setState({
           ...this.state,
            wrapperStyleEnjoy: !this.state.wrapperStyleEnjoy,
            enjoy:true,
        })

    }
    handleChangeBank (){

        this.setState({
           ...this.state,
            wrapperStyleBank: !this.state.wrapperStyleBank,
            bank:true,
        })

    }
    handleChangeMetro (){

        this.setState({
           ...this.state,
            wrapperStyleMetro: !this.state.wrapperStyleMetro,
            metro: true,
        })

    }
    handleNavegation (){

    }

    render(){
        return (
            <div className="filter">
            <img src= {back} alt="back" className="back"/>
            <div className="title">
                <h2> ¿Que estas Buscando Hoy?</h2>
                <p>Selecciona las categorías que te interesaría conocer</p>
            </div>
                <div className="row">
                    <div className="column">
                        <div className="enjoyPhoto" onClick={this.handleChangeEnjoy} style={{
                backgroundImage: !this.state.wrapperStyleEnjoy ? `url('./assets/cine.jpg')` : `url('./assets/entretenimiento.png')` 
            }}/>
                        <span className="categories">ENTRETENIMIENTO</span>                                   
                        <div className="metroPhoto" onClick={this.handleChangeMetro}  style={{
                backgroundImage: !this.state.wrapperStyleMetro ? `url('./assets/metro.jpg')` : `url('./assets/metroo.png')` }}/>
                        <span className="categories"> METRO </span>
                        <div className="foodPhoto"/>
                        <span className="categories"> COMIDA</span> 

                    </div>

                    <div className="column">
                    <div className="bankPhoto" onClick={this.handleChangeBank}  style={{
                backgroundImage: !this.state.wrapperStyleBank ? `url('./assets/cajero.png')` : `url('./assets/Banco-cajero.png')` }}/>
                    <span className="categories">BANCOS</span>                    
                    <div className="hospitalPhoto"/>
                    <span className="categories">CENTROS DE SALUD</span>               
                    <div className="shopPhoto"/>
                    <span className="categories">TIENDAS</span>
                    </div>

                </div>

                <button className="buttonNext" onClick={this.handleNavegation}> VER LUGARES </button>
            </div>
        )
    }
}

export default Filtro