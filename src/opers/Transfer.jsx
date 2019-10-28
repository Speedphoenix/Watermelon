import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, getFromDbWhere,
  getAvailableId, getWalletIdWhereUserId, getUserByEmail,
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
      userId,
      user,
      wallet,
      transferData: {
        amount: 0,
        emailcredited: '',
      },
      transfer: {
        debited_wallet_id: userId,
        credited_wallet_id: userId,
      },
    };
  }

  transfering(credited_wallet_id,debited_wallet_id, amount) {
    addToBalance(credited_wallet_id, amount);
    addToBalance(debited_wallet_id, (-amount));
    addToDb('transfers', {id:getAvailableId('transfers'), debited_wallet_id, credited_wallet_id, amount});
    this.setState({

        wallet :getFromDbWhere('wallets', (wallet) => (wallet.userid === this.state.userId))[0],
        //  hasInputedAmount: false,
        transfer: {
          debited_wallet_id: this.state.userId,
          credited_wallet_id: this.state.userId,
          amount: 0,
        },

    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.transferData.amount);
    this.transfering(getWalletIdWhereUserId(getUserByEmail( this.state.transferData.emailcredited)),
     this.state.transfer.debited_wallet_id, this.state.transferData.amount*100);
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
