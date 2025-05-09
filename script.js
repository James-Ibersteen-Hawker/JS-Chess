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
  make: () => {
    this.cells = Array.from({ length: 8 }, (_, i) => {
      return Array.from(
        { length: 8 },
        (_, q) => new Cell(q, i, (q + i) % 2, false)
      );
    });
    alert(this.cells);
  },
};
Board.make();
