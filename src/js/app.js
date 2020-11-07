import { Controler } from './controler.js'

/**
 * Represent table to construct the app
 * @param {string} el - wrapper DOM element where the table where build
 */
class Table {
  constructor (el = 'app') {
    if (typeof el !== 'string') {
      this.el = 'app'
      console.log('the app will build in #app div')
    } else {
      this.el = el
    }

    this.main()
  }

  main () {
    this.wrapper = document.getElementById(this.el)

    this.controler = new Controler(this.wrapper)
    this.controler.initRender(this.wrapper)

    this.controler.listenClickEvents(this.wrapper)
  }
}

// ==============================================
// ==============================================
// Main program begin here

const myTable = new Table('app')

myTable()
