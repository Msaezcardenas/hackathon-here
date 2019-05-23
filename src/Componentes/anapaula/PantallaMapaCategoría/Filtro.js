import React, { Component } from 'react';

class Filtro extends Component {
    constructor(props) {
       super(props);
        this.state={
            holi: "holi"
        }
    }

    render(){
        return (
            <div>{this.state.holi}</div>
        )
    }
}

export default Filtro