
import * as Pattern from "./Pattern.js";
import * as RepeatedFigure from "./RepeatedFigure.js";

var resolution_slider = document.getElementById("resolution_slider");
var resolution_label = document.getElementById("resolution_label");
var offset_slider = document.getElementById("offset_slider");
var offset_label = document.getElementById("offset_label");
var scale_slider = document.getElementById("scale_slider");
var scale_label = document.getElementById("scale_label");
var pattern_select = document.getElementById("pattern_select");
var figure_select = document.getElementById("figure_select");
var mirrored_checkbox = document.getElementById("mirrored_checkbox");
var single_figure_checkbox = document.getElementById("single_figure_checkbox");

export function manageUI(values, draw) {

    for (var key in figure_types) {
        addSelectOption(figure_select, key);
    }
    for (var key in pattern_types) {
        addSelectOption(pattern_select, key);
    }
    
    figure_select.value = "Triangle";
    pattern_select.value = "simple";


    values = setValues(values);

    resolution_slider.oninput = function () {
        values.resolution = this.value;
        setValues(values);
        draw(values);
    }
    offset_slider.oninput = function () {
        values.offset = this.value;
        setValues(values);
        draw(values);
    }
    scale_slider.oninput = function () {
        values.scale = this.value;
        setValues(values);
        draw(values);
    }
    pattern_select.onchange = function () {
        values.pattern = pattern_types[this.value];
        setValues(values);
        draw(values);
    }
    figure_select.onchange = function () {
        values.figure = figure_types[this.value];
        setValues(values);
        draw(values);
    }
    single_figure_checkbox.onchange = function () {
        values.single_figure = this.checked;
        setValues(values);
        draw(values);
    }
    mirrored_checkbox.onchange = function () {
        values.mirrored = this.checked;
        setValues(values);
        draw(values);
    }

    return values;
}

function setValues(values) {
    values = setPattern(values);
    values = setFigure(values);
    values = setSingleFigure(values);
    values = setMirrored(values);
    values = setResolution(values);
    values = setOffset(values);
    values = setScale(values);
    return values;
}

function setResolution(values) {
    values.resolution = resolution_slider.value;
    resolution_label.innerHTML = "Resolution: " + resolution_slider.value;
    offset_slider.max = resolution_slider.value;
    return values;
}

function setOffset(values) {
    values.offset = offset_slider.value;
    offset_label.innerHTML = "Offset: " + offset_slider.value;
    return values;
}

function setScale(values) {
    values.scale = scale_slider.value;
    scale_label.innerHTML = "Scale: " + scale_slider.value;
    return values;
}

function setFigure(values) {
    values.figure = figure_types[figure_select.value];
    return values;
}

function setPattern(values) {
    values.pattern = pattern_types[pattern_select.value];
    if(pattern_select.value == "simple")
        offset_slider.min = -resolution_slider.value;
    else
        offset_slider.min = 1;
    return values;
}

function setSingleFigure(values) {
    values.single_figure = single_figure_checkbox.checked;
    return values;
}

function setMirrored(values) {
    values.mirrored = mirrored_checkbox.checked;
    return values;
}

var figure_types = {
    "Triangle": RepeatedFigure.RepeatedTriangle,
    "Square": RepeatedFigure.RepeatedSquare,
    "Hexagon": RepeatedFigure.RepeatedHexagon,
}

var pattern_types = {
    "simple": Pattern.SimplePattern,
    "spiral": Pattern.SpiralPattern,
}



function addSelectOption(select, option) {
    var opt = document.createElement("option");
    opt.value = option;
    opt.innerHTML = option[0].toLocaleUpperCase() + option.slice(1);
    select.appendChild(opt);
}