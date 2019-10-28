import React, { Component } from 'react';
import { getUserByEmail } from '../Database/dbops';


// // TODO: Blindage
class TransferForm extends Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
    this.state = {
      message: '',
    };
  }

  verify(event) {
    event.preventDefault();

    // // TODO: add a mesage -> are you sure and handle the cancel or the submit
    if (!(getUserByEmail(this.props.bufferTransfer.emailcredited))) {
      this.setState({
        message: (
          <h4 className="error-msg">
              The user you want to credit does not exist !
          </h4>),
      });
    } else if (getUserByEmail(this.props.bufferTransfer.emailcredited) === this.props.userid) {
      this.setState({
        message: (
          <h4 className="error-msg">
            You cannot credit yourself !
          </h4>),
      });
    } else {
      this.setState({
        message: (
          <h4 className="error-msg">
            Money transfered !
          </h4>),
      });
      this.props.handleSubmit(event);
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      message: (
        <h4 className="error-msg"> </h4>),
    });

    this.props.handleChange(event);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.verify}>
          <table className="center">
            <tbody>
              <tr>
                <td>Amount: </td>
                <td>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    min="0"
                    max={this.props.walletBalance / 100}
                    value={this.props.bufferTransfer.amount}
                    onChange={this.props.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Send to:</td>
                <td>
                  <input
                    type="email"
                    name="emailcredited"
                    value={this.props.bufferTransfer.emailcredited}
                    onChange={this.props.handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Transfer" />
        </form>
        {this.state.message}
      </div>
    );
  }
}


export default TransferForm;
