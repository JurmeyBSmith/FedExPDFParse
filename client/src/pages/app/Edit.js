import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import './Edit.css';
//import { Header, Segment } from 'semantic-ui-react'

//import {Menu} from 'semantic-ui-react';
// import Receiving from './Receiving.js';
// import Edit from './Edit.js';
// import NavBar from './navBar.js';

class Edit extends Component {
  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
   
  render() {
    //const { activeItem } = this.state
    return (

      
        <div>
        <hi>HELLUR!</hi>
         
        
        <header className="App-header">
      </header>
      </div>
      
    );
  }
}

export default Edit;
