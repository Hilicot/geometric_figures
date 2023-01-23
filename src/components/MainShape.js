import { Stage, Layer, Line } from "react-konva";

export const Triangle = (props) => {
    return(
        <Stage width={100} height={100}>
        <Layer>
          <Line closed points={[0, 100, 100, 0]} stroke={props.color} />
        </Layer>
      </Stage>
    );
  };