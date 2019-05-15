import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react';

class NavBar extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (

      <Menu>
        {/* <Header as="h1" position='left' textAlign='left'>FAWKES ENGINEERING</Header> */}
        <Menu.Menu position='right'>
          <Menu.Item
            name='home'
            position='left'
            active={activeItem === 'id'}
            onClick={this.handleItemClick}
            a href="/">
            <Header as="h1" position='left' textAlign='left'>FAWKES ENGINEERING</Header>
      </Menu.Item>
          <Menu.Item
            name='Recieve'
            position='right'
            active={activeItem === 'id'}
            onClick={this.handleItemClick}
            a href="/receiving">Receive
            </Menu.Item>
          <Menu.Item
            name='placeholder'
            position='right'
            active={activeItem === 'id'}
            onClick={this.handleItemClick}
            a href="/">placeholder
            </Menu.Item>
          <Menu.Item
            name='placeholder'
            position='right'
            active={activeItem === 'id'}
            onClick={this.handleItemClick}
            a href="/">placeholder
            </Menu.Item>

        </Menu.Menu>
      </Menu>

    );
  }
}

export default NavBar;