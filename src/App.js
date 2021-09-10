import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Tasks from "./Tasks";
import Login from "./Login";
import { store } from "./store";
import "./App.css";

export default function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Tasks} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}
