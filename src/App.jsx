import { createContext, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Home from "./Home.jsx"
import Control from "./Control.jsx"
import Vote from "./Vote.jsx"

export const LogoAnimationContext = createContext({})

const App = () => {
  const [animated, setAnimated] = useState(false)

  return (
    <LogoAnimationContext.Provider value={{animated, setAnimated}}>
      <div className="pajthy">
        <Router>
          <Header animate={animated} />
          <div className="countdown"></div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:sessionId/control">
              <Control />
            </Route>
            <Route path="/:sessionId">
              <Vote />
            </Route>
          </Switch>
        </Router>
      </div>
    </LogoAnimationContext.Provider>)
}

const Header = ({ animate }) => {
  const logoClasses = ["logo"]
  if (animate) {
    logoClasses.push("animate")
  }

  return (
    <header>
      <div className={logoClasses.join(" ")}></div>
      <div className="title">
        <h1><Link to="/">Pajthy</Link></h1>
        <p className="subtitle">easy voting for your remote scrum ceremonies</p>
      </div>
    </header>)
}

export default App
