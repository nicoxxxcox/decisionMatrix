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
          <td data-choiceid="${this.choiceId}">
            <div class="rank">0</div>
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
    this.getNewFactorId();

    let tdFactor = document
      .querySelector("[data-factorid='0']")
      .cloneNode(true);
    tdFactor.dataset.factorid = this.factorId;
    tdFactor.firstElementChild.innerHTML = `Facteur ${this.factorId}`;
    // let tdFactor = this.setNewElement(
    //   "td",
    //   "factor cell",
    //   undefined,
    //   undefined,
    //   this.factorId
    // );

    // let divFactor = this.setNewElement("div", "factor-content text-center");
    // divFactor.setAttribute("contenteditable", "true");
    // divFactor.appendChild(document.createTextNode(`facteur ${this.factorId}`));

    // let spanFactor = this.setNewElement("span", "factor-btn__del btn-del");
    // spanFactor.appendChild(document.createTextNode("Enlever"));

    // tdFactor.appendChild(divFactor);
    // tdFactor.appendChild(spanFactor);

    return tdFactor;
  }

  createChoiceCell() {
    this.getNewChoiceId();

    let choiceCell = this.setNewElement(
      "td",
      "relative choice cell",
      undefined,
      this.choiceId
    );

    let choiceDiv = this.setNewElement("div", "choice-content text-center");
    let choiceSpan = this.setNewElement("span", "choice-btn__del btn-del");

    choiceSpan.appendChild(document.createTextNode("Enlever"));
    choiceDiv.setAttribute("contenteditable", "true");
    choiceDiv.appendChild(document.createTextNode(`choix ${this.choiceId}`));

    choiceCell.appendChild(choiceDiv);
    choiceCell.appendChild(choiceSpan);

    return choiceCell;
  }

  createRateCell() {
    let cellRate = this.setNewElement(
      "td",
      undefined,
      undefined,
      this.choiceId,
      this.factorId
    );
    cellRate.appendChild(document.createTextNode("-"));

    return cellRate;
  }

  createRankCell() {
    let cellRank = this.setNewElement(
      "td",
      undefined,
      undefined,
      this.choiceId
    );
    let cellRankDiv = this.setNewElement("div", "rank");
    cellRankDiv.appendChild(document.createTextNode("0"));
    cellRank.appendChild(cellRankDiv);

    return cellRank;
  }

  createNewRow() {
    let columnCount = document.getElementsByClassName("choice").length;
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
    let rowCount = document.getElementsByClassName("factor").length;

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

  deleteColumn() {}

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

    addChoiceBtn.addEventListener("click", function () {
      myTable.insertNewColumn();
    });

    addFactorBtn.addEventListener("click", function () {
      myTable.insertNewRow();
    });

    document.body.addEventListener("click", function (e) {
      for (let i = 0; i < factorbtndel.length; i++) {
        if (e.target == factorbtndel[i]) {
          myTable.deleteRow(e.target.parentNode);
        }
      }
      for (let i = 0; i < factorbtndel.length; i++) {
        if (e.target == factorbtndel[i]) {
          myTable.deleteRow(e.target.parentNode);
        }
      }
    });
  }
}

// =======================
// Main program begin here

let myTable = new Table("app");
