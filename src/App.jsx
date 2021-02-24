import {BrowserRouter,Route,Switch} from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./page/HomePage"
import PostDetails from "./page/PostDetails";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/post/:id" component={PostDetails} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
