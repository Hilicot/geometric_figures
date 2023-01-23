
import { Figure } from "./Figure.js";
import { manageUI } from "./manageUI.js";
import * as RepeatedFigure from "./RepeatedFigure.js";

paper.install(window);
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var values = {};
    values.origin = [250, 250];
    values.color = "rgba(200,200,255,0.5)";
    values = manageUI(values, draw);
    paper.setup(canvas);
    draw(values);
}

function draw(values) {
    paper.project.activeLayer.removeChildren();
    var tool = new paper.Tool();

    var figure = new values.figure(values);
    figure.draw();
    tool.onMouseDown = (event) => figure.onMouseDown(event);
    tool.onMouseMove = (event) => figure.onMouseMove(event);
    tool.onMouseDrag = (event) => figure.onMouseDrag(event);
    tool.onMouseUp = (event) => figure.onMouseUp(event);

    // Draw the view now:
    paper.view.draw();
}

