import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Header, Segment } from 'semantic-ui-react'

import {Menu} from 'semantic-ui-react';
import Receiving from './Receiving.js';
import NavBar from './navBar.js';

class App extends Component {
  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
   
  render() {
    const { activeItem } = this.state
    return (

      <Router>
        <div>
        <NavBar />
          {/* <Route path="/" exact component={} /> */}
          <Route path="/receiving" component={Receiving} />
          
          {/* <Route path="/users/" component={} /> */}
        </div>
        <header className="App-header">
      </header>
      </Router>
      

      // <div className="App">
      // <Router>
      //   <div>
      //   <NavBar />
      //   </div>
      //   <div>
      //     <Receiving />
      //   </div>
      // </Router>
      
      //   <header className="App-header">
      //   <div class="ui icon input">
      //     <input type="text" placeholder="Input Barcode..." />
      //       <i class="big barcode icon"></i>
      //     </div>
      //   </header>
      // </div>
      
    );
  }
}

export default App;
