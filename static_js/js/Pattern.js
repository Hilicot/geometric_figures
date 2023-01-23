export class Pattern {
    figure;
    constructor(figure) {
        this.figure = figure;

    }
    drawPattern = function () { }

    getBetweenPoint = function (p1, p2, t) {
        return new paper.Point(p1.x + (p2.x - p1.x) * t, p1.y + (p2.y - p1.y) * t);
    }
}

export class SimplePattern extends Pattern {
    constructor(figure) {
        super(figure);
    }
    drawPattern = function () {
        var figure = this.figure;
        var o = parseInt(figure.values.offset);
        console.log(o);
        for (var i = 0; i < figure.points.length; i++) {
            var p1 = figure.points[i];
            var p2 = figure.points[(i + 1) % figure.points.length];
            var p3 = figure.points[(i + 2) % figure.points.length];
            for (var j = 0; j < figure.resolution - o; j++) {
                var pstart = this.getBetweenPoint(p1, p2, (j + o) / figure.resolution);
                var pend = this.getBetweenPoint(p2, p3, j / figure.resolution);
                var line = new paper.Path();
                line.strokeColor = figure.color;
                line.add(figure.toGlobalSpace(pstart));
                line.add(figure.toGlobalSpace(pend));
                line.locked = true;
            }
        }
    }
}

export class SpiralPattern extends Pattern {
    constructor(figure) {
        super(figure);
        this.edges = [];
        this.temp_points = [];
        for (var i = 0; i < figure.points.length; i++) {
            var p1 = figure.points[i];
            var p2 = figure.points[(i + 1) % figure.points.length];
            this.edges.push([p1, p2]);
            this.temp_points.push(p1);
        }
    }
    drawPattern = function () {
        var figure = this.figure;

        var multiplier = Math.max(figure.values.offset, 1);
        for (var iter = 0; iter < figure.resolution * (1 + 1 / multiplier); iter++) {
            var o = Math.min(iter * multiplier / figure.resolution, figure.resolution - 1);

            for (var i = 0; i < figure.points.length; i++) {
                var p = this.temp_points[i];
                p = sanitizePoint(p);

                var [e1, e2] = this.edges[(i + 1) % this.edges.length];
                var pend = this.getBetweenPoint(e1, e2, (1 + o) / figure.resolution);
                var line = new paper.Path();
                line.strokeColor = this.figure.color;
                line.add(figure.toGlobalSpace(p));
                line.add(figure.toGlobalSpace(pend));
                line.locked = true;

                this.temp_points[(i + 1) % figure.points.length] = pend;
                this.edges[i] = [p, pend];
            }
        }
    }
}

function sanitizePoint(p) {
    p.x = Math.max(0, Math.min(1, p.x));
    p.y = Math.max(0, Math.min(1, p.y));
    return p;
}
