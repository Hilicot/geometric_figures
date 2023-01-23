import {Figure} from './Figure.js';

export class RepeatedFigure {
    constructor(values) {
        this.figures=[];
        this.values = values;
    }

    draw() {
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }
    }

    generateRotatedFigures = function(num_copies, origin){
        var angle = 2 * Math.PI / num_copies;
        var figures = [];

        if(this.values.single_figure){
            num_copies = 1;
        }

        for (var i = 0; i < num_copies; i++) {
            var points = [];
            for (var j = 0; j < this.points_local.length; j++) {
                points.push(getRotatedPoint(this.points_local[j], origin, angle * i));
            }
            if(this.values.mirrored && i%2==1){
                points.reverse();
            }
            figures.push(new Figure(points, this.values));
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
    constructor(values) {
        super(values);
        this.points_local = [
            new paper.Point(0, 1),
            new paper.Point(1, 1),
            new paper.Point(0.5, 1 - Math.sqrt(3) / 2)
        ];
        this.figures = this.generateRotatedFigures(6, new paper.Point(1, 1));
    }
}

export class RepeatedSquare extends RepeatedFigure {
    constructor(values) {
        super(values);
        this.points_local = [
            new paper.Point(0, 0),
            new paper.Point(0, 1),
            new paper.Point(1, 1),
            new paper.Point(1, 0)
        ];
        this.figures = this.generateRotatedFigures(4, new paper.Point(1,1));
    }
}

export class RepeatedHexagon extends RepeatedFigure {
    constructor(values) {
        super(values);
        this.points_local = generateRegularPoligon(6, new paper.Point(1,1), new paper.Point(0.5,0.5));
        this.figures = this.generateRotatedFigures(3, new paper.Point(1,1));
    }
}

function generateRegularPoligon(num_sides, point, origin){
    var angle = 2 * Math.PI / num_sides;
    var points = [];
    for (var i = 0; i < num_sides; i++) {
        points.push(getRotatedPoint(point, origin, angle * i));
    }
    return points;
}

function getRotatedPoint(p, origin, angle) {
    var x = p.x - origin.x;
    var y = p.y - origin.y;
    var x1 = x * Math.cos(angle) - y * Math.sin(angle);
    var y1 = x * Math.sin(angle) + y * Math.cos(angle);
    return new paper.Point(x1 + origin.x, y1 + origin.y);
}