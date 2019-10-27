import React, {Component} from 'react';

class TransferForm extends Component {

  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
    console.log(this.props.bufferTransfer);
    console.log(this.props);
    this.state = {
      message: '',
    };
  }

  verify(event){
    event.preventDefault();

    //// TODO: add a mesage -> are you sure and handle the cancel or the submit
    if( !(getUserByEmail(this.props.bufferTransfer.emailcredited)) )
    {

    }
      this.props.handleSubmit(event);

  }





  render(){
    return(
      <form onSubmit={this.verify}>
        <table className="center">
          <tbody>
          <tr  >
            <td  >Amount: </td>
              <td  >
              <input
              type="number"
              name="amount"
              step="0.01"
              min='0'
              max={this.props.walletBalance/100}
              value={this.props.bufferTransfer.amount}
              onChange={this.props.handleChange}
              required
              />
            </td>
          </tr>
          <tr  >
            <td  >Send to:</td>
            <td  >
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
          <input type="submit" value="Save" />
      </form>
      {this.state.message}
    );
  }

}


export default TransferForm;
