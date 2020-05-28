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

let items = [];
const itemAddInput = document.getElementById("itemAddInput");
const itemAddButton = document.getElementById("itemAddButton");
const ItemsAdded = document.getElementById("itemsAdded");

let props = [];
const propAddInput = document.getElementById("propAddInput");
const propAddButton = document.getElementById("propAddButton");
const propAdded = document.getElementById("propAdded");

// initialize inputs to 0
itemAddInput.value = "";
propAddInput.value = "";

document.body.addEventListener("click", function (e) {
  if (e.target === itemAddButton) {
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
      updateCompare();
    } else return;
  } else if (e.target === propAddButton) {
    if (propAddInput.value !== "") {
      props.push(new Prop(propAddInput.value));
      propAddInput.value = "";
      let allProps = "";
      props.map((prop) => {
        allProps += `
      <li class="list-group-item">${prop.content}</li>`;
      });
      propAdded.innerHTML = allProps;
      updateCompare();
    } else return;
  } else return;
});

function updateCompare() {
  let blockCompare = document.getElementById("blockCompare");
  let allCompareProps = "";
  props.map((prop) => {
    allCompareProps += `
      <li class="list-group-item">
                <div class="row">
                  <div class="col-md-8">${prop.content}</div>
                  <div class="col-md-4">
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label class="btn btn-sm btn-secondary">
                        <input
                          type="radio"
                          name="options"
                          id="option1"
                        />
                        20%
                      </label>
                      <label class="btn btn-sm btn-secondary">
                        <input type="radio" name="options" id="option2" />
                        70%
                      </label>
                      <label class="btn btn-sm btn-secondary">
                        <input type="radio" name="options" id="option3" />
                        100%
                      </label>
                    </div>
                  </div>
                </div>
              </li>`;
  });
  let allCompareItems = "";

  items.map((item) => {
    allCompareItems += `
    
          <div class="card mb-3">
            <div class="card-header">
              <h5 id="allCompareTitle" class="card-title">${item.content}</h5>
            </div>
            <ul id="allCompareList" class="list-group list-group-flush">
            ${allCompareProps}
              
            </ul>
          </div>
        
    `;
  });

  blockCompare.innerHTML = allCompareItems;
}
