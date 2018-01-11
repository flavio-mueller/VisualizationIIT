// GridCorners Class
/**
 *
 * @param startPoint - left top point
 * @param endPoint - right bottom point
 * @param rowCount - count of grid point on row
 * @param colCount - count of grid point on column
 * @returns {{startPoint: Point, endPoint: Point, charsByRow: number, charsByCol: number, xStep: number, yStep: number}}
 */
function GridCorners(startPoint, endPoint, colCount, rowCount){
  this.startPoint = startPoint;
  this.endPoint = endPoint;
  this.rowCount = parseInt(rowCount);
  this.colCount = parseInt(colCount);
  this.width = Math.abs(this.endPoint.x - this.startPoint.x);
  this.height = Math.abs(this.endPoint.y - this.startPoint.y);
  this.colStep = (this.width  / (this.colCount - 1)) || .00001;
  this.rowStep = (this.height / (this.rowCount - 1)) || .00001;
}

GridCorners.prototype.reset = function(startPoint, endPoint, rowCount, colCount) {
  this.constructor(startPoint, endPoint, rowCount, colCount);

  return this;
};

GridCorners.prototype.traverse = function (inFuncToExec) {
  for (var rowPos = 0; rowPos < this.rowCount; ++rowPos) {
    for (var colPos = 0; colPos < this.colCount; ++colPos) {
      var index = rowPos * this.colCount + colPos;
      inFuncToExec(colPos * this.colStep + this.startPoint.x, rowPos * this.rowStep + this.startPoint.y, index);
    }
  }

  return this;
};

GridCorners.prototype.drawBorder = function(color) {
  push();
  stroke(color || 0);
  noFill();
  rect(gridSurf.startPoint.x, gridSurf.startPoint.y, gridSurf.width, gridSurf.height);
  pop();

  return this;
};