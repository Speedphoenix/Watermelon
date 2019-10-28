import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId} from '../Database/dbops';

import DepositForm from '../forms/DepositForm';

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


class Deposit extends Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = getFromDb('users', userId);
    const wallet = getFromDbWhere('wallets', (wallet) => (wallet.userid === userId))[0];
    const myCards = getFromDbWhere('cards', (cards) => (cards.userid === userId));


    this.state = {
      userId,
      user,
      wallet,
      cards: myCards,
      //  hasInputedAmount: false,
      bufferDeposit: {
        amount: 0,
      },
      payin: {
        id: getAvailableId('payins'),
        wallet_id: getWalletIdWhereUserId(user.id),
        amount: 0,
      },
    };
  }


  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      bufferDeposit: Object.assign(this.state.bufferDeposit, {
        [target.name]: target.value,
      }),
    });
  }


  transfering(walletId, amount) {
    addToBalance(walletId, amount);
    addToDb('payins', { id: getAvailableId('payins'), wallet_id: walletId, amount });
    this.setState({

        wallet :getFromDbWhere('wallets', (wallet) => (wallet.userid === this.state.userId))[0],
        //  hasInputedAmount: false,
        bufferDeposit: {
          amount: 0,
        },

    });
  }

  handleSubmit(event) {


    event.preventDefault();
    this.transfering(this.state.payin.wallet_id, (this.state.bufferDeposit.amount * 100));
    console.log(this.state.bufferDeposit.amount * 100);
    // this.setState((prevState) => ({
    //     payin:{
    //       ...prevState.bufferDeposit,
    //     amount : prevState.bufferDeposit.amount * 100,
    //   }
    // }));
    // console.log(this.state.payin);
  }


  render() {
    return (
      <div>
        {dispUserBalance(this.state.iuser, this.state.wallet.balance)}
        <DepositForm
          userid={this.state.user.id}
          bufferDeposit={this.state.bufferDeposit}
          cards={this.state.cards}
          walletBalance={this.state.wallet.balance}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>

    );
  }
}

export default Deposit;
