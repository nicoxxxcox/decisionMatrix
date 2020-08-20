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

    this.data = {
      choices: [
        {
          id: 0,
          content: "Choix 0",
          factors: [
            {
              id: 0,
              content: "Facteur 0",
              rank: "-",
              rate: 0,
            },
          ],
        },
      ],
    };

    this.initRender(this.wrapper);
  }

  getInitTemplate() {
    return `
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr>
          <td>#</td>
          <td class="rank" data-choiceid="${this.data.choices[0].id}">
            <div>${this.data.choices[0].factors[0].rate}</div>
          </td>
          <td id="lastrankcol" class="add-col"></td>
        </tr>
        <tr>
          <td></td>
          <td data-choiceid="${this.data.choices[0].id}"  class="choice cell">
            <div
              class="choice-content text-center"
              contenteditable="true"
            >
              ${this.data.choices[0].content}
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
          <td data-factorid="${this.data.choices[0].factors[0].id}" class="factor cell">
            <div
              class="factor-content text-center"
              contenteditable="true"
            >
              ${this.data.choices[0].factors[0].content}
            </div>
            <span class="factor-btn__del btn-del">Enlever</span>
          </td>
          <td data-choiceid="${this.data.choices[0].id}" data-factorid="${this.data.choices[0].factors[0].id}">
          ${this.data.choices[0].factors[0].rank}
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
  createNewDOMELement(tag = "div", classes, id, choiceid, factorid) {
    let newDOMELement = document.createElement(tag);
    if (classes !== undefined) {
      newDOMELement.setAttribute("class", classes);
    }
    if (id !== undefined) {
      newDOMELement.setAttribute("id", id);
    }
    if (choiceid !== undefined) {
      newDOMELement.dataset.choiceid = choiceid;
    }
    if (factorid !== undefined) {
      newDOMELement.dataset.factorid = factorid;
    }

    return newDOMELement;
  }

  /**
   * Return and increment a new choice id
   * @returns {Number}
   */
  incrementChoiceId() {
    return this.choiceId++;
  }

  /**
   * Return and increment a new factor id
   * @returns {Number}
   */
  incrementFactorId() {
    return this.factorId++;
  }

  cloneCell(cell) {
    return cell.cloneNode(true);
  }

  createFactorCell() {
    let factorCell = this.cloneCell(
      document.querySelector("[data-factorid='0']")
    );
    factorCell.dataset.factorid = this.factorId;
    factorCell.firstElementChild.innerHTML = `Facteur ${this.factorId}`;
    return factorCell;
  }

  createChoiceCell() {
    let choiceCell = this.cloneCell(
      document.querySelector(".choice.cell[data-choiceid='0']")
    );

    choiceCell.dataset.choiceid = this.choiceId;
    choiceCell.firstElementChild.innerHTML = `Choix ${this.choiceId}`;
    return choiceCell;
  }

  createRateCell() {
    let cellRate = this.cloneCell(
      document.querySelector("[data-choiceid='0'][data-factorid='0']")
    );
    cellRate.dataset.choiceid = this.choiceId;
    cellRate.dataset.factorid = this.factorId;
    cellRate.innerHTML = "-";
    return cellRate;
  }

  createRankCell() {
    let cellRank = this.cloneCell(
      document.querySelector(".rank[data-choiceid='0']")
    );
    cellRank.dataset.choiceid = this.choiceId;

    cellRank.firstElementChild.innerHTML = "0";
    return cellRank;
  }

  createNewRow() {
    let newRow = this.createNewDOMELement("tr", "factorRow");
    newRow.appendChild(this.createFactorCell());

    for (let i = 0; i < this.countChoices(); i++) {
      newRow.appendChild(this.createRateCell());
    }

    return newRow;
  }

  insertNewRow() {
    // inserer juste avant le bouton ajouter la ligne de cellules
    let tbody = document.querySelector("tbody");
    let lastRow = document.querySelectorAll("tr");

    tbody.insertBefore(this.createNewRow(), lastRow[lastRow.length - 1]);
    this.setNewDataFactor();
  }

  insertNewColumn() {
    let rowCount = this.countFactors();

    let lastTdColumn = document.getElementById("lastrankcol");
    let addTdColumn = this.getSecondRow().lastElementChild;
    let factorRow = document.getElementsByClassName("factorRow");

    this.getFirstRow().insertBefore(this.createRankCell(), lastTdColumn);
    this.getSecondRow().insertBefore(this.createChoiceCell(), addTdColumn);
    for (let i = 0; i < rowCount; i++) {
      factorRow[i].appendChild(this.createRateCell());
      this.setNewDataChoice();
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

  incrementRank(e) {
    let a = isNaN(e.target.textContent) ? 0 : e.target.textContent;
    if (a < 3) {
      a++;
    } else {
      a = 0;
    }
    e.target.innerHTML = a;
    return a;
  }

  listenClickEvents() {
    let table = this.wrapper;
    table.addEventListener(
      "click",
      (e) => {
        if (
          e.target.hasAttribute("data-choiceid") &&
          e.target.hasAttribute("data-factorid")
        ) {
          this.setRank(e.target, this.incrementRank(e));
        } else if (e.target === document.getElementById("addChoice-btn")) {
          this.incrementChoiceId();
          this.insertNewColumn();
        } else if (e.target === document.getElementById("addFactor-btn")) {
          this.incrementFactorId();
          this.insertNewRow();
        } else if (e.target.classList.contains("factor-btn__del")) {
          this.deleteRow(e.target.parentNode);
        } else if (e.target.classList.contains("choice-btn__del")) {
          this.deleteColumn(e.target.parentNode.dataset.choiceid);
        } else if (e.target.classList.contains("factor-content")) {
          e.target.addEventListener("input", function () {
            console.log("contenteditable element changed");
          });
        } else if (e.target.classList.contains("choice-content")) {
          e.target.addEventListener("input", function () {
            console.log("contenteditable element changed");
          });
        }
        console.log(this);
      },
      true
    );
  }

  countFactors() {
    return document.getElementsByClassName("factor").length;
  }

  countChoices() {
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
  setNewDataChoice() {
    this.data.choices.push({
      id: this.choiceId,
      content: `Choix ${this.choiceId} `,
      factors: [
        {
          id: this.factorId,
          content: `Facteur ${this.factorId} `,
          rank: "-",
          rate: 0,
        },
      ],
    });
  }
  setNewDataFactor() {
    for (let i = 0; i < this.countChoices(); i++) {
      this.data.choices[i].factors.push({
        id: this.factorId,
        content: `Facteur ${this.factorId} `,
        rank: "-",
        rate: 0,
      });
    }
  }

  getContent(element) {}

  setContent(element, content) {}

  getRank(element) {}

  setRank(element, rank) {
    // this.data.choices[element.dataset.choiceid].factors[
    //   element.dataset.factorid
    // ].rank = rank;
  }
}

// ==============================================
// ==============================================
// Main program begin here

const myTable = new Table("app");
const main = function () {
  myTable.listenClickEvents();
};

main();
