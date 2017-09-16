"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return this.renderSearchResults();
    }
    renderSearchResults() {
        let searchResultsJSX = this.props.searchResults.map((result) => {
            return (React.createElement("div", { className: "search-result__element", key: result.id, onClick: event => this.props.onFocusClick(result.id) },
                React.createElement("div", { className: "search-result__title" }, result.value),
                React.createElement("style", null, searchResultsStyles)));
        });
        return React.createElement("div", null, searchResultsJSX);
    }
}
exports.SearchResults = SearchResults;
let searchResultsStyles = `
  .search-result__element {
    display: table;
    table-layout: fixed;
    margin: 3px;
    width: 100%;
    height: auto;
    position: relative;
    border: 3px solid lightgray;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }

  .search-result__title {
    display: table-cell;
    text-align: center;
    padding: 10px 5px;
    width: 400px;
  }

  .search-result__action {
    display: table-cell;
    background-color: lightblue;
    width: 100px;
    height: auto;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
`;
