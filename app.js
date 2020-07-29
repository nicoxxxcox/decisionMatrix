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
    this.choiceId = 1;
    this.factorId = 1;

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
            <div class="addCell-choice-content text-muted text-center">
              <small>Ajouter</small>
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
            <div class="form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="optradio"
                value="1"
              />
            </div>
            <div class="form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="optradio"
                value="2"
              />
            </div>
            <div class="form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                name="optradio"
                value="3"
              />
            </div>
            <span class="factor-btn__del">Enlever</span>
          </td>
        </tr>
        <tr>
          <td class="addCell-factor cell">
            <div class="addCell-factor-content text-muted text-center">
              <small>Ajouter</small>
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

  /**
   *
   */
  getNewChoiceId() {
    return this.choiceId++;
  }
  getNewFactorId() {
    return this.factorId++;
  }
}

let myTable = new Table("app");
