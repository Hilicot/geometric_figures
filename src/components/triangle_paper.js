import Paper from "paper";

const triangle = () => {
  let point1 = new Paper.Point(0,50);

  console.log(Paper);
  Paper.view.onMouseDown = (event) => {
    point1.strokeColor = "white";
    point1.strokeWidth = 3;
  };

  /*Paper.view.onMouseDrag = (event) => {
    myPath.add(event.point);
  };*/

  Paper.view.draw();
};

export default triangle;