/**
 * Represent table to construct the app
 * @param {string} el - wrapper DOM element where the table where build
 */
class Table {
  constructor(el = "app") {
    if (typeof el !== "string") {
      this.el = "app";
      console.log("the app will build in #app div");
    } else {
      this.el = el;
    }
    this.wrapper = document.getElementById(this.el);

    this.choiceId = 0;
    this.factorId = 0;

    this.choices = [];
    this.factors = [];

    this.initRender(this.wrapper);

    // execute the main function
    this.main();
  }

  getInitTemplate() {
    return `
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr>
          <td>#</td>
          <td class="rank" data-choiceid="${this.choiceId}">
            <div>0</div>
          </td>
          <td id="lastrankcol" class="add-col"></td>
        </tr>
        <tr>
          <td></td>                  
          <td data-choiceid="${this.choiceId}"  class="choice cell">
            <div
              class="choice-content text-center"
              contenteditable="true"
            >
              Choix 0
            </div>
            <span class="choice-btn__del btn-del">Enlever</span>
          </td>
          <td class="addCell-choice add-col cell">
            <div id="addChoice-btn">
              Ajouter
            </div>
          </td>
        </tr>
        <tr class="factorRow">
          <td data-factorid="${this.factorId}" class="factor cell">
            <div
              class="factor-content text-center"
              contenteditable="true"
            >
              Facteur 0
            </div>
            <span class="factor-btn__del btn-del">Enlever</span>
          </td>
          <td data-choiceid="${this.choiceId}" data-factorid="${this.factorId}">
          -
          </td>
        </tr>
        <tr>
          <td class="addCell-factor cell text-center">
            <div id="addFactor-btn">
              Ajouter
            </div>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    `;
  }
  /**
   * Insert the initial template inside wrapper elements
   * @param {HTMLElement} wrapper
   */
  initRender(wrapper) {
    wrapper.innerHTML = this.getInitTemplate();
  }

  /**
   * Set new HTML Element with main properties
   * @param {string} tag
   * @param {string} classes
   * @param {string} id
   * @param {string} choiceid
   * @param {string} factorid
   */
  setNewElement(tag = "div", classes, id, choiceid, factorid) {
    let newCell = document.createElement(tag);
    if (classes !== undefined) {
      newCell.setAttribute("class", classes);
    }
    if (id !== undefined) {
      newCell.setAttribute("id", id);
    }
    if (choiceid !== undefined) {
      newCell.dataset.choiceid = choiceid;
    }
    if (factorid !== undefined) {
      newCell.dataset.factorid = factorid;
    }

    return newCell;
  }

  /**
   * Return and increment a new choice id
   * @returns {Number}
   */
  getNewChoiceId() {
    return this.choiceId++;
  }

  /**
   * Return and increment a new factor id
   * @returns {Number}
   */
  getNewFactorId() {
    return this.factorId++;
  }

  createFactorCell() {
    let factorCell = document
      .querySelector("[data-factorid='0']")
      .cloneNode(true);
    factorCell.dataset.factorid = this.factorId;
    factorCell.firstElementChild.innerHTML = `Facteur ${this.factorId}`;
    return factorCell;
  }

  createChoiceCell() {
    let choiceCell = document
      .querySelector(".choice.cell[data-choiceid='0']")
      .cloneNode(true);
    choiceCell.dataset.choiceid = this.choiceId;
    choiceCell.firstElementChild.innerHTML = `Choix ${this.choiceId}`;
    return choiceCell;
  }

  createRateCell() {
    let cellRate = document
      .querySelector("[data-choiceid='0'][data-factorid='0']")
      .cloneNode(true);
    cellRate.dataset.choiceid = this.choiceId;
    cellRate.dataset.factorid = this.factorId;
    cellRate.innerHTML = "-";

    return cellRate;
  }

  createRankCell() {
    let cellRank = document
      .querySelector(".rank[data-choiceid='0']")
      .cloneNode(true);
    cellRank.dataset.choiceid = this.choiceId;
    cellRank.firstElementChild.innerHTML = "0";

    return cellRank;
  }

  createNewRow() {
    let columnCount = this.countColumn();
    let newRow = this.setNewElement("tr", "factorRow");
    newRow.appendChild(this.createFactorCell());

    for (let i = 0; i < columnCount; i++) {
      newRow.appendChild(this.createRateCell());
    }

    return newRow;
  }

  insertNewRow() {
    // inserer juste avant le bouton ajouter la ligne de cellules
    let tbody = document.querySelector("tbody");
    let lastRow = document.querySelectorAll("tr");
    tbody.insertBefore(this.createNewRow(), lastRow[lastRow.length - 1]);
  }

  insertNewColumn() {
    let rowCount = this.countRow();

    let lastTdColumn = document.getElementById("lastrankcol");
    let addTdColumn = this.getSecondRow().lastElementChild;
    let factorRow = document.getElementsByClassName("factorRow");

    this.getFirstRow().insertBefore(this.createRankCell(), lastTdColumn);
    this.getSecondRow().insertBefore(this.createChoiceCell(), addTdColumn);
    for (let i = 0; i < rowCount; i++) {
      factorRow[i].appendChild(this.createRateCell());
    }
  }

  deleteRow(row) {
    row.parentNode.remove();
  }

  deleteColumn(column) {
    let columns = document.querySelectorAll(`[data-choiceid='${column}']`);
    for (let i = 0; i < columns.length; i++) {
      columns[i].remove();
    }
  }

  countRow() {
    return document.getElementsByClassName("factor").length;
  }

  countColumn() {
    return document.getElementsByClassName("choice").length;
  }

  getFirstRow() {
    let firstRow = document.querySelector("tr");
    return firstRow;
  }

  getSecondRow() {
    let secondRow = document.querySelectorAll("tr")[1];
    return secondRow;
  }
  getThirdRow() {
    let secondRow = document.querySelectorAll("tr")[2];
    return secondRow;
  }

  cloneFactorCell() {
    return document
      .querySelector("td.factor[data-factorid='1']")
      .cloneNode(true);
  }

  /**
   * The main function
   * @author Nico
   * @returns {void}
   *
   */
  main() {
    let addFactorBtn = document.getElementById("addFactor-btn");
    let addChoiceBtn = document.getElementById("addChoice-btn");
    let factorbtndel = document.getElementsByClassName("factor-btn__del");
    let choicebtndel = document.getElementsByClassName("choice-btn__del");

    addChoiceBtn.addEventListener("click", function () {
      myTable.getNewChoiceId();
      myTable.insertNewColumn();
    });

    addFactorBtn.addEventListener("click", function () {
      myTable.getNewFactorId();
      myTable.insertNewRow();
    });

    document.body.addEventListener("click", function (e) {
      for (let i = 0; i < factorbtndel.length; i++) {
        if (e.target == factorbtndel[i]) {
          myTable.deleteRow(e.target.parentNode);
        }
      }

      for (let i = 0; i < choicebtndel.length; i++) {
        if (e.target == choicebtndel[i]) {
          myTable.deleteColumn(e.target.parentNode.dataset.choiceid);
        }
      }
    });
  }
}

// =======================
// Main program begin here

let myTable = new Table("app");
