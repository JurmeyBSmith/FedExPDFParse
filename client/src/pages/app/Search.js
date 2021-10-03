import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Header, Segment, Grid, Divider } from 'semantic-ui-react'
import Edit from './Edit';
import './css/Search.css';


class Search extends Component {

  constructor(props) {
    super(props);

    console.log('The props: ', this.props);
    // sync state and props together
    this.state = {
      name: "",
      value: "",
      step: 1,
      responseData: null,      
      entries: [
        {
          "shipment_id": 334567980,
          "tracking_number": "785074206725",
          "reference_number": "L85232",
          "store": "store",
          "street": "street",
          "state": "FL",
          "zip": "zip",
          "city": "bradenton",
          "country": "US",
          "status": "delivered",
          "received_date": "01-30-2019",
          "shipped_date": "01-24-2019"
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatePost  = this.handleUpdatePost.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }
  editEntry(entry) {
    console.log("Entrye: ", entry);
    this.setState({ step: 3, responseData: entry });
  }
  //Render table data
  renderTableData() {
    return this.state.entries.map((entry, index) => {
      const { shipment_id, tracking_number, reference_number, store, street, state, zip, city, country, status, received_date, shipped_date } = entry
      return (

        <tr key={shipment_id} onClick={() => this.editEntry(entry)}>
          <td>{shipment_id}</td>
          <td>{tracking_number}</td>
          <td>{reference_number}</td>
          <td>{store}</td>
          <td>{street}</td>
          <td>{state}</td>
          <td>{zip}</td>
          <td>{city}</td>
          <td>{country}</td>
          <td>{status}</td>
          <td>{received_date}</td>
          <td>{shipped_date}</td>

        </tr>

      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.entries[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  handleUpdatePost() {
    console.log("ResponseDATA: ", this.state.responseData)    
    var formObj = this.state.responseData;
    console.log("FormObj!", formObj);
    axios.post('http://localhost:3030/search/update', {
      formObj,
    }).then((response) =>{
      console.log("Updated: ", response);
      alert("Entry Updated!")
    
    })
  }
  handleEditChange = (e) => {    
    
    const { responseData } = { ...this.state };
  const currentState = responseData;
  const { name, value } = e.target;
  currentState[name] = value;

  this.setState({ responseData: currentState });
  console.log("ResponseData: ", this.state.responseData);
    
 

  }
  handleChange(event) {
    this.setState({ value: event.target.value, name: event.target.name })
  }
  handleSubmit() {

    var name = this.state.name;
    var value = this.state.value;

    axios.post('http://localhost:3030/search', {
      name: name,
      value: value
    }).then((response) => {
      this.setState({ step: 2, responseData: response.data[0], entries: response.data });
      console.log("RESPONSE ", response);
      
    })

  }


  render() {

    if (this.state.step === 2) {
      return (
        <div >
          <h1 id='title'>Search Results</h1>
          <table id='entries'>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
    }
    if (this.state.step === 1) {
      return (
        <header className="App-header">
          <h1>SEARCH</h1>
          <p>Please enter one field below to search entries matching that field.</p>


          <Form onSubmit={this.handleSubmit} inverted>
            <Form.Field>
              <label>Tracking Number</label>
              <input placeholder="Tracking Number" onChange={this.handleChange} name='tracking_number' />
            </Form.Field>

            <Form.Field>
              <label>Status</label>
              <input placeholder="Status" onChange={this.handleChange} name='status' />
            </Form.Field>

            <Form.Field>
              <label>Delivery Date</label>
              <input placeholder="Delivery Date" onChange={this.handleChange} name='received_date' />
            </Form.Field>

            <Form.Field>
              <label>Shipped Date</label>
              <input placeholder="Ship Date" onChange={this.handleChange} name='shipped_date' />
            </Form.Field>

            <Form.Field>
              <label>City</label>
              <input placeholder="City" onChange={this.handleChange} name='city' />
            </Form.Field>

            <Form.Field>
              <label>State</label>
              <input type="text" list="states" placeholder="State" onChange={this.handleChange} name='state' />
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
              <input type="text" list="countries" placeholder="US" onChange={this.handleChange} name='country' />
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
                name='reference_number'
                placeholder="Invoice Number"
                onChange={this.handleChange} />
            </Form.Field>

            <Button type='submit'>Submit</Button>
          </Form>

        </header>
      )

    }
    //EDIT PAGE
    var pdfPath = "http://localhost:3030/" + this.state.responseData.tracking_number + ".pdf";
    if (this.state.step === 3) {
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
                <Form onSubmit={this.handleUpdatePost} inverted>
                  <Form.Field>
                    <label>Tracking Number</label>
                    <input
                      name='trackingNumber'
                      value={this.state.responseData.tracking_number}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Status</label>
                    <input defaultValue={this.state.responseData.status} onChange={this.handleEditChange} name='status' />
                  </Form.Field>
                  <Form.Field>
                    <label>Delivery Date</label>
                    <input defaultValue={this.state.responseData.received_date} onChange={this.handleEditChange} name='deliveryDate' />
                  </Form.Field>
                  <Form.Field>
                    <label>Shipped Date</label>
                    <input defaultValue={this.state.responseData.shipped_date} onChange={this.handleEditChange} name='shipDate' />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input defaultValue={this.state.responseData.city} onChange={this.handleEditChange} name='shipcity' />
                  </Form.Field>
                  <Form.Field>
                    <label>State</label>
                    <input type="text" list="states" defaultValue={this.state.responseData.state} onChange={this.handleEditChange} name='shipState' />
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
                    <input type="text" list="countries" defaultValue={this.state.responseData.country} onChange={this.handleEditChange} name='shipCountry' />
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
                      defaultValue={this.state.responseData.reference_number}
                      onChange={this.handleEditChange} />
                  </Form.Field>

                  <Button type='submit'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
            <Divider vertical >Edit</Divider>
          </Segment>

        </header>
      );
    } else if (this.state.step === 4) {
      //return <header className="App-header"><h1 align="center">Submitted!</h1></header>
      return <Redirect to='/' />
    }

  }

};

export default Search;
