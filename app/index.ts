import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

var searchResults = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'http://diory-server.herokuapp.com/v1/search',
    prepare: function(query, settings) {
      settings.url = settings.url + '?q=' + query,
      settings.headers = {
        "Authorization": "test-token"
      };
      return settings;
    }
  }
});

$('#search-create .typeahead').typeahead({
    hint: false,
    minLength: 3
  }, {
    display: 'value',
    source: searchResults,
    templates: {
      suggestion: function(value) {
        return `
          <div class="search-result diory-element__element">
              <div class="diory-element__title">
                ${value.value}
              </div>
          </div>`
      },
      empty: function() {
        return `<div class="search-result diory-element__element">
                  <div class="diory-element__title">No results.</div>
                </div>`
      }
    }
});

