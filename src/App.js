import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const greeting = 'Welcome to React';
    const user = {
      firstName: 'Doureyd',
      lastName: 'Khelalef',
    };
    return (
      <div className="App">
        <h2>{greeting + ' ' + user.firstName + ' ' + user.lastName}</h2>
      </div>
    );
  }
}

export default App;
