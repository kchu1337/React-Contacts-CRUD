
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapTable from 'react-bootstrap-table-next'
import { Button, Label } from 'react-bootstrap';
import './Table.css';
import axios from 'axios';

const uuid = require('uuid/v1');

class ContactTable extends Component {
  state = {
    isCreateNew: true,
    showHideClassName: 'modal display-none',
    id: '',
    email: '',
    fname: '',
    lname: '',
    enabled: false,
    phone: '',
    show: false,
    rowEvents: {
      onDoubleClick: (e, row, rowIndex) => {
        this.showModal(row);
      }},
    columns: [{
      dataField: 'email',
      text: 'Email'
    }, {
      dataField: 'lname',
      text: 'Last Name'
    }, {
      dataField: 'fname',
      text: 'First Name'
    }, {
      dataField: 'phone',
      text: 'Phone Number'
    }, {
      dataField: 'enabled',
      text: 'Enabled'
    }],
    contacts: [{}]};

  //Shows the modal with either existing information if update, or blank space if creation
  showModal = ({id, email, fname, lname, enabled, phone}) => {
    this.setState({ show: true });
    //update
    if (id) {
      this.setState({id,
        email,
        fname,
        lname,
        enabled,
        phone,
        showHideClassName: 'modal display-block',
        isCreateNew: false});
    }
    //create
    else{
      this.setState({
        id: uuid(),
        email:'',
        fname: '',
        lname: '',
        enabled: false,
        phone: '',
        showHideClassName: 'modal display-block',
        isCreateNew: true});
    }
  };

  //Hides the modal
  hideModal = () => {
    this.setState({ show: false,
      showHideClassName: 'modal display-none'});
  };

  //Deletes the data in dynamo
  delete = () => {
    axios.delete(`/api?id=${this.state.id}`)
      .then(() =>{
        this.componentDidMount();
        })
      .catch((err) =>{
        console.log(err);
      });
  };

  //Generic input binding change function
  handleInputChange({target}) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //Does both the update and create contacts
  update() {
    const {id, email, fname, lname, enabled, phone } = this.state;
    const data = {
      id,
      email,
      fname,
      lname,
      enabled,
      phone
    }
    const method = (this.state.isCreateNew)? 'post':'put';
    axios({
      method,
      url: '/api/',
      data
    })
      .then(() =>{
      this.componentDidMount();
      })
      .catch((err) =>{
        console.log(err);
      });
  };

  //Loads the data
  componentDidMount(){
    axios.get('/api/')
      .then((response) =>{
        this.setState({
          showHideClassName: 'modal display-none',
          contacts : response.data
        })
      })
      .catch((err) =>{
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={this.showModal}>
          Create New Contact
        </Button>
        <BootstrapTable
          striped
          bordered
          keyField='email'
          data={ this.state.contacts }
          columns={ this.state.columns }
          rowEvents={ this.state.rowEvents }/>
        <div className={this.state.showHideClassName}>
          <section className="modal-main">
            <form>
              <input type="hidden" id="id" value={this.state.id}></input>
              <Label htmlFor="email">Email</Label>
              <br/>
              <input type="text" id="email" value={this.state.email} name = 'email' onChange={this.handleInputChange.bind(this)}></input>
              <br/>
              <br/>
              <Label htmlFor="fname">First Name</Label>
              <br/>
              <input type="text" id="fname" value={this.state.fname} name = 'fname' onChange={this.handleInputChange.bind(this)}></input>
              <br/>
              <br/>
              <Label htmlFor="lname">Last Name</Label>
              <br/>
              <input type="text" id="lname" value={this.state.lname} name = 'lname' onChange={this.handleInputChange.bind(this)}></input>
              <br/>
              <br/>
              Enabled
              <br/>
              <Label htmlFor="radioTrue">True</Label>
              <input type="radio" id ="radioTrue" name="enabled" value={"true"}
                     checked={this.state.enabled === 'true'} onChange={this.handleInputChange.bind(this)}></input>
              {' '}
              <Label htmlFor="radioFalse">False</Label>
            <input type="radio" id ="radioFalse" value="false" name="enabled"
                   checked={this.state.enabled ==='false'} onChange={this.handleInputChange.bind(this)}></input>
              <br/>
              <br/>
              <Label htmlFor="phone">Phone Number</Label>
              <br/>
              <input type="text" id="phone" value={this.state.phone} name = 'phone' onChange={this.handleInputChange.bind(this)}></input>
            </form>
            <br/>
            <Button  bsStyle="success" onClick={this.update.bind(this)}>Update</Button>
            <Button  bsStyle="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')){this.delete()} } }>Delete</Button>
            <Button  bsStyle="warning" onClick={this.hideModal}>Cancel</Button>
          </section>
        </div>
      </div>
    );
  }
}

export default ContactTable;