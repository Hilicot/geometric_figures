
import { Figure } from "./Figure.js";
import { manageUI } from "./manageUI.js";

paper.install(window);
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var values = {};
    values.origin = [250, 250];
    values = manageUI(values, draw);
    paper.setup(canvas);
    draw(values);
}

function draw(values) {
    paper.project.activeLayer.removeChildren();
    var tool = new paper.Tool();

    var figure = new Figure(points_local, "lightgray", values);
    figure.draw();
    tool.onMouseDown = (event) => figure.onMouseDown(event);
    tool.onMouseMove = (event) => figure.onMouseMove(event);
    tool.onMouseDrag = (event) => figure.onMouseDrag(event);

    // Draw the view now:
    paper.view.draw();
}

var points_local = [
    new paper.Point(0, 1),
    new paper.Point(1, 1),
    new paper.Point(0.5, 1 - Math.sqrt(3) / 2)
];

