import React from 'react';
import { Navbar } from 'react-bootstrap';

const navbar = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Gif-Game</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
)

const Header = (props) => (
  <header>
    {navbar}
  </header>
);

export default Header;
