import React, { Component } from 'react';
import './css/Receiving.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
    this.setState({ value: event.target.value,  });
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
              console.log("Post never went through")
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
    event.preventDefault();
  }
  }
  render() {
   
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

    if (this.state.step === 2) {
      console.log(this.state)
      return <Edit jsonData={this.state.jsonData} />
    }

  }
}
export default Receiving;
