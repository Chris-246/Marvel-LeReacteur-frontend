import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import Comics from "./containers/comics/Comics";
import Characters from "./containers/characters/Characters";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faArrowUp, faArrowDown);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/characters">
          <Characters />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
