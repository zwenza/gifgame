import React, { Component } from 'react';

import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Main>
          {this.props.children}
        </Main>
        <Footer/>
      </div>
    );
  }
}

export default App;
