import React, { Component } from 'react';
import { Document, Page } from "react-pdf/dist/entry.webpack";

//import { BrowserRouter as Router, Route } from "react-router-dom";
//import './Edit.css';
//import { Header, Segment } from 'semantic-ui-react'
//import {Menu} from 'semantic-ui-react';
// import Receiving from './Receiving.js';
// import Edit from './Edit.js';
// import NavBar from './navBar.js';

class Edit extends Component {
  state = { numPages: null, pageNumber: 1 }
  //handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
   
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));


  render() {
    const { pageNumber, numPages } = this.state;
    
    return (

        <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="./785074206725.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
      
    );
  }
}

export default Edit;
