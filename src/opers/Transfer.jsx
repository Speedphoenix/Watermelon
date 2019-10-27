import React, { Component } from 'react';
import { getFromDb, updateInDb, getById, getAllFromDb, getFromDbWhere } from '../Database/dbops';
import TransferForm from '../forms/TransferForm';


export const  dispUserBalance = (user, balance) => {
  return (
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
}






class Transfer extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const user = getFromDb('users', userId);
    const wallet = getFromDbWhere('wallets', (ele) => (ele.userid === userId))[0];


    this.state = {
      user,
      wallet : this.props.wallet,
      isMakingTransfer : false,
      hasInputedAmount : false,
      isSure : false,

    };
  }




  handleSubmit(event){
      event.preventDefault();
//      updateInDb('wallet', this.state.wallet.id, this.state.wallet.balance)

  }

  makingTransfer(){
    return(
      <div>
        <TransferForm
          walletBalance={this.state.wallet.balance}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }



  render() {
    return (
      <div>
      {dispUserBalance(this.state.user, this.state.wallet.balance)}
      {this.makingTransfer()}
      </div>
    );
  }
}

export default Transfer;
