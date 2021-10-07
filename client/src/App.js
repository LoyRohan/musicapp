import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "Components/HomePage";
import Dashboard from "Components/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Consts from "const"

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path={Consts.fields.album.redirectUrl} component={Dashboard} />
          <Route path={Consts.fields.songs.redirectUrl} component={Dashboard} />
          <Route path={Consts.fields.favList.redirectUrl} component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
