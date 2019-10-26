import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { updateInDb, getFromDb, getAllFromDb } from '../Database/dbops';

function dispUser(user) {
  return (
    <table>
      <tbody>
        <tr key="1">
          <td key="11">First name:</td>
          <td key="12">{user.first_name}</td>
        </tr>
        <tr key="2">
          <td key="21">Last name:</td>
          <td key="22">{user.last_name}</td>
        </tr>
        <tr key="3">
          <td key="31">email:</td>
          <td key="32">{user.email}</td>
        </tr>
        <tr key="4">
          <td key="41">Is admin:</td>
          <td key="42">{user.is_admin ? 'Yes' : 'No'}</td>
        </tr>
        <tr key="5">
          <td key="51">Password (visible, of course):</td>
          <td key="52">{user.password}</td>
        </tr>
      </tbody>
    </table>
  );
}

// we assume the user didn't mess with the localStorage or other stuff
// all the error checks are a pain otherwise
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.getDisplay = this.getDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispEditingUser = this.dispEditingUser.bind(this);

    const userId = localStorage.getItem('userId');
    this.state = {
      user: getFromDb('users', parseInt(userId)),
      isEditing: false,
      bufferUser: {},
    };

    this.timerID = setInterval(() => {
      const newuser = getFromDb('users', this.state.user.id);
      //if (this.state.user.first_name !== newuser.first_name)
//        console.log(getAllFromDb('users'));
    }, 1000);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      bufferUser: Object.assign(this.state.bufferUser, {
        [target.name]: (target.type === 'checkbox' ? target.checked : target.value),
      }),
    });
  }

  handleSubmit(event) {
    // TODO make sure there are no duplicate emails
    event.preventDefault();
    updateInDb('users', this.state.user.id, this.state.bufferUser);
    this.setState({
      isEditing: false,
      user: getFromDb('users', this.state.user.id),
    });
  }

  dispEditingUser() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr key="1">
              <td key="11">First name:</td>
              <td key="12">
                <input
                  type="text"
                  name="first_name"
                  value={this.state.bufferUser.first_name}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key="2">
              <td key="21">Last name:</td>
              <td key="22">
                <input
                  type="text"
                  name="last_name"
                  value={this.state.bufferUser.last_name}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key="3">
              <td key="31">email:</td>
              <td key="32">
                <input
                  type="text"
                  name="email"
                  value={this.state.bufferUser.email}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key="4">
              <td key="41">Is admin (you can change this, of course):</td>
              <td key="42">
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={this.state.bufferUser.is_admin}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key="5">
              <td key="51">Password:</td>
              <td key="52">
                <input
                  type="password"
                  name="password"
                  value={this.state.bufferUser.password}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Save" />
      </form>
    );
  }

  startEditing() {
    this.setState({
      bufferUser: Object.assign({}, this.state.user),
      isEditing: true,
    });
  }

  getDisplay() {
    if (!this.state.isEditing)
    {
      return (
        <div>
          {dispUser(this.state.user)}
          <button onClick={() => this.startEditing()}>Edit</button>
        </div>
      );
    } else {
      return (
        <div>
          {this.dispEditingUser()}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getDisplay()}
      </div>
    );
  }
}

export default withRouter(MyAccount);
