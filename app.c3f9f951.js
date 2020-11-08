// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/vue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vue = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vue = /*#__PURE__*/function () {
  function Vue() {
    _classCallCheck(this, Vue);
  }

  _createClass(Vue, [{
    key: "getInitTemplate",
    value: function getInitTemplate(data) {
      return "\n    <table class=\"table table-responsive\">\n      <tbody>\n        <tr>\n          <td></td>\n          <td class=\"score\" data-choiceid=\"".concat(data.choices[0].id, "\">\n            <div class=\"score__content\">").concat(data.choices[0].score, "</div>\n\n          </td>\n          <td id=\"lastscorecol\" class=\"add-col\"></td>\n        </tr>\n        <tr>\n          <td></td>\n          <td data-choiceid=\"").concat(data.choices[0].id, "\"  class=\"choice cell\">\n            <div\n              class=\"choice-content text-center\"\n              contenteditable=\"true\"\n            >").concat(data.choices[0].content, "\n            </div>\n            <span class=\"choice-btn__del btn-del\">Enlever</span>\n          </td>\n          <td class=\"addCell-choice add-col cell\">\n            <div id=\"addChoice-btn\">\n              Ajouter\n            </div>\n          </td>\n        </tr>\n        <tr class=\"factorRow\">\n          <td data-factorid=\"").concat(data.factors[0].id, "\" class=\"factor cell\">\n            <div\n              class=\"factor-content text-center\"\n              contenteditable=\"true\"\n            >\n              ").concat(data.factors[0].content, "\n            </div>\n            <span class=\"factor-btn__del btn-del\">Enlever</span>\n          </td>\n          <td class=\"rate\" data-choiceid=\"").concat(data.choices[0].id, "\" data-factorid=\"").concat(data.factors[0].id, "\">\n          -\n          </td>\n        </tr>\n        <tr>\n          <td class=\"addCell-factor cell text-center\">\n            <div id=\"addFactor-btn\">\n              Ajouter\n            </div>\n          </td>\n          <td></td>\n          <td></td>\n        </tr>\n      </tbody>\n    </table>\n    ");
    }
    /**
         * @returns {HTMLElement}
         */

  }, {
    key: "getFirstRow",
    value: function getFirstRow() {
      return document.querySelector('tr');
    }
    /**
         * @returns {HTMLElement}
         */

  }, {
    key: "getSecondRow",
    value: function getSecondRow() {
      return document.querySelectorAll('tr')[1];
    }
    /**
         * @returns {HTMLElement}
         */

  }, {
    key: "getThirdRow",
    value: function getThirdRow() {
      return document.querySelectorAll('tr')[2];
    }
    /**
         * @returns {Node}
         */

  }, {
    key: "cloneCell",
    value: function cloneCell(cell) {
      return cell.cloneNode(true);
    }
  }, {
    key: "createFactorCell",
    value: function createFactorCell(data) {
      var factorCell = this.cloneCell(document.querySelector("td.factor[data-factorid='0']"));
      factorCell.dataset.factorid = data.lastFactorId;
      factorCell.firstElementChild.innerHTML = "Facteur ".concat(data.lastFactorId);
      return factorCell;
    }
  }, {
    key: "createChoiceCell",
    value: function createChoiceCell(data) {
      var choiceCell = this.cloneCell(document.querySelector(".choice.cell[data-choiceid='0']"));
      choiceCell.dataset.choiceid = data.lastChoiceId;
      choiceCell.firstElementChild.innerHTML = "Choix ".concat(data.lastChoiceId);
      return choiceCell;
    }
  }, {
    key: "createRateCell",
    value: function createRateCell() {
      var cellRate = this.cloneCell(document.querySelector("[data-choiceid='0'][data-factorid='0']"));
      cellRate.innerHTML = '-';
      return cellRate;
    }
  }, {
    key: "createScoreCell",
    value: function createScoreCell(data) {
      var cellScore = this.cloneCell(document.querySelector(".score[data-choiceid='0']"));
      cellScore.dataset.choiceid = data.lastChoiceId;
      cellScore.firstElementChild.innerHTML = '0';
      return cellScore;
    }
    /**
         * @returns {HTMLCollection}
         */

  }, {
    key: "createNewRow",
    value: function createNewRow(data) {
      var _this = this;

      var newRow = this.createNewDOMELement('tr', 'factorRow');
      newRow.appendChild(this.createFactorCell(data)); // TODO fix the count of choices

      data.choices.filter(function (c) {
        return c.visible === true;
      }).forEach(function (choice) {
        var cell = _this.createRateCell();

        cell.dataset.choiceid = choice.id;
        cell.dataset.factorid = data.lastFactorId;
        newRow.appendChild(cell);
      });
      return newRow;
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "insertNewRow",
    value: function insertNewRow(data) {
      var tbody = document.querySelector('tbody');
      var lastRow = document.querySelectorAll('tr');
      tbody.insertBefore(this.createNewRow(data), lastRow[lastRow.length - 1]);
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "insertNewColumn",
    value: function insertNewColumn(data) {
      var lastTdColumn = document.getElementById('lastscorecol');
      var addTdColumn = this.getSecondRow().lastElementChild;
      var factorRow = document.getElementsByClassName('factorRow');
      this.getFirstRow().insertBefore(this.createScoreCell(data), lastTdColumn);
      this.getSecondRow().insertBefore(this.createChoiceCell(data), addTdColumn);
      var factorRowLength = factorRow.length;

      for (var i = 0; i < factorRowLength; i++) {
        var visibleFactors = data.factors.filter(function (f) {
          return f.visible === true;
        });
        var cell = this.createRateCell();
        cell.dataset.choiceid = data.lastChoiceId;
        cell.dataset.factorid = visibleFactors[i].id;
        factorRow[i].appendChild(cell);
      }
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "deleteRow",
    value: function deleteRow(row) {
      if (document.querySelectorAll('tr.factorRow').length > 1) {
        row.parentNode.remove();
      }
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "deleteColumn",
    value: function deleteColumn(column) {
      if (document.querySelectorAll('td.choice').length > 1) {
        var columns = document.querySelectorAll("td[data-choiceid='".concat(column, "']"));
        var columnsLength = columns.length;

        for (var i = 0; i < columnsLength; i++) {
          columns[i].remove();
        }
      }
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "updateScore",
    value: function updateScore(id, score) {
      var cellScore = document.querySelector(".score[data-choiceid='".concat(id, "']"));
      cellScore.firstElementChild.innerHTML = score;
      cellScore.lastElementChild.value = score;
    }
  }, {
    key: "incrementRate",
    value: function incrementRate(e) {
      var a = isNaN(e.target.textContent) ? 0 : e.target.textContent;

      if (a < 3) {
        a++;
      } else {
        a = 0;
      }

      e.target.innerHTML = a;
      return a;
    }
  }, {
    key: "setFocus",
    value: function setFocus(el) {
      el.focus();
      window.getSelection().selectAllChildren(el);
    }
    /**
         * @param {String} choiceContent
         */

  }, {
    key: "renderBestChoice",
    value: function renderBestChoice(choiceContent) {
      var resultfield = document.getElementById('best-choice');
      var cleanChoiceContent = choiceContent.replace(/\r?\n|\r/g, '');
      resultfield.innerText = "The best choice is : ".concat(cleanChoiceContent);
    }
    /**
         * Set new HTML Element with main properties
         * @param {string} tag
         * @param {string} classes
         * @param {string} id
         * @param {string} choiceid
         * @param {string} factorid
         */

  }, {
    key: "createNewDOMELement",
    value: function createNewDOMELement() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
      var classes = arguments.length > 1 ? arguments[1] : undefined;
      var id = arguments.length > 2 ? arguments[2] : undefined;
      var choiceid = arguments.length > 3 ? arguments[3] : undefined;
      var factorid = arguments.length > 4 ? arguments[4] : undefined;
      var newDOMELement = document.createElement(tag);

      if (classes !== undefined) {
        newDOMELement.setAttribute('class', classes);
      }

      if (id !== undefined) {
        newDOMELement.setAttribute('id', id);
      }

      if (choiceid !== undefined) {
        newDOMELement.dataset.choiceid = choiceid;
      }

      if (factorid !== undefined) {
        newDOMELement.dataset.factorid = factorid;
      }

      return newDOMELement;
    }
  }]);

  return Vue;
}();

exports.Vue = Vue;
},{}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Data = /*#__PURE__*/function () {
  function Data() {
    _classCallCheck(this, Data);

    this.lastChoiceId = 0;
    this.lastFactorId = 0;
    this.choices = [{
      id: 0,
      content: 'Edit here your choice',
      score: 0,
      visible: true
    }];
    this.factors = [{
      id: 0,
      content: 'Factor 0',
      rate: 0,
      visible: true,
      factorsRate: [{
        choiceId: 0,
        rate: 0
      }]
    }];
  }
  /**
       * @returns {Object}
       */


  _createClass(Data, [{
    key: "getChoice",
    value: function getChoice(id) {
      return this.choices.find(function (choice) {
        return choice.id === id;
      });
    }
    /**
         * return all choices
         * @returns {Array}
         */

  }, {
    key: "getAllChoices",
    value: function getAllChoices() {
      return this.choices;
    }
    /**
         * @returns {Object}
         */

  }, {
    key: "getFactor",
    value: function getFactor(id) {
      return this.factors.find(function (factor) {
        return factor.id === id;
      });
    }
    /**
         * return all factors
         * @returns {Array}
         */

  }, {
    key: "getAllFactors",
    value: function getAllFactors() {
      return this.factors;
    }
  }, {
    key: "getFactorRate",
    value: function getFactorRate(factorId, ChoiceId) {
      var result;
      this.factors.forEach(function (factor) {
        factor.factorsRate.forEach(function (rate) {
          if (factor.id === factorId && rate.choiceId === ChoiceId) {
            result = rate;
          }
        });
      });
      return result;
    }
    /**
         *  @returns {Array}
         */

  }, {
    key: "getBestChoice",
    value: function getBestChoice() {
      var high = this.choices.filter(function (c) {
        return c.visible === true;
      }).reduce(function (prev, current) {
        return prev.score > current.score ? prev : current;
      });
      return this.choices.filter(function (c) {
        return c.score === high.score;
      });
    }
    /**
         * set a new choice
         * @param {Object} choice
         */

  }, {
    key: "setChoice",
    value: function setChoice(choice) {
      this.choices.push(choice);
    }
    /**
         * set a new factor
         * @param {Object} factor
         */

  }, {
    key: "setFactor",
    value: function setFactor(factor) {
      this.factors.push(factor);
    }
    /**
         * set new factor rate
         * @param {Object} factorRate
         *
         * TODO : just set rate if object already exist
         */

  }, {
    key: "setFactorRate",
    value: function setFactorRate(fid, cid, rate) {
      this.factors.forEach(function (factor) {
        if (factor.id === fid) {
          factor.factorsRate.push({
            choiceId: cid,
            rate: rate
          });
        }
      });
    }
  }, {
    key: "setRate",
    value: function setRate(fid, cid, scor) {
      this.factors.forEach(function (factor) {
        if (factor.id === fid) {
          factor.factorsRate.forEach(function (rate) {
            if (rate.choiceId === cid) {
              rate.rate = scor;
            }
          });
        }
      });
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "setFactorVisible",
    value: function setFactorVisible(id) {
      this.factors.forEach(function (factor) {
        if (factor.id === id && factor.visible === false) {
          factor.visible = true;
        }
      });
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "setFactorInvisible",
    value: function setFactorInvisible(id) {
      this.factors.forEach(function (factor) {
        if (factor.id === id && factor.visible === true) {
          factor.visible = false;
        }
      });
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "setChoiceVisible",
    value: function setChoiceVisible(id) {
      this.choices.forEach(function (choice) {
        if (choice.id === id && choice.visible === false) {
          choice.visible = true;
        }
      });
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "setChoiceInvisible",
    value: function setChoiceInvisible(id) {
      this.choices.forEach(function (choice) {
        if (choice.id === id && choice.visible === true) {
          choice.visible = false;
        }
      });
    }
    /**
         * @returns {VoidFunction}
         */

  }, {
    key: "setScore",
    value: function setScore() {
      var _this = this;

      this.choices.forEach(function (c) {
        var l = 0;

        _this.factors.forEach(function (f) {
          f.factorsRate.forEach(function (r) {
            if (r.choiceId === c.id) {
              l += r.rate;
            }
          });
        });

        c.score = l;
      });
    }
  }]);

  return Data;
}();

exports.Data = Data;
},{}],"js/controler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controler = void 0;

var _vue = require("./vue.js");

var _model = require("./model.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controler = /*#__PURE__*/function () {
  function Controler(wrapper) {
    _classCallCheck(this, Controler);

    this.wrapper = wrapper;
    this.vue = new _vue.Vue();
    this.data = new _model.Data();
  }
  /**
       * Return and increment a new choice id
       * @returns {Number}
       */


  _createClass(Controler, [{
    key: "incrementLastChoiceId",
    value: function incrementLastChoiceId() {
      return this.data.lastChoiceId++;
    }
    /**
         * Return and increment a new factor id
         * @returns {Number}
         */

  }, {
    key: "incrementLastFactorId",
    value: function incrementLastFactorId() {
      return this.data.lastFactorId++;
    }
    /**
     * @returns {VoidFunction}
     */

  }, {
    key: "addFactor",
    value: function addFactor() {
      var _this = this;

      this.incrementLastFactorId();
      this.data.setFactor({
        id: this.data.lastFactorId,
        content: "Factor ".concat(this.data.lastFactorId),
        rate: 0,
        visible: true,
        factorsRate: []
      });
      var sortChoices = this.data.choices.filter(function (c) {
        return c.visible === true;
      });
      sortChoices.forEach(function (c) {
        _this.data.setFactorRate(_this.data.lastFactorId, c.id, 0);
      });
      this.vue.insertNewRow(this.data);
    }
    /**
     * @returns {VoidFunction}
     */

  }, {
    key: "addChoice",
    value: function addChoice() {
      var _this2 = this;

      this.incrementLastChoiceId();
      this.data.setChoice({
        id: this.data.lastChoiceId,
        content: "Choix ".concat(this.data.lastChoiceId),
        score: 0,
        visible: true
      });
      this.data.factors.filter(function (f) {
        return f.visible === true;
      }).forEach(function (factor) {
        return _this2.data.setFactorRate(factor.id, _this2.data.lastChoiceId, 0);
      });
      this.vue.insertNewColumn(this.data);
    }
    /**
     *
     * @param {String} typeOfElement
     * @param {HTMLElement} el
     * @returns {VoidFunction}
     */

  }, {
    key: "deleteElement",
    value: function deleteElement(typeOfElement, el) {
      switch (typeOfElement) {
        case 'factor':
          this.data.setFactorInvisible(parseInt(el.dataset.factorid));
          this.vue.deleteRow(el);
          break;

        case 'choice':
          this.data.setChoiceInvisible(parseInt(el.dataset.choiceid));
          this.vue.deleteColumn(el.dataset.choiceid);
          break;
      }
    }
    /**
     *
     * @param {String} typeOfElement
     * @param {Object} e
     * @returns {VoidFunction}
     */

  }, {
    key: "updateElementContent",
    value: function updateElementContent(typeOfElement, e) {
      switch (typeOfElement) {
        case 'factor':
          this.data.factors[e.target.parentNode.dataset.factorid].content = e.target.innerText.trim();
          break;

        case 'choice':
          this.data.choices[e.target.parentNode.dataset.choiceid].content = e.target.innerText.trim();
          break;
      }
    }
    /**
     * @returns {VoidFunction}
     */

  }, {
    key: "updateScore",
    value: function updateScore(e) {
      var _this3 = this;

      var factorIdFromTarget = parseInt(e.target.dataset.factorid);
      var ChoiceIdFromTarget = parseInt(e.target.dataset.choiceid);
      this.data.setRate(factorIdFromTarget, ChoiceIdFromTarget, this.vue.incrementRate(e));
      this.data.setScore();
      this.data.choices.forEach(function (c) {
        if (c.id === ChoiceIdFromTarget) {
          _this3.vue.updateScore(ChoiceIdFromTarget, c.score);
        }
      });
    }
    /**
     * @returns {VoidFunction}
     */

  }, {
    key: "updateBestChoice",
    value: function updateBestChoice() {
      var content = this.data.getBestChoice().map(function (c) {
        return c.content;
      }).join(' / ');
      this.vue.renderBestChoice(content);
    }
    /**
     * Insert the initial template inside wrapper elements
     * @param {HTMLElement} wrapper
     * @returns {VoidFunction}
     */

  }, {
    key: "initRender",
    value: function initRender(wrapper) {
      wrapper.innerHTML = this.vue.getInitTemplate(this.data);
      this.vue.setFocus(document.querySelector('.choice-content'));
    }
    /**
     * @returns {VoidFunction}
     */

  }, {
    key: "listenClickEvents",
    value: function listenClickEvents(wrapper) {
      var _this4 = this;

      wrapper.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-choiceid') && e.target.hasAttribute('data-factorid')) {
          _this4.updateScore(e);

          _this4.updateBestChoice();
        } else if (e.target === document.getElementById('addChoice-btn')) {
          _this4.addChoice();
        } else if (e.target === document.getElementById('addFactor-btn')) {
          _this4.addFactor();
        } else if (e.target.classList.contains('factor-btn__del')) {
          _this4.deleteElement('factor', e.target.parentNode);
        } else if (e.target.classList.contains('choice-btn__del')) {
          _this4.deleteElement('choice', e.target.parentNode);
        } else if (e.target.classList.contains('factor-content') || e.target.classList.contains('choice-content')) {
          e.target.addEventListener('input', function () {
            if (e.target.parentNode.dataset.factorid) {
              _this4.updateElementContent('factor', e);

              _this4.updateBestChoice();
            } else if (e.target.parentNode.dataset.choiceid) {
              _this4.updateElementContent('choice', e);

              _this4.updateBestChoice();
            }
          });
        }
      }, true);
    }
  }]);

  return Controler;
}();

exports.Controler = Controler;
},{"./vue.js":"js/vue.js","./model.js":"js/model.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _controler = require("./controler.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represent table to construct the app
 * @param {string} el - wrapper DOM element where the table where build
 */
var Table = /*#__PURE__*/function () {
  function Table() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'app';

    _classCallCheck(this, Table);

    if (typeof el !== 'string') {
      this.el = 'app';
      console.log('the app will build in #app div');
    } else {
      this.el = el;
    }

    this.main();
  }

  _createClass(Table, [{
    key: "main",
    value: function main() {
      this.wrapper = document.getElementById(this.el);
      this.controler = new _controler.Controler(this.wrapper);
      this.controler.initRender(this.wrapper);
      this.controler.listenClickEvents(this.wrapper);
    }
  }]);

  return Table;
}(); // ==============================================
// ==============================================
// Main program begin here


var myTable = new Table('app');
},{"./controler.js":"js/controler.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54064" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map