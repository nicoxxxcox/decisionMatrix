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

  static inc = 0;

  /**
   * Generate number id
   * @return {int} the id
   */
  static getId() {
    return Item.inc++;
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

itemAddInput.value = "";

itemAddButton.addEventListener("click", function () {
  if (itemAddInput.value !== "") {
    items.push(new Item(itemAddInput.value, props));
    itemAddInput.value = "";
    let allItems = "";
    items.map((item) => {
      allItems += `
      <li class="list-group-item">
        <span class="items">${item.content} </span>
        <div class="ml-5 d-inline form-group form-check" >
          <input type="checkbox" class="form-check-input" id="${item.content}" />
          <label class="form-check-label" for="${item.content}"><small>?</small></label>
        </div>
      </li>`;
    });
    ItemsAdded.innerHTML = allItems;
  } else return;
});

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

  static inc = 0;

  /**
   * Generate number id
   * @return {int} the id
   */
  static getId() {
    return Prop.inc++;
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

let props = [];
const propAddInput = document.getElementById("propAddInput");
const propAddButton = document.getElementById("propAddButton");
const propAdded = document.getElementById("propAdded");

propAddInput.value = "";

propAddButton.addEventListener("click", function () {
  if (propAddInput.value !== "") {
    props.push(new Prop(propAddInput.value));
    propAddInput.value = "";
    let allProps = "";
    props.map((prop) => {
      allProps += `
      <li class="list-group-item">${prop.content}</li>`;
    });
    propAdded.innerHTML = allProps;
  } else return;
});
