import React, { Component } from 'react';
import { addToDb, getAvailableId } from '../Database/dbops';
import CardForm from '../forms/CardForm';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      card: {
        id: getAvailableId('cards'),
        last_4: '0000',
        brand: 'visa',
        expired_at: '1970-01-01',
        userid: props.userId,
      },
    };
  }

  handleChange(event) {
    const target = event.target;
    this.setState((prevState) => ({
      card: Object.assign(prevState.card, {
        [target.name]: target.value,
      }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    addToDb('cards', this.state.card);
    this.props.onDone();
  }

  render() {
    return (
      <div>
        <CardForm
          handleSubmit={this.handleSubmit}
          initCard={this.state.card}
          handleChange={this.handleChange}
          handleCancel={() => this.props.onDone()}
        />
      </div>
    );
  }
}

export default AddCard;
