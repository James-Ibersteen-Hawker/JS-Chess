class Cell {
  x;
  y;
  color;
  contains;
  constructor(x, y, color, contains) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.contains = contains);
  }
  path(...directions) {
    let hold = this;
    alert(hold);
    directions.forEach((e) => {
      alert(e);
    });
    return;
  }
}
const Board = {
  cells: undefined,
  destination: undefined,
  make: () => {
    this.cells = Array.from({ length: 8 }, (_, i) => {
      return Array.from(
        { length: 8 },
        (_, q) => new Cell(q - 1, i - 1, (q + i) % 2, false)
      );
    });
    this.draw();
  },
  draw: () => {},
};
const DOC = {
  e: document,
  body: document.body,
  create: (tag, id = "", ...classes) => {
    let e = this.e.createElement(tag);
    e.id = id;
    if (classes.length > 1) e.classList.add(classes);
    return e;
  },
  get: (arg) => {
    return document.querySelector(arg);
  },
  getALL: (arg) => {
    return Array.from(document.querySelectorAll(arg));
  },
};
Board.make();
