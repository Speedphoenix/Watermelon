import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { addToDb, getAvailableId } from '../Database/dbops';
import UserForm from '../forms/UserForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      newUser: {
        id: getAvailableId('users'),
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        is_admin: false,
      },
    };
  }

  handleSubmit(event) {
    // TODO make sure there are no duplicate emails
    event.preventDefault();
    addToDb('users', this.state.newUser);
    addToDb('wallets', {
      id: getAvailableId('wallets'),
      balance: 0,
      userid: this.state.newUser.id,
    });
    localStorage.setItem('userId', this.state.newUser.id);
    this.props.history.push('/');
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      newUser: Object.assign(this.state.newUser, {
        [target.name]: (target.type === 'checkbox' ? target.checked : target.value),
      }),
    });
  }

  render() {
    return (
      <div>
        <UserForm
          handleSubmit={this.handleSubmit}
          bufferUser={this.state.newUser}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withRouter(Register);
