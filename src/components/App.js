import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>}></Route>
          <Route
            exact
            path="/services"
            component={() => <div>Services</div>}
          ></Route>
          <Route
            exact
            path="/customSoftware"
            component={() => <div>Custom Software</div>}
          ></Route>
          <Route
            exact
            path="/revolution"
            component={() => <div>Revolution</div>}
          ></Route>
          <Route
            exact
            path="/websites"
            component={() => <div>Websites</div>}
          ></Route>
          <Route
            exact
            path="/mobileApps"
            component={() => <div>Mobile Apps</div>}
          ></Route>
          <Route exact path="/about" component={() => <div>About</div>}></Route>
          <Route
            exact
            path="/contacts"
            component={() => <div>Contacts</div>}
          ></Route>
          <Route
            exact
            path="/estimate"
            component={() => <div>Estimate</div>}
          ></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
