import React from 'react';

function TransferForm(props){
  return(
    <form onSubmit={props.handleSubmit}>

          <table className="center">
            <tbody>
              <tr  >
                <td  >Amount: </td>
                <td  >
                  <input
                    type="number"
                    name="moneyAmount"
                    step="0.01"
                    min='0'
                    max={props.walletBalance/100}
                  />
                </td>
              </tr>
              <tr  >
                <td  >Send to:</td>
                <td  >
                  <input
                    type="email"
                    name="emailSendTo"

                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Save" />
        </form>

  );
}

export default TransferForm;
