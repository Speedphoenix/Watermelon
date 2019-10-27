import React from 'react';

function allTableRows(what, specificCall) {
  return Object.keys(what).map((key, index) => {
    const specificValue = specificCall(key, what[key]);
    return (
      <tr key={key + index.toString()}>
        <td key={key + index.toString() + '1'}>
          {specificValue !== false ? specificValue[0] : key}
        </td>
        <td key={key + index.toString() + '2'}>
          {specificValue !== false ? specificValue[1] : what[key]}
        </td>
      </tr>
    );
  });
}

// not using a default export as we may add more functions here in the future
/* eslint-disable import/prefer-default-export */
export { allTableRows };
