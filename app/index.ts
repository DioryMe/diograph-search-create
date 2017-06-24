import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

var searchResults = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://diory-server.herokuapp.com/v1/search?q=%QUERY',
    wildcard: '%QUERY'
  }
});

$('#search-create .typeahead').typeahead(null, {
  display: 'value',
  source: searchResults
});

