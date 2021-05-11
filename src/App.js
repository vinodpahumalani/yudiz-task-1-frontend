import RouteContainer from "./RouteContainer";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <RouteContainer />
      </Router>
    </div>
  );
}

export default App;
