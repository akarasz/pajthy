import { useState } from "react"
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom"
import "./App.css"

const App = () => (
  <div className="App">
    <Header />
    <Countdown />
    <Router>
      <Switch>
        <Route exact path="/">
          <Home title="Alpha Team Grooming 1st of April" />
        </Route>
        <Route path="/:sessionId/control">
          <Control title="Alpha Team Grooming 1st of April" />
        </Route>
        <Route path="/:sessionId">
          <Session title="Alpha Team Grooming 1st of April" />
        </Route>
      </Switch>
    </Router>
  </div>)

const Header = () => (
  <header>
    <div className="logo"></div>
    <h1>Pajthy</h1>
  </header>)

const Countdown = () => (
  <div className="countdown"></div>)

const Home = ({ title }) => (
  <div class="content">
    <TextInput name="Session" placeholder={title} />
    <BigButton text="Fibonacci" />
    <BigButton text="T-Shirt" />
  </div>)

const Control = ({ title }) => {
  let { sessionId } = useParams()

  return (<div className="admin content">
    <h2>{title}</h2>
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

const Session = ({ title }) => {
  const [name, setName] = useState(null)

  if (name === null) {
    return <JoinForm title={title} setName={setName} />
  } else {
    return <Vote title={title} />
  }
}

const JoinForm = ({ title, setName }) => {
  const [value, setValue] = useState(null)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (<div className="content">
    <h2>{title}</h2>
    <TextInput name="Name" onChange={handleChange} />
    <BigButton text="Join" onClick={() => setName(value)} />
  </div>)
}

const Vote = ({ title }) => (
  <div className="content">
    <h2>{title}</h2>
    <BigButton text="1" />
    <BigButton text="2" />
    <BigButton text="3" />
    <BigButton text="5" />
    <BigButton text="8" />
    <BigButton text="13" />
    <BigButton text="?" />
  </div>)

const TextInput = ({ name, placeholder, onChange }) => (
  <div className="pair">
    <label htmlFor={name}>{name}</label>
    <input id={name} type="text" placeholder={placeholder} onChange={onChange} />
  </div>)

const BigButton = ({ text, onClick }) => (
  <button onClick={onClick} className="big">{text}</button>)

export default App
