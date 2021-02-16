import {BrowserRouter,Route,Switch} from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./page/HomePage"
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
