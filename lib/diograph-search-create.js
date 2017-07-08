"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
require("document-register-element");
var $ = require("jquery");
var Bloodhound = require("corejs-typeahead/dist/bloodhound");
require("corejs-typeahead/dist/typeahead.jquery");
var DiographSearchCreate = (function (_super) {
    __extends(DiographSearchCreate, _super);
    function DiographSearchCreate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiographSearchCreate.prototype.attachedCallback = function () {
        this.initializeTypeahead();
    };
    // Fires when an instance of the element is created.
    DiographSearchCreate.prototype.createdCallback = function () {
        this.innerHTML = "\n      <style>" + this.mainCss() + "</style>\n\n      <div id=\"search-create\">\n        <input class=\"typeahead\" type=\"text\" placeholder=\"Search for diories...\">\n        <div id='loading-icon'><img src='loading.gif'></div>\n        <div class='search-create__cancel'>X</div>\n      </div>\n    ";
    };
    ;
    DiographSearchCreate.prototype.initializeTypeahead = function () {
        var searchResults = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: 'http://diory-server.herokuapp.com/v1/search',
                prepare: function (query, settings) {
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
                suggestion: function (value) {
                    return "\n              <div class=\"search-result diory-element__element\">\n                  <div class=\"diory-element__title\">\n                    " + value.value + "\n                  </div>\n              </div>";
                },
                empty: function () {
                    return "<div class=\"search-result diory-element__element\">\n                      <div class=\"diory-element__title\">No results.</div>\n                    </div>";
                }
            }
        });
        // X click
        $('.search-create__cancel').click(function () {
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
    };
    DiographSearchCreate.prototype.mainCss = function () {
        return "\n    #search-create {\n      position: relative;\n    }\n\n    #loading-icon {\n      position: absolute;\n      display: none;\n      top: 14px;\n      right: 60px;\n    }\n\n    .twitter-typeahead {\n      width: 100%;\n    }\n\n    .tt-input {\n      line-height: 48px;\n      font-size: 36px;\n      width: 100%;\n    }\n\n    .hidden {\n      display: none;\n    }\n\n    .diory-element__element {\n      display: table;\n      table-layout: fixed;\n      margin: 3px;\n      width: 100%;\n      height: auto;\n      position: relative;\n      border: 3px solid lightgray;\n      border-radius: 5px;\n      background-color: white;\n    }\n\n    .diory-element__title {\n      display: table-cell;\n      text-align: center;\n      padding: 10px 5px;\n      width: 400px;\n    }\n\n    .diory-element__action {\n      display: table-cell;\n      background-color: lightblue;\n      width: 100px;\n      height: auto;\n      text-align: center;\n      font-size: 16px;\n      cursor: pointer;\n    }\n\n    .search-create__cancel {\n      position: absolute;\n      top: 6px;\n      right: 16px;\n      color: gray;\n      font-size: 36px;\n      cursor: pointer;\n      font-family: Helvetica, sans-serif;\n    }\n  ";
    };
    ;
    return DiographSearchCreate;
}(HTMLElement));
exports.DiographSearchCreate = DiographSearchCreate;
document.registerElement('diograph-search-create', DiographSearchCreate);
