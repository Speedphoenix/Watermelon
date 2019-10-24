import React, { Component } from 'react';

function logOut() {
  localStorage.removeItem('userId');
}

export default logOut;
