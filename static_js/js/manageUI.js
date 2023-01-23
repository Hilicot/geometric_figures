
import * as Pattern from "./Pattern.js";

export function manageUI(values, draw) {
    var resolution_slider = document.getElementById("resolution_slider");
    var scale_slider = document.getElementById("scale_slider");
    var select = document.getElementById("pattern_select");

    for (var key in pattern_types) {
        addSelectOption(select, key);
    }
    select.value = "spiral";

    values = setResolution(values);
    //svalues = setOffset(values);
    values = setScale(values);
    values = setPattern(values);

    resolution_slider.oninput = function () {
        values.resolution = this.value;
        setResolution(values);
        draw(values);
    }
    offset_slider.oninput = function () {
        values.offset = this.value;
        setOffset(values);
        draw(values);
    }
    scale_slider.oninput = function () {
        values.scale = this.value;
        setScale(values);
        draw(values);
    }
    select.onchange = function () {
        values.pattern = pattern_types[this.value];
        setPattern(values);
        draw(values);
    }    

    return values;
}

function setResolution(values) {
    var resolution_slider = document.getElementById("resolution_slider");
    var resolution_label = document.getElementById("resolution_label");
    var offset_slider = document.getElementById("offset_slider");
    values.resolution = resolution_slider.value;
    resolution_label.innerHTML = "Resolution: " + resolution_slider.value;
    offset_slider.max = resolution_slider.value;
    values = setOffset(values);
    return values;
}

function setOffset(values) {
    var offset_slider = document.getElementById("offset_slider");
    var offset_label = document.getElementById("offset_label");
    values.offset = offset_slider.value;
    offset_label.innerHTML = "Offset: " + offset_slider.value;
    return values;
}

function setScale(values) {
    var scale_slider = document.getElementById("scale_slider");
    var scale_label = document.getElementById("scale_label");
    values.scale = scale_slider.value;
    scale_label.innerHTML = "Scale: " + scale_slider.value;
    return values;
}

function setPattern(values) {
    var select = document.getElementById("pattern_select");
    values.pattern = pattern_types[select.value];
    return values;
}

var pattern_types = {
    "simple": Pattern.SimplePattern,
    "spiral": Pattern.SpiralPattern,
}

function addSelectOption(select, option){
    var opt = document.createElement("option");
    opt.value = option;
    opt.innerHTML = option[0].toLocaleUpperCase() + option.slice(1);
    select.appendChild(opt);
}