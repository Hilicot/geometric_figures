//import { Triangle } from './components/MainShape';
import './App.css';
import { Container } from 'react-bootstrap';
import { Canvas, View } from 'react-paper-bindings';
import Triangle from './components/Triangle';

function App() {
  const shape_color = "lightgray";
  return (
    <div className="App">
      <Container width="100%" className="App-header">
        {/*<Triangle color={shape_color} />*/}
        <Canvas width={1000} height={1000}>
          <View>
            <Triangle color={shape_color} />
          </View>
        </Canvas>
      </Container>
    </div>
  );
}

export default App;
