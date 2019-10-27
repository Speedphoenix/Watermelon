import { withRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import LogIn from './authent/LogIn';
import logOut from './authent/logOut';
import Register from './authent/Register';
import Deposit from './opers/Deposit';
import MyAccount from './opers/MyAccount';
import Transfer from './opers/Transfer';
import Withdraw from './opers/Withdraw';
import logo from './logo.png';
import { getFromDb } from './Database/dbops';

// localStorage.setItem('userId', unInt);
// localStorage.getItem('userId');

class App extends Component {
  constructor(props) {
    super(props);
    let userId = localStorage.getItem('userId');
    if (getFromDb('users', parseInt(userId), 10) === null) {
      userId = null;
      localStorage.removeItem('userId');
    }
    this.state = {
      userId: userId,
    };
    this.logUserOut = this.logUserOut.bind(this);
  }

  componentDidUpdate() {
    const uid = localStorage.getItem('userId');
    if (uid !== this.state.userId) this.setState({ userId: uid });
  }

  getLinks() {
    const { userId } = this.state;
    if (userId === null) {
      return [
        <li key="navbarlogo"><Link to="/"><img className="navbar-logo" src={logo} alt="logo" /></Link></li>,
        <li key="navbar1"><Link to="/">Home</Link></li>,
        <li key="navbar2"><Link to="/login">Login</Link></li>,
        <li key="navbar3"><Link to="/register">Register</Link></li>,
      ];
    }
    return [
      <li key="navbarlogo"><Link to="/"><img className="navbar-logo" src={logo} alt="logo" /></Link></li>,
      <li key="navbar1"><Link to="/">Home</Link></li>,
      <li key="navbar3"><Link to="/deposit">Deposit</Link></li>,
      <li key="navbar4"><Link to="/account">My Account</Link></li>,
      <li key="navbar5"><Link to="/transfer">Make a Transfer</Link></li>,
      <li key="navbar6"><Link to="/withdraw">Withdraw Money</Link></li>,
      <li key="navbar7"><a href="#" onClick={this.logUserOut}>Logout</a></li>,
    ];
  }

  getRoutes() {
    const { userId } = this.state;
    if (userId !== null) {
      return [
        <Route key="route1" exact path={['/', '/account']} component={MyAccount} />,
        <Route key="route3" exact path="/deposit" component={Deposit} />,
        <Route key="route5" exact path="/transfer" component={Transfer} />,
        <Route key="route7" exact path="/withdraw" component={Withdraw} />,
      ];
    }
    return [
      <Route key="route1" exact path="/" component={() => (<h1>Welcome to Watermelon!</h1>)} />,
      <Route
        key="route2"
        exact
        path="/login"
        component={() => <LogIn onDone={() => this.forceUpdate} />}
      />,
      <Route key="route3" exact path="/register" component={Register} />,
    ];
  }

  logUserOut() {
    logOut();
    this.setState({});
  }

  render() {
    return (
      <div className="App">
        <ul className="navbar">
          {this.getLinks()}
        </ul>
        <h3>
          Note that refreshing will undo any changes made
          as this app is not connected to any database or API
        </h3>

        <div className="main">
          {this.getRoutes()}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
