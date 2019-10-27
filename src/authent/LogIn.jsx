import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { userMatches } from '../Database/dbops';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = userMatches(this.state.email, this.state.password);
    if (user === false) {
      this.setState({
        message: <h3 className="error-msg">Email or Password do not match</h3>,
      });
    } else {
      localStorage.setItem('userId', user.id);
      this.props.history.push('/');
      this.props.onDone();
    }
  }

  render() {
    return (
      <div>
        <p>
          For testing purposes, you may use
          <br />
          email:&nbsp;
          <code>example@example.com</code>
          <br />
          password:&nbsp;
          <code>some pass</code>
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="email"
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="password"
          />
          <br />
          <input type="submit" value="Go!" />
        </form>
        {this.state.message}
      </div>
    );
  }
}

export default withRouter(LogIn);
