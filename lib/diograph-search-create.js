"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
require("document-register-element");
const $ = require("jquery");
const Bloodhound = require("corejs-typeahead/dist/bloodhound");
require("corejs-typeahead/dist/typeahead.jquery");
class DiographSearchCreate extends HTMLElement {
    attachedCallback() {
        this.initializeTypeahead();
    }
    // Fires when an instance of the element is created.
    createdCallback() {
        this.innerHTML = `
      <style>${this.mainCss()}</style>

      <div id="search-create">
        <input class="typeahead" type="text" placeholder="Search for diories...">
        <div id='loading-icon'><img src='loading.gif'></div>
        <div class='search-create__cancel'>X</div>
      </div>
    `;
    }

    initializeTypeahead() {
        var searchResults = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: 'http://diory-server.herokuapp.com/v1/search',
                prepare: function (query, settings) {
                    settings.url = settings.url + '?q=' + query, settings.headers = {
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
                suggestion: function (value) {
                    return `
              <div class="search-result diory-element__element">
                  <div class="diory-element__title">
                    ${value.value}
                  </div>
              </div>`;
                },
                empty: function () {
                    return `<div class="search-result diory-element__element">
                      <div class="diory-element__title">No results.</div>
                    </div>`;
                }
            }
        });
        // X click
        $('.search-create__cancel').click(() => {
            $('.typeahead').typeahead('val', '');
        });
        // Loading starts
        $('#search-create').bind('typeahead:asyncrequest', function () {
            $('#loading-icon').css('display', 'block');
        });
        // Loading ends
        $('#search-create').bind('typeahead:asyncreceive', function () {
            $('#loading-icon').hide();
        });
        // Loadinc cancelled (esc)
        $('#search-create').bind('typeahead:asynccancel', function () {
            $('#loading-icon').hide();
        });
    }
    mainCss() {
        return `
    #search-create {
      position: relative;
    }

    #loading-icon {
      position: absolute;
      display: none;
      top: 14px;
      right: 60px;
    }

    .twitter-typeahead {
      width: 100%;
    }

    .tt-input {
      line-height: 48px;
      font-size: 36px;
      width: 100%;
    }

    .hidden {
      display: none;
    }

    .diory-element__element {
      display: table;
      table-layout: fixed;
      margin: 3px;
      width: 100%;
      height: auto;
      position: relative;
      border: 3px solid lightgray;
      border-radius: 5px;
      background-color: white;
    }

    .diory-element__title {
      display: table-cell;
      text-align: center;
      padding: 10px 5px;
      width: 400px;
    }

    .diory-element__action {
      display: table-cell;
      background-color: lightblue;
      width: 100px;
      height: auto;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }

    .search-create__cancel {
      position: absolute;
      top: 6px;
      right: 16px;
      color: gray;
      font-size: 36px;
      cursor: pointer;
      font-family: Helvetica, sans-serif;
    }
  `;
    }
}
exports.DiographSearchCreate = DiographSearchCreate;
document.registerElement('diograph-search-create', DiographSearchCreate);