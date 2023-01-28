import "./App.css";
import { Chart } from "react-google-charts";

function App() {
  return (
    <div className="App">
      <Chart
        chartType="ScatterChart"
        data={[
          ["Age", "Weight"],
          [4, 5.5],
          [8, 12],
        ]}
        width="100%"
        height="400px"
        legendToggle
      />
      <p>Hello Wolrd</p>
    </div>
  );
}

export default App;
