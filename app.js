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
    this.choiceId = 0;
    this.factorId = 0;

    this.wrapper = document.getElementById(this.el);
    this.initRender(this.wrapper);
  }

  getInitTemplate() {
    this.getNewChoiceId();
    this.getNewFactorId();
    return `
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr>
          <td>#</td>
          <td data-choiceid="${this.choiceId}">
            <div class="rank">0</div>
          </td>
          <td class="add-col"></td>
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
          <td class="addCell-choice add-col cell">
            <div id="addChoice-btn">
              Ajouter
            </div>
          </td>
        </tr>
        <tr>
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
          <td class="add-col"></td>
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

    let tdChoice = this.setNewElement(
      "td",
      "relative choice cell",
      undefined,
      this.choiceId
    );
    let divChoice = this.setNewElement("div", "choice-content text-center");
    let spanChoice = this.setNewElement("span", "choice-btn__del");

    spanChoice.appendChild(document.createTextNode("Enlever"));
    divChoice.setAttribute("contenteditable", "true");
    divChoice.appendChild(document.createTextNode(`choix ${this.choiceId}`));

    tdChoice.appendChild(divChoice);
    tdChoice.appendChild(spanChoice);

    return tdChoice;
  }

  createRateCell() {
    let tdRate = this.setNewElement(
      "td",
      undefined,
      undefined,
      this.choiceId,
      this.factorId
    );
    tdRate.appendChild(document.createTextNode("-"));
    return tdRate;
  }

  createRankCell() {
    let tdRank = this.setNewElement("td", undefined, undefined, this.choiceId);
    let tdRankDiv = this.setNewElement("div", "rank");
    tdRankDiv.appendChild(document.createTextNode("0"));
    tdRank.appendChild(tdRankDiv);
    return tdRank;
  }

  createNewRow() {
    let countColumns = this.choiceId;
    let newRow = this.setNewElement("tr");
    newRow.appendChild(this.createFactorCell());

    for (let i = 0; i < countColumns; i++) {
      newRow.appendChild(this.createRateCell());
    }
    return newRow;
  }

  addNewRow() {
    // inserer juste avant le bouton ajouter la ligne de cellules
    let tbody = document.querySelector("tbody");
    let lastRow = document.querySelectorAll("tr");

    tbody.insertBefore(this.createNewRow(), lastRow[lastRow.length - 1]);
  }

  getFirstRow() {
    let firstRow = document.querySelector("tr");
    return firstRow;
  }

  cloneFactorCell() {
    return document.querySelector("td.factor[data-factorid='1']").cloneNode();
  }

  addNewColumn() {
    // compter le nombre de lignes sur le document
    let countRow = this.factorId;
    let lastTdColumn = document.querySelector(".add-col");

    this.getFirstRow().insertBefore(this.createRankCell(), lastTdColumn);

    // inserer juste avant le bouton ajouter la ligne de cellules
    let tbody = document.querySelector("tbody");

    console.log(lastTdColumn);

    //tbody.insertBefore(this.createNewRow(), lastRow[lastRow.length - 1]);
  }
}

// =======================
// Main program begin here

let myTable = new Table("app");

let addFactorBtn = document.getElementById("addFactor-btn");
let addChoiceBtn = document.getElementById("addChoice-btn");

addChoiceBtn.addEventListener("click", function () {
  myTable.addNewColumn();
});

addFactorBtn.addEventListener("click", function () {
  myTable.addNewRow();
});
