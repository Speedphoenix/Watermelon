import { BrowserRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

// localStorage.setItem('userId', unInt);
// localStorage.getItem('userId');

class App extends Component {
  constructor(props) {
    super(props);
  }

  getLinks() {
    return [];
  }

  getRoutes() {
    return [];
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <ul>
              {/* put the links here */}
              <li><Link to="/">Boy</Link></li>
            </ul>

            {/* put the routes here here */}
            <Route exact path="/" component={() => (<p>haha</p>)}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
