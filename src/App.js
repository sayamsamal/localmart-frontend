import "./App.css";

import Admin from "./components/Admin";
import mapboxgl from "mapbox-gl";

mapboxgl.prewarm();

function App() {
  return (
    <div className="App">
      <Admin />
    </div>
  );
}

export default App;
