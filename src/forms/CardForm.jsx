import React, { Component } from 'react';

const cardBrands = [
  'visa',
  'master_card',
  'american_express',
  'union_pay',
  'jcb',
];

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: '',
      ...props.initCard,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // just 4 digits
    if (!/^\d\d\d\d$/.test(this.state.last_4)) {
      this.setState({
        message: (
          <h4 className="error-msg">
            Incorrect format for the last 4 digits.
          </h4>),
      });
      return;
    }

    // could just use a date standard object for this one huh?
    const splitStr = this.state.expired_at.split('-');
    const listedDate = splitStr.map((val) => {
      // parseInt works if there are trailing chars
      if (!/^\d+$/.test(val)) return NaN;
      return parseInt(val, 10);
    });
    if (listedDate.length !== 3
      || splitStr[0].length !== 4
      || splitStr[1].length !== 2
      || splitStr[2].length !== 2
      || listedDate[0] < 1970
      || listedDate[0] >= 3000
      || listedDate[1] < 1
      || listedDate[1] > 12
      || listedDate[2] < 1
      || listedDate[2] > 31) {
      this.setState({
        message: (
          <h4 className="error-msg">
            Incorrect format for the expiry date.
          </h4>),
      });
      return;
    }
    this.props.handleSubmit(event);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
      message: '',
    });
    this.props.handleChange(event);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>Are we allowed to use a datepicker?</h5>
        <table className="center">
          <tbody>
            <tr key={'edit' + this.props.initCard.id + '1'}>
              <td key={'edit' + this.props.initCard.id + '11'}>Last 4:</td>
              <td key={'edit' + this.props.initCard.id + '12'}>
                <input
                  type="text"
                  name="last_4"
                  value={this.props.initCard.last_4}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr key={'edit' + this.props.initCard.id + '2'}>
              <td key={'edit' + this.props.initCard.id + '21'}>Brand:</td>
              <td key={'edit' + this.props.initCard.id + '22'}>
                <select
                  name="brand"
                  value={this.props.initCard.brand}
                  onChange={this.handleChange}
                >
                  {cardBrands.map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr key={'edit' + this.props.initCard.id + '3'}>
              <td key={'edit' + this.props.initCard.id + '31'}>Expires at:</td>
              <td key={'edit' + this.props.initCard.id + '32'}>
                <input
                  type="text"
                  name="expired_at"
                  value={this.props.initCard.expired_at}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.message}
        <input type="submit" value="Save" />
        <button type="button" onClick={this.props.handleCancel}>Cancel</button>
      </form>
    );
  }
}

export default CardForm;
export { cardBrands };
