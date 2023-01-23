import * as Pattern from "./Pattern.js";

export class Figure {
    constructor(points, values) {
        this.points = points;
        this.color = values.color;
        this.resolution = values.resolution;
        this.origin = values.origin;
        this.scale = values.scale;
        this.segment;
        this.path;
        this.values = values;
        this.pattern = new values.pattern(this);
    }

    draw() {
        this.pattern.drawPattern();
        var path = new paper.Path();
        path.strokeColor = this.color;
        for (var i = 0; i < this.points.length; i++) {
            path.add(this.toGlobalSpace(this.points[i]));
        }
        path.closed = true;
        
    }

    onMouseDown = function (event) {
        this.segment = this.path = null;
        var hitResult = project.hitTest(event.point, hitOptions);
        if (!hitResult)
            return;

        if (hitResult) {
            this.path = hitResult.item;
            if (hitResult.type == 'segment') {
                this.segment = hitResult.segment;
            }
        }
    }

    onMouseMove = function (event) {
        project.activeLayer.selected = false;
        if (event.item)
            event.item.selected = true;
    }

    onMouseDrag = function (event) {
        if (this.segment && false) {
            this.segment.point = sumCoords(this.segment.point, event.delta);
            this.points[this.segment.index] = this.toLocalSpace(this.segment.point);
            project.activeLayer.removeChildren();
            this.draw();
            this.pattern.drawPattern();
        } else if (this.path && false) {
            this.origin += event.delta;
        }
    }

    onMouseUp = function (event) {
    }

    toGlobalSpace = function (point) {
        return new paper.Point((point.x - 0.5) * this.scale + this.origin[0], (point.y - 0.5) * this.scale + this.origin[1]);
    }

    toLocalSpace = function (point) {
        return new paper.Point((point.x - this.origin[0]) / this.scale + 0.5, (point.y - this.origin[1]) / this.scale + 0.5);
    }
}



function sumCoords(p1, p2) {
    return new paper.Point(p1.x + p2.x, p1.y + p2.y);
}

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 50
};

