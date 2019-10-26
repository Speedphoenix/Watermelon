import { withRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import LogIn from './authent/LogIn';
import logOut from './authent/logOut';
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
    this.logUserOut = this.logUserOut.bind(this);
  }

  logUserOut() {
    logOut();
    this.setState({});
  }

  componentDidUpdate() {
    const uid = localStorage.getItem('userId');
    if (uid !== this.state.userId) this.setState({ userId: uid });
  }

  getLinks() {
    const { userId } = this.state;
    if (userId === null) {
      return [
        <li key={1}><Link to="/">Home</Link></li>,
        <li key={2}><Link to="/login">Login</Link></li>,
        <li key={3}><Link to="/register">Register</Link></li>,
      ];
    }
    return [
      <li key={1}><Link to="/">Home</Link></li>,
      <li key={2}><Link to="/addcard">Add a Card</Link></li>,
      <li key={3}><Link to="/deposit">Deposit</Link></li>,
      <li key={4}><Link to="/account">My Account</Link></li>,
      <li key={5}><Link to="/transfer">Make a Transfer</Link></li>,
      <li key={6}><Link to="/withdraw">Withdraw Money</Link></li>,
      <li key={7}><a href="#" onClick={this.logUserOut}>Logout</a></li>,
    ];
  }

  getRoutes() {
    const { userId } = this.state;
    if (userId !== null) {
      return [
        <Route key={1} exact path={['/', '/account']} component={MyAccount} />,
        <Route key={2} exact path="/addcard" component={AddCard} />,
        <Route key={3} exact path="/deposit" component={Deposit} />,
        <Route key={5} exact path="/transfer" component={Transfer} />,
        <Route key={7} exact path="/withdraw" component={Withdraw} />,
      ];
    }
    return [
      <Route key={1} exact path="/" component={() => (<h1>Welcome to Watermelon!</h1>)} />,
      <Route
        key={2}
        exact
        path="/login"
        component={() => <LogIn onDone={() => this.forceUpdate} />}
      />,
      <Route key={3} exact path="/register" component={Register} />,
    ];
  }

  render() {
    return (
      <div className="App">
        <ul className="navbar">
          {this.getLinks()}
        </ul>
        <h3>Note that refreshing will undo any changes made as this app is not connected to any database or API</h3>

        <div className="main">
          {this.getRoutes()}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
