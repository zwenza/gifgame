import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import StartGame from './StartGame'

const Wrapper = () => (
  <div className="wrapper">
    <Header/>
    <Main>
      <StartGame/>
    </Main>
    <Footer/>
  </div>
);

export default Wrapper;
