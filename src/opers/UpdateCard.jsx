import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromDb, updateInDb } from '../Database/dbops';
import { allTableRows } from './displayers';
import CardForm from '../forms/CardForm';

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.startEditing = this.startEditing.bind(this);
    this.cardDisp = this.cardDisp.bind(this);
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
      bufferCard: { ...this.state.card },
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
        <CardForm
          handleSubmit={this.handleSubmit}
          initCard={this.state.bufferCard}
          handleChange={this.handleChange}
          handleCancel={this.cancelEditing}
        />
      </div>
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
