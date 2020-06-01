/**
 * Represent an item to compare
 * @constructor
 * @param {string} content - content
 * @param {object} param - property to compare
 */
class Item {
  constructor(content, props) {
    this.id = Item.getId();
    this.content = content;
    this.color = this.randColor();
    this.isSure = true;
    this.props = props;
  }

  /**
   * Generate number id
   * @return {int} the id
   */
  static getId() {
    return Date.now();
  }

  randColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

/**
 * Represent a property to compare
 * @constructor
 * @param {string} content - content
 */
class Prop {
  constructor(content) {
    this.id = Prop.getId();
    this.content = content;
    this.color = this.randColor();
    this.isSure = true;
    this.fit = 0;
  }

  /**
   * Generate number id
   * @return {int} the id
   */
  static getId() {
    return Date.now();
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
}

let items = [];
const itemAddInput = document.getElementById("itemAddInput");
const itemAddButton = document.getElementById("itemAddButton");
const ItemsAdded = document.getElementById("itemsAdded");

let props = [];
const propAddInput = document.getElementById("propAddInput");
const propAddButton = document.getElementById("propAddButton");
const propAdded = document.getElementById("propAdded");

let rankList = document.querySelectorAll(".rankList");

// initialize inputs to 0
itemAddInput.value = "";
propAddInput.value = "";

document.body.addEventListener("click", function (e) {
  if (e.target === itemAddButton) {
    if (itemAddInput.value !== "") {
      let item = new Item(itemAddInput.value, props);
      items.push(item);
      ItemsAdded.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item">
          <span class="items">${item.content} </span>
          <div class="ml-5 d-inline form-group form-check" >
            <input type="checkbox" data-id="${item.id}" class="form-check-input" id="${item.content}" />
            <label class="form-check-label" for="${item.content}"><small>?</small></label>
          </div>
        </li>
        `
      );
      itemAddInput.value = "";
      updateCompare();
    } else return;
  } else if (e.target === propAddButton) {
    if (propAddInput.value !== "") {
      let prop = new Prop(propAddInput.value);
      props.push(prop);
      propAdded.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item">${prop.content}</li>
        `
      );
      propAddInput.value = "";
      updateCompare();
    } else return;
  } else if (e.target === rankList) {
    console.log(rankList);
  } else return;
});

function updateCompare() {
  let blockCompare = document.getElementById("blockCompare");
  let allCompareProps = "";
  props.map((prop) => {
    allCompareProps += `
      <li class="list-group-item ">
                <div class="row">
                  <div class="col-md-8">${prop.content}</div>
                  <div class="col-md-4">
                    <input type="range" min="0" max="3" class="form-control-range rankList">
                  </div>
                </div>
              </li>`;
  });
  let allCompareItems = "";

  items.map((item) => {
    allCompareItems += `
    
          <div class="card mb-3">
            <div class="card-header">
              <h5 id="allCompareTitle" data-id="${item.id}" class="card-title">${item.content}</h5>
            </div>
            <ul class="allCompareUl list-group list-group-flush">
            ${allCompareProps}
              
            </ul>
          </div>
        
    `;
  });

  blockCompare.innerHTML = allCompareItems;
}
