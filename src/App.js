import React, {Component} from 'react';
import Search from './components/Search.js';
import Table from './components/Table.js';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_QUERY = 'query=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopstories = result => {
    this.setState({result});
  };

  fetchSearchTopstories = (searchTerm = DEFAULT_QUERY) => {
    const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_QUERY}${searchTerm}`;
    fetch(URL)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  };

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  handleDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits},
    });
  };

  handleSearchChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  render() {
    const {searchTerm, result} = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onSearchChange={this.handleSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          list={result.hits}
          searchTerm={searchTerm}
          onDismiss={this.handleDismiss}
        />
      </div>
    );
  }
}

export default App;
