import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/Receiving.css';
//import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
//import { Menu } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
//import NavBar from './navBar.js';
import Edit from './Edit';

var jsonData;

class Receiving extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  constructor(props) {
    super(props);
    this.state = { 
      value: '795602367739',
      toEdit: false,
      step: 1,
      jsonData: false
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    //  do async request
    console.log("Does enter cause this to go again.")   
    var year = 2019;
    var trackingNumber = this.state.value;    
    console.log("what is this at top level:", this)
    axios.post('http://localhost:3030/api/testing', {
      // send the data
      year,
      trackingNumber: trackingNumber
    })
      .then((response) => {
        //console.log("Response: ",response.data.message);
        if (response.data.message === 'Invalid PDF structure') {
          console.log("ERROR in client");
          //axios post again
          year--;          
          axios.post('http://localhost:3030/api/testing', {
            // send the data
            year,
            trackingNumber: trackingNumber
         
          }).then((response) => {
              // now we need to set our state and hand over some props
              console.log("what is this at bottom level:", this)
              this.setState({jsonData: response})
              this.setState({ step: 2});
              
              jsonData = response;
              console.log('The state is: ', this.state);
          })
          .catch(err => {
              console.log("Yeaaah.. Post never went through")
          })
        }
      })
      .catch(function (error) {
        console.log("This is a 400 Err: ", error);
      });

    alert('Barcode "' + this.state.value + '", was submitted');
    event.preventDefault();
  }

  render() {
    //const { activeItem } = this.state
    if (this.state.step === 1) {
      return (
        <header className="App-header">
          <div class="ui icon input">
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Input Barcode..." value={this.state.value} onChange={this.handleChange} />
              <i class="big barcode icon"></i>
            </form>
          </div>
        </header>
  
  
      );
    }
    // if (this.state.step === 2) {
    //   return (
    //     <Step2 {this.state.returnedData} />
    //   )
    // }
    // if(this.state.toEdit === true) {
    //   console.log(this.state)
    //   return <Redirect to='/edit' />
    // }
    if(this.state.step === 2) {
      console.log(this.state)
      return <Edit jsonData={this.state.jsonData}/>
    }

    // if ( this.state.step === "Step1Err") {
    //   <Step1 {this.trac}/>
    //   <Step1Err />
    // }
    
  }
}
export default Receiving;