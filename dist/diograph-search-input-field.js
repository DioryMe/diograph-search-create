"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const Bloodhound = require("corejs-typeahead/dist/bloodhound");
class SearchInputField extends React.Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.bloodHound = this.initializeBloodhound();
    }
    componentWillMount() {
        this.onInputChange(this.props.searchTerm);
    }
    render() {
        return (React.createElement("div", { className: "search-input-field" },
            React.createElement("style", null, searchInputFieldStyles),
            React.createElement("input", { className: "search-input-field__input", value: this.props.searchTerm, onChange: event => this.onInputChange(event.target.value), placeholder: "Search for diories..." }),
            React.createElement("div", { className: cx({ "search-input-field__loading-icon": true, "hidden": !this.isLoading }) },
                React.createElement("img", { src: 'http://diomber.herokuapp.com/images/loading-7c90298423b857a3296b19695231a5f4.gif' })),
            React.createElement("div", { className: 'search-input-field__cancel', onClick: () => { this.onInputChange(""); } }, "X")));
    }
    initializeBloodhound() {
        return new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: localStorage.getItem("endpoint") + "/search",
                prepare: function (query, settings) {
                    settings.url = settings.url + '?q=' + query,
                        settings.headers = {
                            "Authorization": localStorage.getItem("token")
                        };
                    return settings;
                }
            }
        });
    }
    onInputChange(term) {
        let that = this;
        this.props.onSearchTermChange(term);
        if (term.length >= 3) {
            this.isLoading = true;
            this.bloodHound.search(term, () => { }, datums => {
                this.isLoading = false;
                let values;
                if (datums.length > 0) {
                    values = datums;
                }
                else {
                    values = [{ id: 1, value: "No results." }];
                }
                that.props.onSearchResultsChange(values);
            });
        }
        else {
            that.props.onSearchResultsChange([]);
        }
    }
}
exports.SearchInputField = SearchInputField;
let searchInputFieldStyles = `
  .search-input-field {
    position: relative;
  }

  .search-input-field__loading-icon {
    position: absolute;
    display: block;
    top: 22px;
    right: 60px;

  }

  .search-input-field__input {
    line-height: 48px;
    font-size: 36px;
    width: 100%;
  }

  .search-input-field__cancel {
    position: absolute;
    top: 14px;
    right: 16px;
    color: gray;
    font-size: 36px;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
  }

  .hidden {
    display: none
  }
`;
