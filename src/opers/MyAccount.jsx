import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { updateInDb, getFromDb, getFromDbWhere } from '../Database/dbops';
import { allTableRows } from './displayers';
import UpdateCard from './UpdateCard';

function dispUser(user, balance) {
  return (
    <table className="center">
      <tbody>
        { allTableRows(user, (key, val) => {
          if (key === 'is_admin') return ['Is admin?', (val ? 'Yes' : 'No')];
          return false;
        }) }
        <tr key="20">
          <td key="201">Balance</td>
          <td key="202">
            {Number(balance / 100).toFixed(2)}
            €
          </td>
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
    this.getUserDisplay = this.getUserDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dispEditingUser = this.dispEditingUser.bind(this);
    this.cardsDisplay = this.cardsDisplay.bind(this);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = getFromDb('users', userId);
    const wallet = getFromDbWhere('wallets', (ele) => (ele.userid === userId))[0];
    const myCards = getFromDbWhere('cards', (ele) => (ele.userid === userId));

    this.state = {
      user,
      wallet,
      cards: myCards,
      isEditing: false,
      bufferUser: {},
    };
  }

  dispEditingUser() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table className="center">
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

  getUserDisplay() {
    if (!this.state.isEditing) {
      return (
        <div>
          {dispUser(this.state.user, this.state.wallet.balance)}
          <button type="button" onClick={() => this.startEditing()}>Edit</button>
        </div>
      );
    }
    return (
      <div>
        {this.dispEditingUser()}
      </div>
    );
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

  handleChange(event) {
    const target = event.target;
    this.setState({
      bufferUser: Object.assign(this.state.bufferUser, {
        [target.name]: (target.type === 'checkbox' ? target.checked : target.value),
      }),
    });
  }

  cardsDisplay() {
    return this.state.cards.map((card, index) => (
      <li><UpdateCard card={card} /></li>
    ));
  }

  render() {
    return (
      <div>
        <div>
          {this.getUserDisplay()}
        </div>
        <hr />
        <h4>My cards</h4>
        <ul className="cards-list">
          {this.cardsDisplay()}
        </ul>
      </div>
    );
  }
}

export default withRouter(MyAccount);
