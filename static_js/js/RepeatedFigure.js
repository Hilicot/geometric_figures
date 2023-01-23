import {Figure} from './Figure.js';

export class RepeatedFigure extends Figure {
    constructor(points, color, values) {
        super(points, color, values);
        this.figures=[];
        this.values = values;
    }

    draw() {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }
    }

    generateRotatedFigures = function(num_copies, origin, mirrored){
        var angle = 2 * Math.PI / num_copies;
        var figures = [];
        for (var i = 0; i < num_copies; i++) {
            var points = [];
            for (var j = 0; j < this.points_local.length; j++) {
                points.push(getRotatedPoint(this.points_local[j], origin, angle * i));
            }
            if(this.values.mirrored && i%2==1){
                points.reverse();
            }
            figures.push(new Figure(points, this.color, this.values));
        }
        return figures;
    }

    onMouseDown = function (event) {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].onMouseDown(event);
        }
    }

    onMouseMove = function (event) {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].onMouseMove(event);
        }
    }

    onMouseDrag = function (event) {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].onMouseDrag(event);
        }
    }

    onMouseUp = function (event) {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].onMouseUp(event);
        }
    }
}

export class RepeatedTriangle extends RepeatedFigure {
    constructor(points, color, values) {
        super(points, color, values);
        this.points_local = [
            new paper.Point(0, 1),
            new paper.Point(1, 1),
            new paper.Point(0.5, 1 - Math.sqrt(3) / 2)
        ];
        this.figures = this.generateRotatedFigures(6, new paper.Point(1, 1));
    }
}

export class RepeatedSquare extends RepeatedFigure {
    constructor(points, color, values) {
        super(points, color, values);
        this.points_local = [
            new paper.Point(0, 0),
            new paper.Point(0, 1),
            new paper.Point(1, 1),
            new paper.Point(1, 0)
        ];
        this.figures = this.generateRotatedFigures(4, new paper.Point(1,1));
    }
}


function getRotatedPoint(p, origin, angle) {
    var x = p.x - origin.x;
    var y = p.y - origin.y;
    var x1 = x * Math.cos(angle) - y * Math.sin(angle);
    var y1 = x * Math.sin(angle) + y * Math.cos(angle);
    return new paper.Point(x1 + origin.x, y1 + origin.y);
}