import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromDb } from '../Database/dbops';

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    const cardId = this.props.match.params.cardId;
    const card = getFromDb('cards', parseInt(cardId));
    if (card === null) {
      this.state = {
        message: <h3 className="error-msg">This card does not exist</h3>,
      };
    } else {
      this.state = {
        message: <h3>We'll made this editable later</h3>,
        card,
      };
    }
  }

  cardDisp(card) {
    let rep = [];
    Object.keys(card).map((key, index) => {
      rep.push(
        <tr key={index}>
          <td key={index.toString() + "1"}>{key}</td>
          <td key={index.toString() + "2"}>{card[key]}</td>
        </tr>
      );
    });
    return rep;
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.cardDisp(this.state.card)}
          </tbody>
        </table>
        {this.state.message}
      </div>
    );
  }
}


UpdateCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      // this is actually a numeric string
      cardId: PropTypes.string.isRequired,
    }),
  }),
};

export default UpdateCard;
