import { useHistory } from "react-router-dom"

import { Button } from "./Commons.jsx"

import { createSession } from "./api.js"

const NewSessionButton = ({ text, choices }) => {
  const history = useHistory()

  const handleClick = () => {
    createSession(choices, (session) => history.push(session + "/control"))
  }

  return <Button text={text} onClick={handleClick} />
}

const Home = () => (
  <div className="content">
    <NewSessionButton text="Fibonacci" choices={["1", "2", "3", "5", "8", "13", "?"]} />
    <NewSessionButton text="T-Shirt" choices={["XS", "S", "M", "L", "XL", "XXL", "?"]} />
    <NewSessionButton text="✋" choices={["👍", "👌", "🤷", "👎", "🖕"]} />
    <NewSessionButton text="Spotify Helath Check 🚦" choices={["🔴", "🟡", "🟢"]} />
  </div>)

export default Home
