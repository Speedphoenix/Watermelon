import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId,
} from '../Database/dbops';

import WithdrawForm from '../forms/WithdrawForm';


// // TODO: Blindage


export const dispUserBalance = (user, balance) => (
  <table className="center">
    <tbody>
      <tr key="20">
        <td key="201">Balance : </td>
        <td key="202">
          {Number(balance / 100).toFixed(2)}
            €
        </td>
      </tr>
    </tbody>
  </table>
);

class Withdraw extends Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = getFromDb('users', userId);
    const wallet = getFromDbWhere('wallets', (wallet) => (wallet.userid === userId))[0];
    const myCards = getFromDbWhere('cards', (cards) => (cards.userid === userId));


    this.state = {
      user,
      wallet,
      cards: myCards,
      bufferWithdraw: {
        RIB: '',
        amount: 0,
      },
      payout: {
        id: getAvailableId('payouts'),
        wallet_id: getWalletIdWhereUserId(user.id),
        amount: 0,
      },
    };
  }


  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      bufferWithdraw: Object.assign(this.state.bufferWithdraw, {
        [target.name]: target.value,
      }),
    });
  }


  transfering() {
    addToBalance(this.state.payout.wallet_id, (-this.state.payout.amount));
    addToDb('payouts', this.state.payout);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.payout.amount = this.state.bufferWithdraw.amount * 100;
    this.transfering();
  }


  render() {
    return (
      <div>
        {dispUserBalance(this.state.iuser, this.state.wallet.balance)}
        <WithdrawForm
          userid={this.state.user.id}
          bufferWithdraw={this.state.bufferWithdraw}
          cards={this.state.cards}
          walletBalance={this.state.wallet.balance}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>

    );
  }
}

export default Withdraw;
