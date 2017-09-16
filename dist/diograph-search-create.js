"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const diograph_search_input_field_1 = require("./diograph-search-input-field");
const diograph_search_results_1 = require("./diograph-search-results");
class DiographSearchCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchResults: [], searchTerm: "" };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(diograph_search_input_field_1.SearchInputField, { searchTerm: this.state.searchTerm, onSearchTermChange: newTerm => this.setState({ searchTerm: newTerm }), onSearchResultsChange: results => this.setState({ searchResults: results }) }),
            React.createElement(diograph_search_results_1.SearchResults, { searchResults: this.state.searchResults, onFocusClick: dioryId => this.onFocusClick(dioryId) })));
    }
    onFocusClick(dioryId) {
        this.setState({ searchResults: [] });
        this.setState({ searchTerm: "" });
        this.props.onFocusClick(dioryId);
    }
}
exports.DiographSearchCreate = DiographSearchCreate;
