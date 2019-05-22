import React, { Component } from 'react';
import { Document, Page } from "react-pdf/dist/entry.webpack";
//import PDFfile from "localhost:3030/785074206725.pdf";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
//import { BrowserRouter as Router, Route } from "react-router-dom";
//import './Edit.css';
import { Header, Segment, Grid, Divider } from 'semantic-ui-react'
import Axios from 'axios';
//import {Menu} from 'semantic-ui-react';
// import Receiving from './Receiving.js';
// import Edit from './Edit.js';
// import NavBar from './navBar.js';
var jsonData; 
console.log("JsonData", jsonData);

class Edit extends Component {
  //state = { numPages: null, pageNumber: 1 }
  //handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
  
  constructor(props) {
    super(props);
    var myVar = this.props.jsonData.data.data.data;

    console.log('The props: ', this.props);
    // sync state and props together
    this.state = {
      trackingNumber: myVar.trackingNumber,
      status: myVar.status,
      deliveryDate: myVar.deliveryDate,
      shipDate: myVar.shipDate,
      shipcity: myVar.shipcity,
      shipState: myVar.shipState,
      shipCountry: myVar.shipCountry,
      reference: myVar.reference
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(event) {
    const { trackingNumber, reference } = this.state;
    
    // go get the values in the form 
    // update the state?
    this.setState({ trackingNumber: trackingNumber, reference: reference})

    console.log(this.state);
    //post
    var formObj = this.state;

    axios.post('http://localhost:3030/receiving/update', {
    formObj
    })//.then()

    alert(
      'Tracking Number "' +this.state.trackingNumber + '", was submitted'+
      '\nStatus "' +this.state.status + '", was submitted'+
      '\nDelivery Date "' +this.state.deliveryDate + '", was submitted'+
      '\nShip Date "' +this.state.shipDate + '", was submitted'+
      '\nCity "' +this.state.shipcity + '", was submitted'+
      '\nState "' +this.state.shipState + '", was submitted'+
      '\nCountry "' +this.state.shipCountry + '", was submitted'+
      '\nReference Number "' +this.state.reference + '", was submitted'
      
    );
  }

  render() {
    //const { pageNumber, numPages } = this.state;
    var myVar = this.state;
    var pdfPath = "http://localhost:3030/" + myVar.trackingNumber + ".pdf";
    return (
        
      <header className="App-header">
      
        <Segment size="massive" inverted>
        <hr width="1450px"></hr>
          <Grid columns={2} relaxed='very'>  
          <Grid.Column>   
           <div>
           
          <embed src={pdfPath} width="680px" height="750px" align="left" />
        </div>
        </Grid.Column>
        
        <Grid.Column>
        <Form onSubmit={this.handleSubmit} inverted>
          <Form.Field>
            <label>Tracking Number</label>
            <input 
              name='trackingNumber'              
              value={this.state.trackingNumber}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Status</label>
            <input defaultValue={myVar.status} onChange={this.handleChange} name='status'/>
          </Form.Field>
          <Form.Field>
            <label>Delivery Date</label>
            <input defaultValue={myVar.deliveryDate} onChange={this.handleChange} name='deliveryDate'/>
          </Form.Field>
          <Form.Field>
            <label>Shipped Date</label>
            <input defaultValue={myVar.shipDate} onChange={this.handleChange} name='shipDate'/>
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input defaultValue={myVar.shipcity} onChange={this.handleChange} name='shipcity'/>
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <input defaultValue={myVar.shipState} onChange={this.handleChange} name='shipState'/>
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <input defaultValue={myVar.shipCountry} onChange={this.handleChange} name='shipCountry'/>
          </Form.Field>
          <Form.Field>
            <label>Invoice Number#</label>
            <input 
              name='reference'
              defaultValue={myVar.reference}
              onChange={this.handleChange}/>
          </Form.Field>
          
          <Button type='submit'>Submit</Button>
        </Form>
        </Grid.Column>
        </Grid> 
        <Divider vertical >Edit</Divider>
        </Segment>
      
      </header>
    );
  }
}

export default Edit;
