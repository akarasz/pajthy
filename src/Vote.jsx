import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import { Button } from "./Commons.jsx"

import { join, choices as getChoices, vote } from "./api.js"
import { baseUrl } from "./api.js"

const TextInput = ({ name, placeholder, onChange }) => (
  <div className="pair">
    <label htmlFor={name}>{name}</label>
    <input id={name} type="text" placeholder={placeholder} onChange={onChange} />
  </div>)

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
    <Button text="Join" onClick={handleClick} />
  </div>)
}

const Session = ({ name }) => {
  const [choices, setChoices] = useState([])
  const [enabled, setEnabled] = useState(false)
  const { sessionId } = useParams()
  const ws = useRef(null)

  useEffect(() => {
    getChoices(sessionId, setChoices)
  }, [sessionId])

  useEffect(() => { // handle websocket creation
    ws.current = new WebSocket("wss://" + baseUrl + "/" + sessionId + "/ws")

    return () => {
      ws.current.close();
    }
  }, [sessionId])

  useEffect(() => { // handle websocket onevent
    if (!ws.current) {
      return
    }

    ws.current.onmessage = (e) => {
      const event = JSON.parse(e.data)
      if (event.Kind === "enabled") {
        setEnabled(true)
      } else if (event.Kind === "disabled") {
        setEnabled(false)
      }
    }
  }, [sessionId])

  return (
    <div className="content">
      {choices.map((c, i) => <VoteButton key={i} name={name} enabled={enabled} choice={c} />)}
    </div>)
}

const VoteButton = ({ name, enabled, choice }) => {
  const { sessionId } = useParams()

  const handleClick = (choice) => {
    vote(sessionId, name, choice)
  }

  return (
    <Button text={choice} disabled={!enabled} onClick={() => handleClick(choice)} />
    )
}

const Vote = () => {
  const [name, setName] = useState(null)
  const { sessionId } = useParams()

  if (name === null) {
    const handleJoin = (name) => {
      join(
        sessionId,
        name,
        () => setName(name),
        () => setName(name))
    }

    return <JoinForm onClickJoin={handleJoin} />
  } else {
    return <Session name={name} />
  }
}

export default Vote