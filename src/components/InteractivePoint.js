import React, { useCallback, useState } from "react";
import { Ellipse, Rectangle } from 'react-paper-bindings';

function movePoint(event) {
    console.log("movePoint");
}

const InteractivePoint = (props) => {
    
    let size = [10, 10];
    if (props.size) 
        size = props.size;

    return (
        <Ellipse
            center={props.position}
            fillColor={props.color}
            size={size}
            onMouseDrag={(event) => {
                event.preventDefault();
                props.setPosition([event.point.x, event.point.y]);
            }}
        />
    );
}


export default InteractivePoint;