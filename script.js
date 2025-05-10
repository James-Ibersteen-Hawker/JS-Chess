const colorTop = 0;
const pieceDict = {
  pawn: {
    d: [1],
    infinite: false,
    special: [3, 4],
  },
  rook: {
    d: [-1, 1, -2, 2],
    infinite: true,
  },
  knight: {
    d: [
      [1, 1, 2],
      [1, 1, -2],
      [-1, -1, 2],
      [-1, -1, -2],
      [2, 2, 1],
      [2, 2, -1],
      [-2, -2, 1],
      [-2, -2, -1],
    ],
    infinite: false,
    jump: true,
  },
  bishop: {
    d: [3, -3, 4, -4],
    infinite: true,
  },
  queen: {
    d: [1, -1, 2, -2, 3, -3, 4, -4],
    infinite: true,
  },
  king: {
    d: [1, -1, 2, -2, 3, -3, 4, -4],
    infinite: false,
  },
};
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
class Piece {
  name;
  color;
  path;
  number;
  constructor(name, color, path, number) {
    (this.name = name),
      (this.color = color),
      (this.path = path),
      (this.number = number);
  }
  move() {}
  init(loc) {
    loc.append(
      DOC.create(
        "div",
        `${this.name}${this.number}${this.color}`,
        this.name,
        "piece"
      )
    );
  }
}
const Board = {
  cells: undefined,
  destination: DOC.get("#container"),
  pieces: [[], []],
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
    this.set();
  },
  set: function () {
    this.pieces.forEach((set) => {
      const pieceArr = ["rook", "knight", "bishop", "queen", "king"];
      pieceArr.forEach((p) => {
        set.push(new Piece(p, "color", pieceDict[p], 0));
      });
      pieceArr
        .slice(0, 3)
        .reverse()
        .forEach((p) => {
          set.push(new Piece(p, "color", pieceDict[p], 0));
        });
      set = [set];
      set.push(
        Array.from(
          { length: this.cells.length },
          (_, i) => new Piece("pawn", "color", pieceDict["pawn"], "number")
        )
      );
    });
  },
};
Board.make();
