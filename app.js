/**
 * Represent an item to compare
 * @constructor
 * @param {string} title - title of the itel
 */
class Item {
  constructor(title) {
    this.id = this.getId();
    this.title = title;
    this.color = this.randColor();
    this.isSure = true;
  }

  /**
   * Generate number id
   * @return {int} the id
   */
  getId() {
    return `item-${Date.now()}`;
  }

  randColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   *
   * @param {object} props
   */
  setProp(props) {
    this.props = props;
  }

  /**
   * @returns {string}
   */
  addView() {
    return `
    <li class="list-group-item">
      <span class="items">${this.title} </span>
      <div class="ml-5 d-inline form-group form-check" >
        <input type="checkbox" data-id="item-${this.id}" class="form-check-input"/>
        <label class="form-check-label" for="${this.title}"><small>?</small></label>
      </div>
    </li>
    `;
  }

  /**
   * @returns {string}
   */
  compareView() {
    return `
    <div class="card mb-3">
      <div class="card-body">
        <h5 id="allCompareTitle" data-id="item-${this.id}" class="card-title">${
      this.title
    }</h5>
      </div>
      <ul class="allCompareUl list-group list-group-flush">
        ${
          this.props
            ? this.props
                .map(
                  (prop) => `<li class="list-group-item d-flex">
        <div class="mr-auto">${prop.title}</div>
        <span class="result badge badge-pill badge-primary">0</span><input type="range" min="0" max="3" value="0" class="rankList">
      </li>`
                )
                .join("")
            : ""
        }
      </ul>
    </div>
    `;
  }
}

/**
 * Represent a property to compare
 * @constructor
 * @param {string} title - title of prop
 */
class Prop {
  constructor(title) {
    this.id = this.getId();
    this.title = title;
    this.color = this.randColor();
    this.isSure = true;
    this.fit = 0;
  }

  /**
   * Generate number id
   * @return {int} the id
   */
  getId() {
    return `prop-${Date.now()}`;
  }

  setFit(fit) {
    if (!isNaN(fit)) {
      if (fit < 0 && fit > 3) {
        this.fit = fit;
      } else return;
    } else return;
  }

  randColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addView() {
    return `<li class="list-group-item">${this.title}</li>`;
  }
}

// main program begin here
// -----------------------
const blockCompare = document.getElementById("js-blockCompare");

let items = [];
const itemAddInput = document.getElementById("js-itemAddInput");
const itemAddBtn = document.getElementById("js-itemAddBtn");
const itemAdd = document.getElementById("js-itemAdd");

function displayRangeValue() {
  blockCompare.addEventListener("change", function () {
    let rangeEl = document.querySelectorAll(".rankList");
    const results = document.querySelectorAll(".result");

    rangeEl.forEach(function (range, key) {
      range.addEventListener("input", function (e) {
        const results = document.querySelectorAll(".result");
        results[key].innerHTML = e.target.value;
      });
      range.addEventListener("mouseover", function (e) {
        const results = document.querySelectorAll(".result");
        results[key].innerHTML = e.target.value;
      });
      range.addEventListener("click", function (e) {
        const results = document.querySelectorAll(".result");
        results[key].innerHTML = e.target.value;
      });
    });
  });
}

displayRangeValue();
// init value to ""
itemAddInput.value = "";

itemAddBtn.addEventListener("click", function () {
  // new instance of item with input value
  let item = new Item(itemAddInput.value);
  // add to items array
  items.push(item);

  updateProps();
  // insert in html
  itemAdd.insertAdjacentHTML("beforeend", item.addView(item));
  renderCompare();
  // put input to ""
  itemAddInput.value = "";
});

let props = [];
const propAddInput = document.getElementById("js-propAddInput");
const propAddBtn = document.getElementById("js-propAddBtn");
const propAdd = document.getElementById("js-propAdd");

propAddInput.value = "";

propAddBtn.addEventListener("click", function () {
  let prop = new Prop(propAddInput.value);
  props.push(prop);
  updateProps();

  propAdd.insertAdjacentHTML("beforeend", prop.addView(prop));

  renderCompare();
  propAddInput.value = "";
});

function updateProps() {
  items.forEach(function (item) {
    item.setProp(props);
  });
}

function renderCompare() {
  let render = "";
  items.map(function (item) {
    render += item.compareView();
  });
  blockCompare.innerHTML = render;
}
function outputUpdate(vol) {
  document.querySelector("#rankList").value = vol;
}

/*
document.body.addEventListener("click", function (e) {
  if (e.target === itemAddBtn) {
    if (itemAddInput.value !== "") {
      let item = new ItemController(
        new ItemModel(itemAddInput.value),
        new ItemView()
      );
      items.push(item);
      itemAdd.insertAdjacentHTML("beforeend", item.itemView.AddView(item));
      itemAddInput.value = "";
      updateCompare();
    } else return;
  } else if (e.target === propAddBtn) {
    if (propAddInput.value !== "") {
      let prop = new Prop(propAddInput.value);
      props.push(prop);
      propAdded.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item">${prop.title}</li>
        `
      );
      propAddInput.value = "";
      updateCompare();
    } else return;
  } else return;
});


function updateCompare() {
  const blockCompare = document.getElementById("js-blockCompare");
  let allCompareProps = "";
  props.map((prop) => {
    allCompareProps += `
    <li class="list-group-item d-flex">
    <div class="mr-auto">${prop.title}</div>
    <span class="result badge badge-primary">0</span><input type="range" min="0" max="3" value="0" class="form-control-range w-25 rankList">
    </li>
    `;
  });
  */
