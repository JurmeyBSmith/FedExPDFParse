import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
//import { Header, Segment } from 'semantic-ui-react'

//import {Menu} from 'semantic-ui-react';
import Search from './Search.js';
import Receiving from './Receiving.js';
import Edit from './Edit.js';
import NavBar from './navBar.js';
import Home from './Home.js';

class App extends Component {
  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name }) 
   
  render() {
    //const { activeItem } = this.state
    return (

      <Router>
        <div>
        <NavBar />
          {/* <Route path="/" exact component={} /> */}
          
          <Route path="/receiving" component={Receiving} />
          <Route path="/edit" component={Edit} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
          {/* <Route path="/users/" component={} /> */}
        </div>
        
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
