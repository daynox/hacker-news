import React, {Component} from 'react';
import Search from './components/Search.js';
import Table from './components/Table.js';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
  }

  handleDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(item => isNotId(item));
    this.setState({
      list: updatedList,
    });
  };

  handleSearchChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
        <Search
          searchTerm={searchTerm}
          onSearchChange={this.handleSearchChange}
        >
          Search
        </Search>
        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.handleDismiss}
        />
      </div>
    );
  }
}

export default App;
