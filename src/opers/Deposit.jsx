import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { addToBalance, addToDb, getFromDb, updateInDb, getById, getAllFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId, getUserByEmail } from '../Database/dbops';

import DepositForm from '../forms/DepositForm.jsx'


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
      user,
      wallet,
      cards: myCards,
      hasInputedAmount: false,
      bufferDeposit: {
        RIB:'',
        amount:0,
      },
      payin:{
        id: getAvailableId('payins'),
        wallet_id: getWalletIdWhereUserId(user.id),
        amount: 0,
      },
    };
  }


  handleChange(event){
    event.preventDefault();
    const target = event.target;
    this.setState({
      bufferDeposit: Object.assign(this.state.bufferDeposit, {
        [target.name]: target.value,
      }),
    });
  }


  transfering(){
    addToBalance(this.state.payin.wallet_id, this.state.payin.amount);
    addToDb('payins', this.state.payin);
  }

  handleSubmit(event){
    event.preventDefault();
    this.state.payin.amount = this.state.bufferDeposit.amount*100;
    console.log(this.state.payin);
    console.log(getAllFromDb('payins'));
    this.transfering();
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
