import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { updateInDb, getFromDb, getFromDbWhere } from '../Database/dbops';
import { allTableRows } from './displayers';
import UpdateCard from './UpdateCard';
import AddCard from './AddCard';
import UserForm from '../forms/UserForm';

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
    this.cardAdder = this.cardAdder.bind(this);
    this.newCardDone = this.newCardDone.bind(this);

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
      isAddingCard: false,
    };
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

  startEditing() {
    this.setState({
      bufferUser: { ...this.state.user },
      isEditing: true,
    });
  }

  dispEditingUser() {
    return (
      <UserForm
        handleSubmit={this.handleSubmit}
        bufferUser={this.state.bufferUser}
        handleChange={this.handleChange}
        handleCancel={() => this.setState({ isEditing: false })}
      />
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
    return this.state.cards.map((card) => (
      <li><UpdateCard card={card} /></li>
    ));
  }

  cardAdder() {
    if (this.state.isAddingCard) {
      return (
        <div>
          <h3>Adding a new card</h3>
          <AddCard userId={this.state.user.id} onDone={this.newCardDone} />
        </div>
      );
    }
    return (
      <button type="button" onClick={() => this.setState({ isAddingCard: true })}>
        Add a new card
      </button>
    );
  }

  newCardDone() {
    this.setState({
      cards: getFromDbWhere('cards', (ele) => (ele.userid === this.state.user.id)),
      isAddingCard: false,
    });
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
        <br />
        {this.cardAdder()}
      </div>
    );
  }
}

export default withRouter(MyAccount);
