import React from 'react';
import Header from './components/Header';
import './styles.css';
import Characters from './components/Characters/Characters';

const App = () => (
  <div className="App">
      <Header />
      <hr/>
      <Characters />
  </div>
);

export default App;
