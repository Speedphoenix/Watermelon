import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, updateInDb, getById, getAllFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId, getUserByEmail,
} from '../Database/dbops';
import TransferForm from '../forms/TransferForm';

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

// // TODO: Blindage

class Transfer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.transfering = this.transfering.bind(this);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = getFromDb('users', userId);
    const wallet = getFromDbWhere('wallets', (ele) => (ele.userid === userId))[0];


    this.state = {
      user,
      wallet,
      hasInputedAmount: false,
      transferData: {
        amount: 0,
        emailcredited: '',
      },
      transfer: {
        id: getAvailableId('transfers'),
        debited_wallet_id: userId,
        credited_wallet_id: userId,
        amount: 0,
      },
    };
  }

  transfering() {
    addToBalance(this.state.transfer.credited_wallet_id, this.state.transfer.amount);
    addToBalance(this.state.transfer.debited_wallet_id, (-this.state.transfer.amount));
    addToDb('transfers', this.state.transfer);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.transfer.amount = this.state.transferData.amount * 100;
    this.state.transfer.debited_wallet_id = this.state.wallet.id;
    this.state.transfer.credited_wallet_id = getWalletIdWhereUserId(getUserByEmail(this.state.transferData.emailcredited));
    this.transfering();
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      transferData: Object.assign(this.state.transferData, {
        [target.name]: target.value,
      }),
    });
  }


  render() {
    return (
      <div>
        {dispUserBalance(this.state.user, this.state.wallet.balance)}
        <TransferForm
          userid={this.state.user.id}
          walletBalance={this.state.wallet.balance}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          bufferTransfer={this.state.transferData}
        />
      </div>
    );
  }
}

export default Transfer;
