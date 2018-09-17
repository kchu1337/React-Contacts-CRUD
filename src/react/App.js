import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactsTable from './Table';

class App extends Component {


  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save Fto reload.
        </p>
<ContactsTable/>

      </div>
    );
  }

}
/*const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};*/
export default App;
