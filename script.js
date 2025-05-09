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
    directions.forEach((e) => {
      hold = grid[(hold.x + e.x, hold.y + e.y)];
      if (hold.contains) {
        
      }
    });
    return
  }
}
