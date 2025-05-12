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
  #contains;
  constructor(x, y, color) {
    (this.x = x), (this.y = y), (this.color = color);
  }
  get contains() {
    return this.#contains;
  }
  set contains(obj) {
    const cellOBJ = DOC.get(`#c${this.y}${this.x}`);
    alert(`c${this.y}${this.x}`);
    function onclick() {
      alert(this.contains.name);
    }
    if (obj) cellOBJ.addEventListener("click", onclick);
    else cellOBJ.removeEventListener("click", onclick);
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
  took;
  constructor(name, color, path, number, took) {
    (this.name = name),
      (this.color = color),
      (this.path = path),
      (this.number = number),
      (this.took = took);
  }
  move() {}
  init(location) {
    location.textContent = `${this.name} ${this.color}`;
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
        (_, q) => new Cell(q, i, (q + i) % 2, false)
      );
    });
    this.draw().then(this.set()).catch(alert("error"));
  },
  draw: function () {
    return new Promise((resolve, reject) => {
      this.cells.forEach((col, i) => {
        let row = DOC.create("div", "", "row");
        col.forEach((cell, q) => {
          cell.color === 1
            ? row.append(DOC.create("div", `c${i}${q}`, "black", "cell"))
            : row.append(DOC.create("div", `c${i}${q}`, "white", "cell"));
        });
        this.destination.append(row);
      });
      resolve();
    });
  },
  set: function () {
    this.pieces.forEach((set, i) => {
      const pieceArr = ["rook", "knight", "bishop", "queen", "king"];
      let arr = [];
      pieceArr.forEach((p) => {
        arr.push(new Piece(p, (i + colorTop) % 2, pieceDict[p], 0));
      });
      pieceArr
        .slice(0, 3)
        .reverse()
        .forEach((p) => {
          arr.push(new Piece(p, (i + colorTop) % 2, pieceDict[p], 0));
        });
      set.push(arr);
      set.push(
        Array.from(
          { length: this.cells.length },
          (_, q) =>
            new Piece("pawn", (i + colorTop) % 2, pieceDict["pawn"], "number")
        )
      );
      i === 1 ? (set = set.reverse()) : (set = set);
    });
    this.pieces.forEach((side, i) => {
      side.forEach((row, q) => {
        row.forEach((piece, z) => {
          piece.init(
            //row offset + grid offset * i
            DOC.get(`#c${q + (this.cells.length - side.length) * i}${z}`)
          );
          this.cells[q + (this.cells.length - side.length) * i][z].contains =
            piece;
        });
      });
    });
  },
};
Board.make();

//colorTop = 0; 0 + 1 mod 2 = 1, 1 + 1 mod 2 = 0
