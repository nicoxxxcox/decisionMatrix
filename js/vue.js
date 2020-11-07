export class Vue {
  getInitTemplate (data) {
    return `
    <table class="table table-responsive">
      <tbody>
        <tr>
          <td></td>
          <td class="score" data-choiceid="${data.choices[0].id}">
            <div class="score__content">${data.choices[0].score}</div>

          </td>
          <td id="lastscorecol" class="add-col"></td>
        </tr>
        <tr>
          <td></td>
          <td data-choiceid="${data.choices[0].id}"  class="choice cell">
            <div
              class="choice-content text-center"
              contenteditable="true"
            >${data.choices[0].content}
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
          <td data-factorid="${data.factors[0].id}" class="factor cell">
            <div
              class="factor-content text-center"
              contenteditable="true"
            >
              ${data.factors[0].content}
            </div>
            <span class="factor-btn__del btn-del">Enlever</span>
          </td>
          <td class="rate" data-choiceid="${data.choices[0].id}" data-factorid="${data.factors[0].id}">
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
    `
  }

  /**
       * @returns {HTMLElement}
       */
  getFirstRow () {
    return document.querySelector('tr')
  }

  /**
       * @returns {HTMLElement}
       */
  getSecondRow () {
    return document.querySelectorAll('tr')[1]
  }

  /**
       * @returns {HTMLElement}
       */
  getThirdRow () {
    return document.querySelectorAll('tr')[2]
  }

  /**
       * @returns {Node}
       */
  cloneCell (cell) {
    return cell.cloneNode(true)
  }

  createFactorCell (data) {
    const factorCell = this.cloneCell(
      document.querySelector("td.factor[data-factorid='0']")
    )
    factorCell.dataset.factorid = data.lastFactorId
    factorCell.firstElementChild.innerHTML = `Facteur ${data.lastFactorId}`
    return factorCell
  }

  createChoiceCell (data) {
    const choiceCell = this.cloneCell(
      document.querySelector(".choice.cell[data-choiceid='0']")
    )

    choiceCell.dataset.choiceid = data.lastChoiceId
    choiceCell.firstElementChild.innerHTML = `Choix ${data.lastChoiceId}`
    return choiceCell
  }

  createRateCell () {
    const cellRate = this.cloneCell(
      document.querySelector("[data-choiceid='0'][data-factorid='0']")
    )
    cellRate.innerHTML = '-'
    return cellRate
  }

  createScoreCell (data) {
    const cellScore = this.cloneCell(
      document.querySelector(".score[data-choiceid='0']")
    )
    cellScore.dataset.choiceid = data.lastChoiceId

    cellScore.firstElementChild.innerHTML = '0'
    return cellScore
  }

  /**
       * @returns {HTMLCollection}
       */
  createNewRow (data) {
    const newRow = this.createNewDOMELement('tr', 'factorRow')
    newRow.appendChild(this.createFactorCell(data))

    // TODO fix the count of choices
    data.choices
      .filter((c) => c.visible === true)
      .forEach((choice) => {
        const cell = this.createRateCell()
        cell.dataset.choiceid = choice.id
        cell.dataset.factorid = data.lastFactorId
        newRow.appendChild(cell)
      })

    return newRow
  }

  /**
       * @returns {VoidFunction}
       */
  insertNewRow (data) {
    const tbody = document.querySelector('tbody')
    const lastRow = document.querySelectorAll('tr')

    tbody.insertBefore(
      this.createNewRow(data),
      lastRow[lastRow.length - 1]
    )
  }

  /**
       * @returns {VoidFunction}
       */
  insertNewColumn (data) {
    const lastTdColumn = document.getElementById('lastscorecol')
    const addTdColumn = this.getSecondRow().lastElementChild
    const factorRow = document.getElementsByClassName('factorRow')

    this
      .getFirstRow()
      .insertBefore(this.createScoreCell(data), lastTdColumn)
    this
      .getSecondRow()
      .insertBefore(this.createChoiceCell(data), addTdColumn)

    const factorRowLength = factorRow.length
    for (let i = 0; i < factorRowLength; i++) {
      const visibleFactors = data.factors.filter(
        (f) => f.visible === true
      )

      const cell = this.createRateCell()
      cell.dataset.choiceid = data.lastChoiceId
      cell.dataset.factorid = visibleFactors[i].id
      factorRow[i].appendChild(cell)
    }
  }

  /**
       * @returns {VoidFunction}
       */
  deleteRow (row) {
    if (document.querySelectorAll('tr.factorRow').length > 1) {
      row.parentNode.remove()
    }
  }

  /**
       * @returns {VoidFunction}
       */
  deleteColumn (column) {
    if (document.querySelectorAll('td.choice').length > 1) {
      const columns = document.querySelectorAll(
                `td[data-choiceid='${column}']`
      )
      const columnsLength = columns.length
      for (let i = 0; i < columnsLength; i++) {
        columns[i].remove()
      }
    }
  }

  /**
       * @returns {VoidFunction}
       */
  updateScore (id, score) {
    const cellScore = document.querySelector(
            `.score[data-choiceid='${id}']`
    )
    cellScore.firstElementChild.innerHTML = score
    cellScore.lastElementChild.value = score
  }

  incrementRate (e) {
    let a = isNaN(e.target.textContent) ? 0 : e.target.textContent
    if (a < 3) {
      a++
    } else {
      a = 0
    }
    e.target.innerHTML = a
    return a
  }

  setFocus (el) {
    el.focus()
    window.getSelection().selectAllChildren(el)
  }

  /**
       * @param {String} choiceContent
       */
  renderBestChoice (choiceContent) {
    const resultfield = document.getElementById('best-choice')

    const cleanChoiceContent = choiceContent.replace(/\r?\n|\r/g, '')

    resultfield.innerText = `The best choice is : ${cleanChoiceContent}`
  }

  /**
       * Set new HTML Element with main properties
       * @param {string} tag
       * @param {string} classes
       * @param {string} id
       * @param {string} choiceid
       * @param {string} factorid
       */
  createNewDOMELement (tag = 'div', classes, id, choiceid, factorid) {
    const newDOMELement = document.createElement(tag)
    if (classes !== undefined) {
      newDOMELement.setAttribute('class', classes)
    }
    if (id !== undefined) {
      newDOMELement.setAttribute('id', id)
    }
    if (choiceid !== undefined) {
      newDOMELement.dataset.choiceid = choiceid
    }
    if (factorid !== undefined) {
      newDOMELement.dataset.factorid = factorid
    }

    return newDOMELement
  }
}
