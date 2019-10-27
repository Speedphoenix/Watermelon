import React, { Component } from 'react';
import {
  addToBalance, addToDb, getFromDb, updateInDb, getById, getAllFromDb, getFromDbWhere, getAvailableId, getWalletIdWhereUserId, getUserByEmail
} from '../Database/dbops';




class DepositForm extends Component {
  constructor(props) {
    super(props)
    this.verify =this.verify.bind(this);
    this.state = {
      message: '',
    };
  }

  verify(event){
    event.preventDefault();

    this.setState({
          message:(
            <h4 className="error-msg">
            Deposit made
          </h4>),
    });
    this.props.handleSubmit(event);
  }


  render(){
    return(
      <div>
        <form onSubmit={this.verify}>
          <table className="center">
            <tbody>
              <tr>
                <td> CARD : </td>
                <td>
                  <select  name="card_select" >card
                    {this.props.cards.map((val) => (
                      <option key={'edit'+val.id} value={val.id}>{val.last_4}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td> AMOUNT : </td>
                <td>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    min='0'
                    value={this.props.bufferDeposit.amount}
                    onChange={this.props.handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Deposit"/>
        </form>
        {this.state.message}
      </div>
    )


  }
}


export default DepositForm;
