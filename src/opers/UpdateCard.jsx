import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromDb, updateInDb } from '../Database/dbops';
import { allTableRows } from './displayers';

const cardBrands = [
  'visa',
  'master_card',
  'american_express',
  'union_pay',
  'jcb',
];

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.startEditing = this.startEditing.bind(this);
    this.cardDisp = this.cardDisp.bind(this);
    this.editingCardDisp = this.editingCardDisp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      card: this.props.card,
      isEditing: false,
      bufferCard: {},
    };
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      bufferCard: Object.assign(this.state.bufferCard, {
        [target.name]: target.value,
      }),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    updateInDb('cards', this.state.card.id, this.state.bufferCard);
    this.setState({
      isEditing: false,
      card: getFromDb('cards', this.state.card.id),
    });
  }

  startEditing() {
    this.setState({
      bufferCard: Object.assign({}, this.state.card),
      isEditing: true,
    });
  }

  cardDisp() {
    if (!this.state.isEditing) {
      return (
        <div>
          <table className="center">
            <tbody>
              {allTableRows(this.state.card, () => false)}
            </tbody>
          </table>
          <button type="button" onClick={() => this.startEditing()}>Edit</button>
        </div>
      );
    }
    return (
      <div>
        {this.editingCardDisp()}
      </div>
    );
  }

  editingCardDisp() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Note that the format on these is not checked</h4>
        <h5>Are we allowed to use a datepicker?</h5>
        <table className="center">
          <tbody>
            <tr key="1">
              <td key="11">Last 4:</td>
              <td key="12">
                <input
                  type="text"
                  name="last_4"
                  value={this.state.bufferCard.last_4}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key="1">
              <td key="11">Brand:</td>
              <td key="12">
                <select
                  name="brand"
                  value={this.state.bufferCard.brand}
                  onChange={this.handleChange}
                >
                  {cardBrands.map((val, index) => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr key="1">
              <td key="11">Expires at:</td>
              <td key="12">
                <input
                  type="text"
                  name="expired_at"
                  value={this.state.bufferCard.expired_at}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Save" />
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.cardDisp()}
      </div>
    );
  }
}


UpdateCard.propTypes = {
  // need to replace this with the way it should look...
  card: PropTypes.object.isRequired,
};

export default UpdateCard;
