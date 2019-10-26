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

function editingCardForm(handleSubmit, initCard, handleChange, handleCancel) {
  return (
    <form onSubmit={handleSubmit}>
      <h4>Note that the format on these is not checked</h4>
      <h5>Are we allowed to use a datepicker?</h5>
      <table className="center">
        <tbody>
          <tr key={'edit' + initCard.id + '1'}>
            <td key={'edit' + initCard.id + '11'}>Last 4:</td>
            <td key={'edit' + initCard.id + '12'}>
              <input
                type="text"
                name="last_4"
                value={initCard.last_4}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr key={'edit' + initCard.id + '2'}>
            <td key={'edit' + initCard.id + '21'}>Brand:</td>
            <td key={'edit' + initCard.id + '22'}>
              <select
                name="brand"
                value={initCard.brand}
                onChange={handleChange}
              >
                {cardBrands.map((val, index) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr key={'edit' + initCard.id + '3'}>
            <td key={'edit' + initCard.id + '31'}>Expires at:</td>
            <td key={'edit' + initCard.id + '32'}>
              <input
                type="text"
                name="expired_at"
                value={initCard.expired_at}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="Save" />
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.startEditing = this.startEditing.bind(this);
    this.cardDisp = this.cardDisp.bind(this);
    this.editingCardDisp = this.editingCardDisp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);

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

  cancelEditing() {
    this.setState({
      isEditing: false,
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
    return editingCardForm(this.handleSubmit,
      this.state.bufferCard, this.handleChange, this.cancelEditing);
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
export { editingCardForm };
