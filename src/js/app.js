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
      incrementLastChoiceId: () => {
        return this.data.lastChoiceId++;
      },

      /**
       * Return and increment a new factor id
       * @returns {Number}
       */
      incrementLastFactorId: () => {
        return this.data.lastFactorId++;
      },

      countFactors: () => {
        return this.data.factors.filter((f) => f.visible === true).length;
      },

      countChoices: () => {
        return this.data.choices.filter((c) => c.visible === true).length;
      },

      addFactor: () => {
        this.controler.incrementLastFactorId();

        this.data.setFactor({
          id: this.data.lastFactorId,
          content: `Factor ${this.data.lastFactorId}`,
          rate: 0,
          visible: true,
          factorsRate: [],
        });

        let sortChoices = this.data.choices.filter((c) => c.visible === true);

        sortChoices.forEach((c) => {
          this.data.setFactorRate(this.data.lastFactorId, c.id, 0);
        });

        this.vue.insertNewRow();
      },

      addChoice: () => {
        this.controler.incrementLastChoiceId();

        this.data.setChoice({
          id: this.data.lastChoiceId,
          content: `Choix ${this.data.lastChoiceId}`,
          score: 0,
          visible: true,
        });

        this.data.factors
          .filter((f) => f.visible === true)
          .forEach((factor) =>
            this.data.setFactorRate(factor.id, this.data.lastChoiceId, 0)
          );

        this.vue.insertNewColumn();
      },

      deleteFactor: (el) => {
        this.data.setFactorInvisible(el.dataset.factorid);
        this.vue.deleteRow(el);
      },
      deleteChoice: (el) => {
        this.data.setChoiceInvisible(el.dataset.choiceid);

        this.vue.deleteColumn(el.dataset.choiceid);
      },
      updateFactorContent: (e) => {
        this.data.factors[
          e.target.parentNode.dataset.factorid
        ].content = e.target.innerHTML.trim();
      },
      updateChoiceContent: (e) => {
        this.data.choices[
          e.target.parentNode.dataset.choiceid
        ].content = e.target.innerHTML.trim();
      },
      updateScore: (e) => {
        this.data.setRate(
          e.target.dataset.factorid,
          e.target.dataset.choiceid,
          this.vue.incrementRate(e)
        );
        this.data.setScore();

        this.data.choices.forEach((c) => {
          if (c.id == e.target.dataset.choiceid) {
            this.vue.updateScore(e.target.dataset.choiceid, c.score);
          }
        });
      },
      updateBestChoice: () => {
        let content = this.data
          .getBestChoice()
          .map((c) => c.content)
          .join(" / ");

        this.vue.renderBestChoice(content);
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
              this.controler.updateScore(e);
              this.controler.updateBestChoice();
            } else if (e.target === document.getElementById("addChoice-btn")) {
              this.controler.addChoice();
            } else if (e.target === document.getElementById("addFactor-btn")) {
              this.controler.addFactor();
            } else if (e.target.classList.contains("factor-btn__del")) {
              this.controler.deleteFactor(e.target.parentNode);
            } else if (e.target.classList.contains("choice-btn__del")) {
              this.controler.deleteChoice(e.target.parentNode);
            } else if (
              e.target.classList.contains("factor-content") ||
              e.target.classList.contains("choice-content")
            ) {
              e.target.addEventListener("input", () => {
                if (e.target.parentNode.dataset.factorid) {
                  this.controler.updateFactorContent(e);
                  this.controler.updateBestChoice();
                } else if (e.target.parentNode.dataset.choiceid) {
                  this.controler.updateChoiceContent(e);
                  this.controler.updateBestChoice();
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
      lastChoiceId: 0,
      lastFactorId: 0,
      choices: [
        {
          id: 0,
          content: "Choix 0",
          score: 0,
          visible: true,
        },
      ],
      factors: [
        {
          id: 0,
          content: "Factor 0",
          rate: 0,
          visible: true,

          factorsRate: [
            {
              choiceId: 0,
              rate: 0,
            },
          ],
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
      getFactorRate: (fid, cid) => {
        let result;
        this.data.factors.forEach((factor) => {
          factor.factorsRate.forEach((rate) => {
            if (factor.id == fid && rate.choiceId == cid) {
              result = rate;
            }
          });
        });
        return result;
      },

      /**
       *  @returns {Array}
       */
      getBestChoice: () => {
        let high = this.data.choices
          .filter((c) => c.visible === true)
          .reduce((prev, current, i, arr) =>
            prev.score > current.score ? prev : current
          );

        return this.data.choices.filter((c) => c.score === high.score);
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
      /**
       * set new factor rate
       * @param {Object} factorRate
       *
       * TODO : just set rate if object already exist
       */
      setFactorRate: (fid, cid, rate) => {
        this.data.factors.forEach((factor) => {
          if (factor.id == fid) {
            factor.factorsRate.push({
              choiceId: cid,
              rate: rate,
            });
          }
        });
      },
      setRate: (fid, cid, scor) => {
        this.data.factors.forEach((factor) => {
          if (factor.id == fid) {
            factor.factorsRate.forEach((rate) => {
              if (rate.choiceId == cid) {
                rate.rate = scor;
              }
            });
          }
        });
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

      setScore: () => {
        function add(array) {
          return array.reduce((a, b) => a + b);
        }

        this.data.choices.forEach((c) => {
          let l = 0;

          this.data.factors.forEach((f) => {
            f.factorsRate.forEach((r) => {
              if (r.choiceId === c.id) {
                l += r.rate;
              }
            });
          });
          c.score = l;
        });
      },
    };

    //----------
    //--- VUE

    this.vue = {
      getInitTemplate: () => {
        return `
    <table class="table table-responsive">
      <tbody>
        <tr>
          <td></td>
          <td class="score" data-choiceid="${this.data.choices[0].id}">
            <div class="score__content">${this.data.choices[0].score}</div>

          </td>
          <td id="lastscorecol" class="add-col"></td>
        </tr>
        <tr>
          <td></td>
          <td data-choiceid="${this.data.choices[0].id}"  class="choice cell">
            <div
              class="choice-content text-center"
              contenteditable="true"
            >${this.data.choices[0].content}
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
          <td class="rate" data-choiceid="${this.data.choices[0].id}" data-factorid="${this.data.factors[0].id}">
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
        factorCell.dataset.factorid = this.data.lastFactorId;
        factorCell.firstElementChild.innerHTML = `Facteur ${this.data.lastFactorId}`;
        return factorCell;
      },
      createChoiceCell: () => {
        let choiceCell = this.vue.cloneCell(
          document.querySelector(".choice.cell[data-choiceid='0']")
        );

        choiceCell.dataset.choiceid = this.data.lastChoiceId;
        choiceCell.firstElementChild.innerHTML = `Choix ${this.data.lastChoiceId}`;
        return choiceCell;
      },
      createRateCell: () => {
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
        cellScore.dataset.choiceid = this.data.lastChoiceId;

        cellScore.firstElementChild.innerHTML = "0";
        return cellScore;
      },
      createNewRow: () => {
        let newRow = this.vue.createNewDOMELement("tr", "factorRow");
        newRow.appendChild(this.vue.createFactorCell());

        // TODO fix the count of choices
        this.data.choices
          .filter((c) => c.visible === true)
          .forEach((choice) => {
            let cell = this.vue.createRateCell();
            cell.dataset.choiceid = choice.id;
            cell.dataset.factorid = this.data.lastFactorId;
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
        let lastTdColumn = document.getElementById("lastscorecol");
        let addTdColumn = this.vue.getSecondRow().lastElementChild;
        let factorRow = document.getElementsByClassName("factorRow");

        this.vue
          .getFirstRow()
          .insertBefore(this.vue.createScoreCell(), lastTdColumn);
        this.vue
          .getSecondRow()
          .insertBefore(this.vue.createChoiceCell(), addTdColumn);

        for (let i = 0; i < factorRow.length; i++) {
          let visibleFactors = this.data.factors.filter(
            (f) => f.visible === true
          );

          let cell = this.vue.createRateCell();
          cell.dataset.choiceid = this.data.lastChoiceId;
          cell.dataset.factorid = visibleFactors[i].id;
          factorRow[i].appendChild(cell);
        }
      },

      deleteRow: (row) => {
        if (document.querySelectorAll("tr.factorRow").length > 1) {
          row.parentNode.remove();
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
      updateScore: (id, score) => {
        let cellScore = document.querySelector(`.score[data-choiceid='${id}']`);
        cellScore.firstElementChild.innerHTML = score;
        cellScore.lastElementChild.value = score;
      },
      incrementRate: (e) => {
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
       * @param {String} choiceContent
       */
      renderBestChoice: (choiceContent) => {
        let resultfield = document.getElementById("best-choice");

        resultfield.innerText = `The best choice is : ${choiceContent}`;
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
