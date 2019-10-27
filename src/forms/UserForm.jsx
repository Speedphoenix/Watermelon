import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);

    this.state = {
      message: '',
      confirmedPass: '',
    };
  }

  verify(event) {
    event.preventDefault();
    if (this.state.confirmedPass === this.props.bufferUser.password) {
      this.props.handleSubmit(event);
    } else {
      this.setState({ message: <h4 className="error-msg">Passwords do not match</h4> });
    }
  }

  render() {
    return (
      <form onSubmit={this.verify}>
        <table className="center">
          <tbody>
            <tr key={'editu' + this.props.bufferUser.id + '1'}>
              <td key={'editu' + this.props.bufferUser.id + '11'}>First name:</td>
              <td key={'editu' + this.props.bufferUser.id + '12'}>
                <input
                  type="text"
                  name="first_name"
                  value={this.props.bufferUser.first_name}
                  onChange={this.props.handleChange}
                  required
                />
              </td>
            </tr>
            <tr key={'editu' + this.props.bufferUser.id + '2'}>
              <td key={'editu' + this.props.bufferUser.id + '21'}>Last name:</td>
              <td key={'editu' + this.props.bufferUser.id + '22'}>
                <input
                  type="text"
                  name="last_name"
                  value={this.props.bufferUser.last_name}
                  onChange={this.props.handleChange}
                  required
                />
              </td>
            </tr>
            <tr key={'editu' + this.props.bufferUser.id + '3'}>
              <td key={'editu' + this.props.bufferUser.id + '31'}>Email:</td>
              <td key={'editu' + this.props.bufferUser.id + '32'}>
                <input
                  type="email"
                  name="email"
                  value={this.props.bufferUser.email}
                  onChange={this.props.handleChange}
                  required
                />
              </td>
            </tr>
            <tr key={'editu' + this.props.bufferUser.id + '4'}>
              <td key={'editu' + this.props.bufferUser.id + '41'}>Is admin:</td>
              <td key={'editu' + this.props.bufferUser.id + '42'}>
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={this.props.bufferUser.is_admin}
                  onChange={this.props.handleChange}
                />
              </td>
            </tr>
            <tr key={'editu' + this.props.bufferUser.id + '5'}>
              <td key={'editu' + this.props.bufferUser.id + '51'}>Password:</td>
              <td key={'editu' + this.props.bufferUser.id + '52'}>
                <input
                  type="password"
                  name="password"
                  value={this.props.bufferUser.password}
                  onChange={(event) => {
                    this.setState({ message: '' });
                    this.props.handleChange(event);
                  }}
                  required
                />
              </td>
            </tr>
            <tr key={'editu' + this.props.bufferUser.id + '6'}>
              <td key={'editu' + this.props.bufferUser.id + '61'}>Password (again):</td>
              <td key={'editu' + this.props.bufferUser.id + '62'}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmedPass}
                  onChange={(event) => {
                    this.setState({
                      confirmedPass: event.target.value,
                      message: '',
                    });
                  }}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.message}
        <input type="submit" value="Save" />
        {this.props.handleCancel === undefined
          ? ''
          : <button type="button" onClick={this.props.handleCancel}>Cancel</button>}
      </form>
    );
  }
}

export default UserForm;
