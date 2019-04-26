import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/Receiving.css';
import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import {Menu} from 'semantic-ui-react';

import NavBar from './navBar.js';

class Receiving extends Component {
  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
   
//HEREWEGO
constructor(props) {
  super(props);
  this.state = {value: ''};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  this.setState({value: event.target.value});
}
handleSubmit(event){
  //  do async request
  axios.post('http://localhost:3030/api/receiving', {
    // send the data
    trackingNumber: this.state.value
  })
  // handle response 
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  alert('Barcode "' + this.state.value +'", was submitted');
  event.preventDefault();
}

  render() {
    const { activeItem } = this.state
    return (
      
      // {/* <Router>
      //   <div>
      //   <NavBar />
      //   </div>
      // </Router> */}
      
        <header className="App-header">
        <div class="ui icon input">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Input Barcode..." value={this.state.value} onChange={this.handleChange}  />
            <i class="big barcode icon"></i>
            </form>
          </div>
        </header>
      
      
    );
  }
}
export default Receiving;