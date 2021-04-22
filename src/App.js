import logo from "./logo.svg";
import InputFormList from "./Component/InputFormList/InputFormList";
import List from "./Component/List/list";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import './App.css';

function App() {
  return (
    <div className="App">
      {/* <InputFormList /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/addList" exact component={InputFormList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
