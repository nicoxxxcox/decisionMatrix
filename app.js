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
            <div class="rank">1</div>
          </td>
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
          <td class="addCell-choice cell">
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
        </tr>
        <tr>
          <td class="addCell-factor cell">
            <div id="addFactor-btn">
              Ajouter
            </div>
          </td>
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
    // compter le nombre de colones sur le document

    // inserer juste avant le bouton ajouter la ligne de cellules
    let tbody = document.querySelector("tbody");
    let lastRow = document.querySelectorAll("tr");

    tbody.insertBefore(this.createNewRow(), lastRow[lastRow.length - 1]);
  }
}

// Main program begin here

let myTable = new Table("app");

let addFactorbtn = document.getElementById("addFactor-btn");
addFactorbtn.addEventListener("click", function () {
  myTable.addNewRow();
});
