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
          <h1 className="App-title">Welcome to Contacts Manager</h1>
          <h2 className="App-subtitle">A web application to create, read, update, and delete contacts. Made in React </h2>
        </header>
        <p className="App-intro">
          To update or delete a contact, double click any part of the row of the contact and click on the update
          or delete button.
        </p>
        <ContactsTable/>

      </div>
    );
  }

}
export default App;
