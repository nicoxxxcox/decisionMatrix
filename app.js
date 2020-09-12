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

    //-------------
    //--- CONTROLER

    this.controler = {
      /**
       * Return and increment a new choice id
       * @returns {Number}
       */
      incrementChoicesCount: () => {
        return this.data.choicesCount++;
      },

      /**
       * Return and increment a new factor id
       * @returns {Number}
       */
      incrementFactorsCount: () => {
        return this.data.factorsCount++;
      },

      countFactors: () => {
        return this.data.factors.length;
      },

      countChoices: () => {
        return this.data.choices.length;
      },

      addFactor: () => {
        this.controler.incrementFactorsCount();
        this.data.choices.forEach((choice) => {
          this.data.setFactor({
            id: this.data.factorsCount,
            content: `Factor ${this.data.factorsCount}`,
            score: "-",
            rate: 0,
            visible: true,
            choiceId: choice.id,
          });
        });

        this.vue.insertNewRow();
      },
      /**
       * Insert the initial template inside wrapper elements
       * @param {HTMLElement} wrapper
       */
      initRender: (wrapper) => {
        wrapper.innerHTML = this.vue.getInitTemplate();
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
              this.controler.incrementChoicesCount();

              this.vue.insertNewColumn();
            } else if (e.target === document.getElementById("addFactor-btn")) {
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

    //----------
    //--- DATA

    this.data = {
      choicesCount: 0,
      factorsCount: 0,
      choices: [
        {
          id: 0,
          content: "Choix 0",
          visible: true,
        },
      ],
      factors: [
        {
          id: 0,
          content: "Factor 0",
          rate: 0,
          visible: true,
          choiceId: 0,
        },
      ],
      factorScore: [
        {
          factorId: 0,
          choicesId: 0,
          score: 0,
        },
      ],
      getChoice: (id) => {
        return this.data.choices.find((choice) => choice.id == id);
      },

      /**
       * return all choices
       * @returns {Array}
       */
      getAllChoices: () => {
        return this.data.choices;
      },

      getFactor: (id) => {
        return this.data.factors.find((factor) => factor.id == id);
      },

      /**
       * return all factors
       * @returns {Array}
       */
      getAllFactors: () => {
        return this.data.factors;
      },

      /**
       * set a new choice
       * @param {Object} choice
       */
      setChoice: (choice) => {
        this.data.choices.push(choice);
      },

      /**
       * set a new factor
       * @param {Object} factor
       */
      setFactor: (factor) => {
        this.data.factors.push(factor);
      },

      setFactorVisible: (id) => {
        this.data.factors.forEach((factor) => {
          if (factor.id == id && factor.visible == false) {
            factor.visible = true;
          }
        });
      },

      setFactorInvisible: (id) => {
        this.data.factors.forEach((factor) => {
          if (factor.id == id && factor.visible == true) {
            factor.visible = false;
          }
        });
      },
      setChoiceVisible: (id) => {
        this.data.choices.forEach((choice) => {
          if (choice.id == id && choice.visible == false) {
            choice.visible = true;
          }
        });
      },

      setChoiceInvisible: (id) => {
        this.data.choices.forEach((choice) => {
          if (choice.id == id && choice.visible == true) {
            choice.visible = false;
          }
        });
      },
      // TODO: filter with factors and choices
      getScore: (factorId, choiceId) => {
        return this.data.factors.find(
          (factor) => factor.id == factorId && factor.choiceId == choiceId
        );
      },
      // TODO: filter with factors and choices
      setScore: (factorId, choiceId, score) => {
        this.data.factors.forEach((factor) => {
          if (factor.id == factorId && factor.choiceId == choiceId) {
            factor.score = score;
          } else return;
        });
      },
    };

    //----------
    //--- VUE

    this.vue = {
      getInitTemplate: () => {
        return `
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr>
          <td>#</td>
          <td class="score" data-choiceid="${this.data.choices[0].id}">
            <div>${this.data.factors[0].rate}</div>
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
          <td data-factorid="${this.data.factors[0].id}" class="factor cell">
            <div
              class="factor-content text-center"
              contenteditable="true"
            >
              ${this.data.factors[0].content}
            </div>
            <span class="factor-btn__del btn-del">Enlever</span>
          </td>
          <td data-choiceid="${this.data.choices[0].id}" data-factorid="${this.data.factors[0].id}">
          ${this.data.factors[0].score}
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
        factorCell.dataset.factorid = this.data.factorsCount;
        factorCell.firstElementChild.innerHTML = `Facteur ${this.data.factorsCount}`;
        return factorCell;
      },
      createChoiceCell: () => {
        let choiceCell = this.vue.cloneCell(
          document.querySelector(".choice.cell[data-choiceid='0']")
        );

        choiceCell.dataset.choiceid = this.data.choicesCount;
        choiceCell.firstElementChild.innerHTML = `Choix ${this.data.choicesCount}`;
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
        cellScore.dataset.factorid = this.data.factorsCount;
        //cellScore.dataset.choiceid = this.data.choicesCount;

        cellScore.firstElementChild.innerHTML = "0";
        return cellScore;
      },
      createNewRow: () => {
        let newRow = this.vue.createNewDOMELement("tr", "factorRow");
        newRow.appendChild(this.vue.createFactorCell());

        this.data.choices.forEach((choice) => {
          let cell = this.vue.createRateCell();
          cell.dataset.choiceid = choice.id;
          cell.dataset.factorid = this.data.factorsCount;
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
          this.data.setChoice();
        }
      },
      deleteRow: (row) => {
        if (document.querySelectorAll("tr.factorRow").length > 1) {
          row.parentNode.remove();
          this.data.setFactorInvisible(row.dataset.factorid);
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

    this.controler.initRender(this.wrapper);
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
