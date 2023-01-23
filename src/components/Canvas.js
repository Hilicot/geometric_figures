import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import triangle from './triangle_paper';

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    triangle();
  }, []);
  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" />
}

export default Canvas;