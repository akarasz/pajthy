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

const Home = () => (
  <div className="content">
    <NewSessionButton text="Fibonacci" choices={["1", "2", "3", "5", "8", "?"]} />
    <NewSessionButton text="T-Shirt" choices={["S", "M", "L", "?"]} />
  </div>)

const NewSessionButton = ({ text, choices }) => {
  const history = useHistory()

  const handleClick = () => {
    api.createSession(choices, (session) => history.push(session + "/control"))
  }

  return <BigButton text={text} onClick={handleClick} />
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

  return (
    <div className="content">
      {choices.map((c, i) => <VoteButton key={i} name={name} choice={c} />)}
    </div>)
}

const VoteButton = ({ name, choice }) => {
  const { sessionId } = useParams()

  const handleClick = (choice) => {
    api.vote(sessionId, name, choice, () => {})
  }

  return (
    <BigButton text={choice} onClick={() => handleClick(choice)} />
    )
}

const TextInput = ({ name, placeholder, onChange }) => (
  <div className="pair">
    <label htmlFor={name}>{name}</label>
    <input id={name} type="text" placeholder={placeholder} onChange={onChange} />
  </div>)

const BigButton = ({ text, onClick }) => (
  <button onClick={onClick} className="big">{text}</button>)

export default App
