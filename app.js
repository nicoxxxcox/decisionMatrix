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

    this.controler = {
      /**
       * Return and increment a new choice id
       * @returns {Number}
       */
      incrementChoiceId: () => {
        return this.choiceId++;
      },

      /**
       * Return and increment a new factor id
       * @returns {Number}
       */
      incrementFactorId: () => {
        return this.factorId++;
      },

      countFactors: () => {
        return this.data.choices[0].factors.length;
      },

      countChoices: () => {
        return this.data.choices.length;
      },
      addFactor: () => {
        this.data.setNewFactor();
        this.vue.insertNewRow();
      },
      listenClickEvents: () => {
        let table = this.wrapper;
        table.addEventListener(
          "click",
          (e) => {
            if (
              e.target.hasAttribute("data-choiceid") &&
              e.target.hasAttribute("data-factorid")
            ) {
              this.data.setScore(e.target, this.vue.incrementScore(e));
            } else if (e.target === document.getElementById("addChoice-btn")) {
              this.controler.incrementChoiceId();

              this.vue.insertNewColumn();
            } else if (e.target === document.getElementById("addFactor-btn")) {
              this.controler.incrementFactorId();
              this.controler.addFactor();
            } else if (e.target.classList.contains("factor-btn__del")) {
              this.vue.deleteRow(e.target.parentNode);
            } else if (e.target.classList.contains("choice-btn__del")) {
              this.vue.deleteColumn(e.target.parentNode.dataset.choiceid);
            } else if (
              e.target.classList.contains("factor-content") ||
              e.target.classList.contains("choice-content")
            ) {
              e.target.addEventListener("input", () => {
                if (e.target.parentNode.dataset.factorid) {
                  for (let i = 0; i < this.controler.countChoices(); i++) {
                    this.data.choices[i].factors[
                      e.target.parentNode.dataset.factorid
                    ].content = e.target.innerHTML.trim();
                  }
                } else if (e.target.parentNode.dataset.choiceid) {
                  for (let i = 0; i < this.controler.countFactors(); i++) {
                    this.data.choices[
                      e.target.parentNode.dataset.choiceid
                    ].content = e.target.innerHTML.trim();
                  }
                }
              });
            }
          },
          true
        );
      },
    };

    this.data = {
      choices: [
        {
          id: 0,
          content: "Choix 0",
          factors: [0],
        },
      ],
      factors: [
        {
          id: 0,
          content: "Factor 0",
          score: "-",
          rate: 0,
          choicesId: 0,
        },
      ],
      setChoice: (choice) => {
        this.data.choices.push(choice);
      },
      getChoice: (id) => {
        return this.data.choices.find((choice) => choice.id == id);
      },
      setFactor: (factor) => {
        this.data.factors.push(factor);
      },
      getFactor: (id) => {
        return this.data.factors.find((factor) => factor.id == id);
      },
      setNewChoice: () => {
        this.data.choices.push({
          id: this.choiceId,
          content: `Choix ${this.choiceId} `,
          factors: [
            {
              id: this.factorId,
              content: `Facteur ${this.factorId} `,
              score: "-",
              rate: 0,
            },
          ],
        });
      },
      setNewFactor: () => {
        for (let i = 0; i < this.controler.countChoices(); i++) {
          this.data.choices[i].factors.push({
            id: this.factorId,
            content: `Facteur ${this.factorId} `,
            score: "-",
            rate: 0,
          });
        }
      },
      deleteFactor: (id) => {
        for (let i = 0; i < this.controler.countChoices(); i++) {
          this.data.choices[i].factors.splice(id, 1);
        }
      },
      setScore: (element, score) => {
        if (
          this.data.choices[element.dataset.choiceid].factors[
            element.dataset.factorid
          ]
        ) {
          this.data.choices[element.dataset.choiceid].factors[
            element.dataset.factorid
          ].score = score;
        }

        return;
      },
    };

    this.vue = {
      getInitTemplate: () => {
        return `
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr>
          <td>#</td>
          <td class="score" data-choiceid="${this.data.choices[0].id}">
            <div>${this.data.choices[0].factors[0].rate}</div>
          </td>
          <td id="lastscorecol" class="add-col"></td>
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
          ${this.data.choices[0].factors[0].score}
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
      },
      /**
       * Insert the initial template inside wrapper elements
       * @param {HTMLElement} wrapper
       */
      initRender: (wrapper) => {
        wrapper.innerHTML = this.vue.getInitTemplate();
      },

      getFirstRow: () => {
        return document.querySelector("tr");
      },

      getSecondRow: () => {
        let secondRow = document.querySelectorAll("tr")[1];
        return secondRow;
      },
      getThirdRow: () => {
        let secondRow = document.querySelectorAll("tr")[2];
        return secondRow;
      },
      cloneCell: (cell) => {
        return cell.cloneNode(true);
      },
      createFactorCell: () => {
        let factorCell = this.vue.cloneCell(
          document.querySelector("td.factor[data-factorid='0']")
        );
        factorCell.dataset.factorid = this.factorId;
        factorCell.firstElementChild.innerHTML = `Facteur ${this.factorId}`;
        return factorCell;
      },
      createChoiceCell: () => {
        let choiceCell = this.vue.cloneCell(
          document.querySelector(".choice.cell[data-choiceid='0']")
        );

        choiceCell.dataset.choiceid = this.choiceId;
        choiceCell.firstElementChild.innerHTML = `Choix ${this.choiceId}`;
        return choiceCell;
      },
      createRateCell: () => {
        // TODO : fix factorid creation
        let cellRate = this.vue.cloneCell(
          document.querySelector("[data-choiceid='0'][data-factorid='0']")
        );
        cellRate.innerHTML = "-";
        return cellRate;
      },

      createScoreCell: () => {
        let cellScore = this.vue.cloneCell(
          document.querySelector(".score[data-choiceid='0']")
        );
        cellScore.dataset.factorid = this.factorId;
        //cellScore.dataset.choiceid = this.choiceId;

        cellScore.firstElementChild.innerHTML = "0";
        return cellScore;
      },
      createNewRow: () => {
        let newRow = this.vue.createNewDOMELement("tr", "factorRow");
        newRow.appendChild(this.vue.createFactorCell());

        this.data.choices.forEach((el) => {
          let cell = this.vue.createRateCell();
          cell.dataset.choiceid = el.id;
          cell.dataset.factorid = el.factors[el.factors.lenght - 1].id;
          newRow.appendChild(cell);
        });

        return newRow;
      },
      insertNewRow: () => {
        let tbody = document.querySelector("tbody");
        let lastRow = document.querySelectorAll("tr");

        tbody.insertBefore(
          this.vue.createNewRow(),
          lastRow[lastRow.length - 1]
        );
      },
      insertNewColumn: () => {
        let rowCount = this.controler.countFactors();

        let lastTdColumn = document.getElementById("lastscorecol");
        let addTdColumn = this.vue.getSecondRow().lastElementChild;
        let factorRow = document.getElementsByClassName("factorRow");

        this.vue
          .getFirstRow()
          .insertBefore(this.vue.createScoreCell(), lastTdColumn);
        this.vue
          .getSecondRow()
          .insertBefore(this.vue.createChoiceCell(), addTdColumn);
        for (let i = 0; i < rowCount; i++) {
          factorRow[i].appendChild(this.vue.createRateCell());
          this.data.setNewChoice();
        }
      },
      deleteRow: (row) => {
        if (document.querySelectorAll("tr.factorRow").length > 1) {
          row.parentNode.remove();
          this.data.deleteFactor(row.dataset.factorid);
        }
      },
      deleteColumn: (column) => {
        if (document.querySelectorAll("td.choice").length > 1) {
          let columns = document.querySelectorAll(
            `td[data-choiceid='${column}']`
          );
          for (let i = 0; i < columns.length; i++) {
            columns[i].remove();
          }
        }
      },
      incrementScore: (e) => {
        let a = isNaN(e.target.textContent) ? 0 : e.target.textContent;
        if (a < 3) {
          a++;
        } else {
          a = 0;
        }
        e.target.innerHTML = a;
        return a;
      },

      /**
       * Set new HTML Element with main properties
       * @param {string} tag
       * @param {string} classes
       * @param {string} id
       * @param {string} choiceid
       * @param {string} factorid
       */
      createNewDOMELement: (tag = "div", classes, id, choiceid, factorid) => {
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
      },
    };

    this.vue.initRender(this.wrapper);
    this.main();
  }

  main() {
    this.controler.listenClickEvents();
  }

  setContent(element, content) {
    this.data.choices[i].factors[
      e.target.parentNode.dataset.factorid
    ].content = e.target.innerHTML.trim();
  }
}

// ==============================================
// ==============================================
// Main program begin here

const myTable = new Table("app");
