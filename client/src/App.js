import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Login from "./components/loginForm";
import Registration from "./components/registrationForm";
import Budget from "./components/budget";
import './App.css'
function App() {
  return (
    <Router>
      <div className="App"/>
      <Route path="/" exact component={Login} />
      <Route path="/reg" exact component={Registration} />
      <Route path="/user/budget" exact component={Budget} />
    </Router>
  );
}

export default App;
