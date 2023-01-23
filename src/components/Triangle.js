import React, { useCallback, useState } from "react";
import { Group, Layer, Line } from 'react-paper-bindings';
import InteractivePoint from './InteractivePoint';

function MyLine(props){
    console.log(props.from);
    return (
        <Line from={props.from} to={props.to} strokeColor={props.color} strokeWidth={2} />
    );
};

function Triangle(props) {

    const scale = 4;
    const [ox, oy] = [250, 250];
    const resolution = 10;

    const toGlobalSpace = ([lx, ly]) => {
        return [lx*scale+ox, ly*scale+oy];
    }
    const toLocalSpace = ([gx, gy]) => {
        return [(gx-ox)/scale, (gy-oy)/scale];
    }

    const [p1g, setP1] = useState(toGlobalSpace([0,100]));
    const [p2g, setP2] = useState(toGlobalSpace([100, 100]));
    const [p3g, setP3] = useState(toGlobalSpace([50, 100 - 100 * Math.sqrt(3) / 2]));

    let p1 = toLocalSpace(p1g);
    let p2 = toLocalSpace(p2g);
    let p3 = toLocalSpace(p3g);

    return (
        <Group>
            <Layer>
                <InteractivePoint color={props.color} position={p1g} setPosition={setP1} />
                <InteractivePoint color={props.color} position={p2g} setPosition={setP2} />
                <InteractivePoint color={props.color} position={p3g} setPosition={setP3} />
                <MyLine from={p1g} to={p2g} color={props.color} />
                <Line from={p2g} to={p3g} strokeColor={props.color} strokeWidth={2} />
                <Line from={p3g} to={p1g} strokeColor={props.color} strokeWidth={2} />
            </Layer>
        </Group>
    );
}

export default Triangle;