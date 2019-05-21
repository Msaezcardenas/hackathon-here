import React, { Component } from 'react';
import AddressSuggest from './AddressSuggest';
import AddressInput from './AddressInput';



class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        app_id: 'LP2ZyQJ7qm17fYnZLySE',
        app_code: '4kTbv-S-8k6wr44_jerEbQ',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
          },
          query:'',
          locationId: '',
          isChecked: false,
          coords: {}
    }
    

    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  onQuery(evt) {

    const query = evt.target.value;
    this.setState({
        ...this.state,
        query : query,      
    })
    
   
   fetch('https://autocomplete.geocoder.api.here.com/6.2/suggest.json'    
      +'?app_id='+ this.state.app_id
      +'&app_code='+ this.state.app_code
      +'&query='+ query
      +'&maxresults='+ 1
    ).then((data)=> data.json())
     .then( (response) => {
          console.log(response)
          if (response.suggestions.length > 0) {
            const id = response.suggestions[0].locationId;
            const address = response.suggestions[0].address;
            this.setState({
                ...this.state,
              address : address,
              query : query,
              locationId: id
            })
          } else {
                return false
          }
      })
      .catch((error)=>{
          console.log(error.message)
      })
  }


  onClear(evt) {
    this.setState({
       ...this.state,
       address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      },
      query: '',
      locationId: '',
      isChecked: false,
      coords: {}
    });
}

  onAddressChange(evt) {
    const id = evt.target.id
    const val = evt.target.value

    let state = this.state
    state.address[id] = val;
    this.setState({
        ...this.state,
        address:{
            ...this.state.address,
            [id]: val
        }
    });
  }

  onCheck(evt) {
    let params = {
        'app_id': this.state.app_id,
        'app_code': this.state.app_code,
    }

    if (this.state.locationId.length > 0) {
      params['locationId'] = this.state.locationId;
    } else {
      params['searchtext'] = this.state.address.street
        + this.state.address.city
        + this.state.address.state
        + this.state.address.postalCode
        + this.state.address.country;
       
    }
    console.log(params)
    
    fetch('https://geocoder.api.here.com/6.2/geocode.json'
    +'?app_code=' + this.state.app_code
    +'&app_id='+ this.state.app_id
    +'&locationid=' + this.state.locationId
    )
    .then((data)=> data.json())
    .then((response)=> {
        console.log(response.Response)
        const view = response.Response.View
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;
          this.setState({
            ...this.state,  
            isChecked: 'true',
            locationId: '',
            query: location.Address.Label,
            address: {
              street: location.Address.HouseNumber + ' ' + location.Address.Street,
              city: location.Address.City,
              state: location.Address.State,
              postalCode: location.Address.PostalCode,
              country: location.Address.Country
            },
            coords: {
              lat: location.DisplayPosition.Latitude,
              lon: location.DisplayPosition.Longitude
            }
          });
        } else {
          this.setState({
            ...this.state,
            isChecked: true,
            coords: null,
        })
        }

      })
      .catch((error)=> {
        console.log(error.message);
        this.setState({
        ...this.state,
          isChecked: true,
          coords: null,
        });
      });
  }

  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="alert alert-warning" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="alert alert-success" role="alert">
          <b>Valid Address.</b>  Location is {this.state.coords.lat}, {this.state.coords.lon}.
        </div>
      );
    }
  }

  render() {
    let result = this.alert();
    return (
        <div className="container">
          <AddressSuggest
            query={this.state.query}
            onChange={this.onQuery}
            />
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
            />
          <br/>
          { result }
          <button type="submit" onClick={this.onCheck}>Check</button>
          <button type="submit"  onClick={this.onClear}>Clear</button>
        </div>
      );
  }
}

export default AddressForm;


