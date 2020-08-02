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
  }

  getInitTemplate() {
    // this.getNewChoiceId();
    // this.getNewFactorId();
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
          <td data-choiceid="${this.choiceId}"  class="relative choice cell">
            <div
              class="choice-content text-center"
              contenteditable="true"
            >
              Choix 1
            </div>
            <span class="choice-btn__del">Enlever</span>
          </td>
          <td id="addChoiceBtn" class="addCell-choice add-col cell">
            <div id="addChoice-btn">
              Ajouter
            </div>
          </td>
        </tr>
        <tr class="factorRow">
          <td data-factorid="${this.factorId}" class="relative factor cell">
            <div
              class="factor-content text-center"
              contenteditable="true"
            >
              Facteur 1
            </div>
            <span class="factor-btn__del">Enlever</span>
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

  getNewChoiceId() {
    return this.choiceId++;
  }
  getNewFactorId() {
    return this.factorId++;
  }

  createFactorCell() {
    this.getNewFactorId();

    let tdFactor = this.setNewElement(
      "td",
      "relative factor cell",
      undefined,
      undefined,
      this.factorId
    );
    let divFactor = this.setNewElement("div", "factor-content text-center");
    let spanFactor = this.setNewElement("span", "factor-btn__del");

    spanFactor.appendChild(document.createTextNode("Enlever"));
    divFactor.setAttribute("contenteditable", "true");
    divFactor.appendChild(document.createTextNode(`facteur ${this.factorId}`));

    tdFactor.appendChild(divFactor);
    tdFactor.appendChild(spanFactor);

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
    let choiceSpan = this.setNewElement("span", "choice-btn__del");

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
    let addTdColumn = document.getElementById("addChoiceBtn");
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
}

// =======================
// Main program begin here

let myTable = new Table("app");

let addFactorBtn = document.getElementById("addFactor-btn");
let addChoiceBtn = document.getElementById("addChoice-btn");

addChoiceBtn.addEventListener("click", function () {
  myTable.insertNewColumn();
});

addFactorBtn.addEventListener("click", function () {
  myTable.insertNewRow();
});

document.getElementById(myTable.el).addEventListener("change", function () {
  let factorBtnDel = document.getElementsByClassName("factor-btn__del");
  for (let i = 0; i < factorBtnDel.length; i++) {
    factorBtnDel[i].addEventListener("click", function (e) {
      console.log(e.target);
    });
  }
});
