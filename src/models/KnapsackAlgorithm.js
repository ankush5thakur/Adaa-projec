import ItemToUse from "./ItemToUse";

class KnapSackAlgorithm {
  #solutionTable;
  #solutionItems;
  constructor(items, capacity) {
    /*
    Note to future self: I'm only providing getter functionality for items and capacity, since I create the object when 
    the calculate button is clicked and then only read from it. If I decide to change this in the future I will need to
    provide setter methods for items/capacity that will recalculate the solutionTable and solutionItems. I've disabled
    setting at the moment to prevent unintended bugs by not recalculating the tables. The underscore syntax is because of
    https://stackoverflow.com/q/36553274/4704303
    */
    this._items = items;
    this._capacity = capacity;
  }

  #init() {
    debugger
    if(!this.#solutionTable) {
      this.#solutionTable = this.#knapsack();
    }
    if(!this.#solutionItems) {
      this.#solutionItems = this.#findItemsThatFit();
    }
    
  }

  #knapsack() {
    debugger
    const table = [];
    for (let i = 0; i <= this.items.length; i++) {
      table.push(Array(this.capacity + 1).fill(0));
    }

    this.items.forEach((item, index) => {
      const offsetIndex = index + 1;
      for (let currentCapacity = 1; currentCapacity <= this.capacity; currentCapacity++) {
        const valueForCapacityInPreviousRow = table[offsetIndex - 1][currentCapacity]
        table[offsetIndex][currentCapacity] = item.weight <= currentCapacity ?
          Math.max(valueForCapacityInPreviousRow, (item.value + table[offsetIndex - 1][currentCapacity - item.weight])) :
          valueForCapacityInPreviousRow
      }
    });
    return table;
  }

  #findItemsThatFit() {
    debugger
    var solution = [];
    var currentCapacity = this.capacity;
    for (let i = this.items.length; i > 0; i--) {
      const previousItemIndex = i - 1;
      if (this.#solutionTable[i][currentCapacity] !== this.#solutionTable[previousItemIndex][currentCapacity]) {
        solution.push(new ItemToUse(this.items[previousItemIndex], previousItemIndex, currentCapacity));
        currentCapacity -= this.items[previousItemIndex].weight;
      }
    }
    return solution;
  }

  get solutionTable() {
    this.#init();
    return this.#solutionTable;
  }

  get solutionItems() {
    this.#init();
    return this.#solutionItems;
  }

  get items() {
    return this._items;
  }

  get capacity() {
    return this._capacity;
  }

}

export default KnapSackAlgorithm;