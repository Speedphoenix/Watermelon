import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, updateInDb, getById, getAllFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId, getUserByEmail,
} from '../Database/dbops';


// // TODO: Blindage

class WithdrawForm extends Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
    this.state = {
      message: '',
    };
  }

  verify(event) {
    event.preventDefault();

    this.setState({
      message: (
        <h4 className="error-msg">
            Withdraw made
        </h4>),
    });
    this.props.handleSubmit(event);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.verify}>
          <table className="center">
            <tbody>
              <tr>
                <td> IBAN : </td>
                <td>
                  <input
                    type="text"
                    name="iban"
                    maxLength="26"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td> Amount : </td>
                <td>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    min="0.01"
                    max={this.props.walletBalance / 100}
                    value={this.props.bufferWithdraw.amount}
                    onChange={this.props.handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Withdraw" />
        </form>
        {this.state.message}
      </div>
    );
  }
}


export default WithdrawForm;
