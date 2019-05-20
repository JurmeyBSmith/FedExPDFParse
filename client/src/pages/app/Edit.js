import React, { Component } from 'react';
import { Document, Page } from "react-pdf/dist/entry.webpack";
//import PDFfile from "localhost:3030/785074206725.pdf";
import { Button, Checkbox, Form } from 'semantic-ui-react';
//import { BrowserRouter as Router, Route } from "react-router-dom";
//import './Edit.css';
import { Header, Segment, Grid, Divider } from 'semantic-ui-react'
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
    console.log('The props: ', this.props)
  }
   

  render() {
    //const { pageNumber, numPages } = this.state;
    var myVar = this.props.jsonData.data.data.datat;
    var pdfPath = "http://localhost:3030/" + myVar.trackingNumber + ".pdf";
    return (
        
      <header className="App-header">
      
        <Segment size="massive">
        <hr width="1450px"></hr>
          <Grid columns={2} relaxed='very'>  
          <Grid.Column>   
           <div>
           
          <embed src={pdfPath} width="680px" height="750px" align="left" />
        </div>
        </Grid.Column>
        
        <Grid.Column>
        <Form>
          <Form.Field>
            <label>Tracking Number</label>
            <input defaultValue={myVar.trackingNumber} />
          </Form.Field>
          <Form.Field>
            <label>Status</label>
            <input defaultValue={myVar.status} />
          </Form.Field>
          <Form.Field>
            <label>Delivery Date</label>
            <input defaultValue={myVar.deliveryDate} />
          </Form.Field>
          <Form.Field>
            <label>Shipped Date</label>
            <input defaultValue={myVar.shipDate} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input defaultValue={myVar.shipcity} />
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <input defaultValue={myVar.shipState} />
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <input defaultValue={myVar.shipCountry} />
          </Form.Field>
          <Form.Field>
            <label>Invoice Number#</label>
            <input defaultValue={myVar.reference} />
          </Form.Field>
          
          <Button type='submit'>Submit</Button>
        </Form>
        </Grid.Column>
        </Grid> 
        <Divider vertical>Edit</Divider>
        </Segment>
      
      </header>
    );
  }
}

export default Edit;
