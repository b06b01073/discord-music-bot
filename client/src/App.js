import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Commands from "./components/Commands";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/commands">
          <Commands />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
