import React, { Component } from 'react';
import { Document, Page } from "react-pdf/dist/entry.webpack";
//import PDFfile from "localhost:3030/785074206725.pdf";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
      reference: myVar.reference,
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    const { trackingNumber, reference } = this.state;

    // go get the values in the form 
    // update the state?
    this.setState({ submitted: true })

    console.log("State", this.state);
    //post
    var formObj = this.state;

    axios.post('http://localhost:3030/receiving/update', {
      formObj
    })//.then()

    alert(
      'Tracking Number "' + this.state.trackingNumber + '", was submitted' +
      '\nStatus "' + this.state.status + '", was submitted' +
      '\nDelivery Date "' + this.state.deliveryDate + '", was submitted' +
      '\nShip Date "' + this.state.shipDate + '", was submitted' +
      '\nCity "' + this.state.shipcity + '", was submitted' +
      '\nState "' + this.state.shipState + '", was submitted' +
      '\nCountry "' + this.state.shipCountry + '", was submitted' +
      '\nReference Number "' + this.state.reference + '", was submitted'

    );

  }

  render() {
    //const { pageNumber, numPages } = this.state;
    var myVar = this.state;
    var pdfPath = "http://localhost:3030/" + myVar.trackingNumber + ".pdf";
    if (this.state.submitted === false) {
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
                    <input defaultValue={myVar.status} onChange={this.handleChange} name='status' />
                  </Form.Field>
                  <Form.Field>
                    <label>Delivery Date</label>
                    <input defaultValue={myVar.deliveryDate} onChange={this.handleChange} name='deliveryDate' />
                  </Form.Field>
                  <Form.Field>
                    <label>Shipped Date</label>
                    <input defaultValue={myVar.shipDate} onChange={this.handleChange} name='shipDate' />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input defaultValue={myVar.shipcity} onChange={this.handleChange} name='shipcity' />
                  </Form.Field>
                  <Form.Field>
                    <label>State</label>
                    <input type="text" list="states" placeholder={myVar.shipState} onChange={this.handleChange} name='shipState' />
                    <datalist id="states">

                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </datalist>
                  </Form.Field>
                  <Form.Field>
                    <label>Country</label>
                    <input type="text" list="countries" placeholder={myVar.shipCountry} onChange={this.handleChange} name='shipCountry' />
                    <datalist id="countries">
                      <option value="US"></option>
                      <option value="CA"></option>
                      <option value="UK"></option>
                      <option value="MX"></option>
                    </datalist>
                  </Form.Field>
                  <Form.Field>
                    <label>Invoice Number#</label>
                    <input
                      name='reference'
                      defaultValue={myVar.reference}
                      onChange={this.handleChange} />
                  </Form.Field>

                  <Button type='submit'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
            <Divider vertical >Edit</Divider>
          </Segment>

        </header>
      );
    } else if (this.state.submitted === true) {
      //return <header className="App-header"><h1 align="center">Submitted!</h1></header>
      return <Redirect to='/' />
    }
  }
}

export default Edit;
