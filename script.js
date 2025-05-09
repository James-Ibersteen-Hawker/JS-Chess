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
const DOC = {
  e: document,
  body: document.body,
  create: function (tag, id = "", ...classes) {
    let e = this.e.createElement(tag);
    e.id = id;
    if (classes.length > 0) e.className = classes.join(" ");
    return e;
  },
  get: (arg) => {
    return document.querySelector(arg);
  },
  getALL: (arg) => {
    return Array.from(document.querySelectorAll(arg));
  },
};
const Board = {
  cells: undefined,
  destination: DOC.get("#container"),
  make: function () {
    this.cells = Array.from({ length: 8 }, (_, i) => {
      return Array.from(
        { length: 8 },
        (_, q) => new Cell(q - 1, i - 1, (q + i) % 2, false)
      );
    });
    this.draw();
  },
  draw: function () {
    this.cells.forEach((col, i) => {
      let row = DOC.create("div", "", "row");
      col.forEach((cell, q) => {
        cell.color == 1
          ? row.append(DOC.create("div", `c${i}${q}`, "black", "cell"))
          : row.append(DOC.create("div", `c${i}${q}`, "white", "cell"));
      });
      this.destination.append(row);
    });
  },
};
Board.make();
