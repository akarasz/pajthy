import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from "react-router-dom"
import "./App.css"
import * as api from "./api.js"

const App = () => (
  <div className="App">
    <Router>
      <Header />
      <Countdown />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:sessionId/control">
          <Control />
        </Route>
        <Route path="/:sessionId">
          <Session />
        </Route>
      </Switch>
    </Router>
  </div>)

const Header = () => {
  return (<header>
    <div className="logo"></div>
    <h1><Link to="/">Pajthy</Link></h1>
  </header>)
}

const Countdown = () => (
  <div className="countdown"></div>)

const Home = ({ title }) => {
  const history = useHistory()

  const handleClickFibonacci = () => {
    api.createSession(
      ["1", "2", "3", "5", "8", "?"],
      (session) => { history.push(session + "/control") })
  }

  const handleClickTShirt = () => {
    api.createSession(
      ["S", "M", "L", "?"],
      (session) => { history.push(session + "/control") })
  }

  return (<div className="content">
    <BigButton text="Fibonacci" onClick={handleClickFibonacci} />
    <BigButton text="T-Shirt" onClick={handleClickTShirt} />
  </div>)
}

const Control = () => {
  const { sessionId } = useParams()

  return (<div className="admin content">
    <div className="share">
      <div className="link">https://pajthy.com/{sessionId}</div>
      <div className="button">Copy</div>
    </div>
    <hr />
    <BigButton text="Begin voting!" />
    <hr />
    <table className="votes">
      <tbody>
        <tr>
          <td>Alice (x)</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Bob (x)</td>
          <td>?</td>
        </tr>
        <tr>
          <td>Carol (x)</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </div>)
}

const Session = () => {
  const [name, setName] = useState(null)
  const { sessionId } = useParams()

  if (name === null) {
    const handleJoin = (name) => {
      api.join(
        sessionId,
        name,
        () => setName(name),
        () => setName(name))
    }

    return <JoinForm onClickJoin={handleJoin} />
  } else {
    return <Vote name={name} />
  }
}

const JoinForm = ({ onClickJoin }) => {
  const [value, setValue] = useState(null)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClick = (e) => {
    onClickJoin(value)
  }

  return (<div className="content">
    <TextInput name="Name" onChange={handleChange} />
    <BigButton text="Join" onClick={handleClick} />
  </div>)
}

const Vote = ({ name }) => {
  const [choices, setChoices] = useState([])
  const { sessionId } = useParams()

  useEffect(() => {
    api.choices(sessionId, (res) => { setChoices(res) })
  }, [sessionId])

  const handleClick = (choice) => {
    api.vote(sessionId, name, choice, () => {})
  }

  return (
    <div className="content">
      {choices.map((c, i) => <BigButton key={i} text={c} onClick={() => handleClick(c)} />)}
    </div>)
}

const TextInput = ({ name, placeholder, onChange }) => (
  <div className="pair">
    <label htmlFor={name}>{name}</label>
    <input id={name} type="text" placeholder={placeholder} onChange={onChange} />
  </div>)

const BigButton = ({ text, onClick }) => (
  <button onClick={onClick} className="big">{text}</button>)

export default App
