import { BrowserRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import LogIn from './authent/LogIn';
import LogOut from './authent/LogOut';
import Register from './authent/Register';
import AddCard from './opers/AddCard';
import Deposit from './opers/Deposit';
import MyAccount from './opers/MyAccount';
import Transfer from './opers/Transfer';
import UpdateCard from './opers/UpdateCard';
import Withdraw from './opers/Withdraw';

// localStorage.setItem('userId', unInt);
// localStorage.getItem('userId');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
    };
  }

  getLinks() {
    const { userId } = this.state;
    if (userId === null) {
      return [
        <li><Link to="/">Home</Link></li>,
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/register">Register</Link></li>,
      ];
    }
    return [
      <li><Link to="/">Home</Link></li>,
      <li><Link to="/addcard">Add a Card</Link></li>,
      <li><Link to="/deposit">Deposit</Link></li>,
      <li><Link to="/account">My Account</Link></li>,
      <li><Link to="/transfer">Make a Transfer</Link></li>,
      <li><Link to="/withdraw">Withdraw Money</Link></li>,
      <li><Link to="/logout">Logout</Link></li>,
      <li><Link to="/updatecard">Update a Card (this link will be eventually removed)</Link></li>,
    ];
  }

  getRoutes() {
    const { userId } = this.state;
    if (userId === null) {
      return [
        <Route exact path="/" component={() => (<h1>Welcome to Watermelon!</h1>)} />,
        <Route exact path="/login" component={() => (<LogIn />)} />,
        <Route exact path="/register" component={() => (<Register />)} />,
      ];
    }
    return [
      <Route exact path="/" component={() => (<MyAccount />)} />,
      <Route exact path="/addcard" component={() => (<AddCard />)} />,
      <Route exact path="/deposit" component={() => (<Deposit />)} />,
      <Route exact path="/myaccount" component={() => (<MyAccount />)} />,
      <Route exact path="/transfer" component={() => (<Transfer />)} />,
      <Route exact path="/updatecard" component={() => (<UpdateCard />)} />,
      <Route exact path="/withdraw" component={() => (<Withdraw />)} />,
      <Route exact path="/logout" component={() => (<LogOut />)} />,
    ];
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <ul className="navbar">
              {this.getLinks()}
            </ul>

            {this.getRoutes()}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
