import React, { Component } from 'react';
import { addToDb, getAvailableId } from '../Database/dbops';
import { editingCardForm } from './UpdateCard';

const exampleCard = {
  id: 1,
  last_4: '0000', // string, 4 last card numbers
  brand: 'visa', // string, can be : visa, master_card, american_express, union_pay, jcb
  expired_at: '1970-01-01',
  userid: 1,
};

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
    this.setState({
      card: Object.assign(this.state.card, {
        [target.name]: target.value,
      }),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    addToDb('cards', this.state.card);
    this.props.onDone();
  }

  render() {
    return (
      <div>
        {
          editingCardForm(this.handleSubmit, this.state.card,
            this.handleChange, () => this.props.onDone())
        }
      </div>
    );
  }
}

export default AddCard;
