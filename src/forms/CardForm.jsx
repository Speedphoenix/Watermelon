import React from 'react';

const cardBrands = [
  'visa',
  'master_card',
  'american_express',
  'union_pay',
  'jcb',
];

function CardForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <h4>Note that the format on these is not checked</h4>
      <h5>Are we allowed to use a datepicker?</h5>
      <table className="center">
        <tbody>
          <tr key={'edit' + props.initCard.id + '1'}>
            <td key={'edit' + props.initCard.id + '11'}>Last 4:</td>
            <td key={'edit' + props.initCard.id + '12'}>
              <input
                type="text"
                name="last_4"
                value={props.initCard.last_4}
                onChange={props.handleChange}
              />
            </td>
          </tr>
          <tr key={'edit' + props.initCard.id + '2'}>
            <td key={'edit' + props.initCard.id + '21'}>Brand:</td>
            <td key={'edit' + props.initCard.id + '22'}>
              <select
                name="brand"
                value={props.initCard.brand}
                onChange={props.handleChange}
              >
                {cardBrands.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr key={'edit' + props.initCard.id + '3'}>
            <td key={'edit' + props.initCard.id + '31'}>Expires at:</td>
            <td key={'edit' + props.initCard.id + '32'}>
              <input
                type="text"
                name="expired_at"
                value={props.initCard.expired_at}
                onChange={props.handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="Save" />
      <button type="button" onClick={props.handleCancel}>Cancel</button>
    </form>
  );
}

export default CardForm;
export { cardBrands };
