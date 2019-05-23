import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/Receiving.css';
//import { Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
//import { Menu } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
//import NavBar from './navBar.js';
//import ReactTooltip from 'react-tooltip'
import Edit from './Edit';
import './css/Receiving.css';

var jsonData;

class Receiving extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  constructor(props) {
    super(props);
    this.state = {
      value: '795602367739',
      toEdit: false,
      step: 1,
      jsonData: false,
      type: "ui icon input"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if(this.state.value.length !== 11){
      this.setState({type: "ui error icon input"})
    }else if(isNaN(this.state.value)){
      this.setState({type: "ui error icon input"})
    }else {
      this.setState({type: "ui icon input"})
    }
  }
  handleSubmit(event) {
    //  do async request
    if(this.state.value.length !== 12){
      alert(
        "Invalid Tracking Number: " +
        this.state.value +
        "\nTracking Number must be 12 digits long."
      );
    }else if(isNaN(this.state.value)){
      alert(
        "Invalid Tracking Number: " +
        this.state.value +
        "\nTracking Number must be numeric data."
      );
    }else {
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
            this.setState({ jsonData: response })
            this.setState({ step: 2 });

            jsonData = response;
            console.log('The state is: ', this.state);
          })
            .catch(err => {
              console.log("Yeaaah.. Post never went through")
            })
        } else {
          this.setState({ jsonData: response })
          this.setState({ step: 2 });

          jsonData = response;
        }
      })
      .catch(function (error) {
        console.log("This is a 400 Err: ", error);
      });

    alert('Barcode "' + this.state.value + '", was submitted');
    event.preventDefault();
  }
  }
  render() {
    //const { activeItem } = this.state
   
    if (this.state.step === 1) {
      return (
        <header className="App-header">
          
          <h1 >Please Scan Returning Tracking Number</h1>
          <form onSubmit={this.handleSubmit}>
          <div class={this.state.type} >

            <input type="text" placeholder="Input Barcode..." value={this.state.value} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
            <button  class="ui button" onClick={this.handleSubmit}>
              Search
            </button>

          </div>
          </form>
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
    if (this.state.step === 2) {
      console.log(this.state)
      return <Edit jsonData={this.state.jsonData} />
    }

    // if ( this.state.step === "Step1Err") {
    //   <Step1 {this.trac}/>
    //   <Step1Err />
    // }

  }
}
export default Receiving;