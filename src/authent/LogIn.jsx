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
    const uid = userMatches(this.state.email, this.state.password);
    if (uid === false) {
      this.setState({
        message: <h3 className="error-msg">Email or Password doesn&#39t match</h3>,
      });
    } else {
      this.props.history.push('/');
      localStorage.setItem('userId', uid);
      this.props.onDone();
    }
  }

  render() {
    return (
      <div>
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
        <button onClick={this.handleSubmit}>Go!</button>
        {this.state.message}
      </div>
    );
  }
}

export default withRouter(LogIn);
