import React, {Component} from 'react';
import Search from './components/Search.js';
import Table from './components/Table.js';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_QUERY = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  setSearchTopstories = result => {
    const {hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: {hits: updatedHits, page},
    });
  };

  fetchSearchTopstories = (searchTerm = DEFAULT_QUERY, page = DEFAULT_PAGE) => {
    const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_QUERY}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(URL)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  };

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

  handleSearchSubmit = event => {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  };

  render() {
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTerm={searchTerm}
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.handleDismiss} />}
        <div className="interactions">
          <button
            onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}
          >
            More
          </button>
        </div>
      </div>
    );
  }
}

export default App;
