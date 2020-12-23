import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import { Button } from "./Commons.jsx"

import { join, choices as getChoices, vote } from "./api.js"
import { baseUrl } from "./api.js"

const TextInput = ({ name, value, autoFocus, onChange, onEnter }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onEnter?.()
    }
  }

  return (
    <div className="pair">
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress} />

    </div>)
}

const JoinForm = ({ defaultValue, onClickJoin }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    onClickJoin(value)
  }

  return (<div className="content">
    <TextInput
      name="Name"
      value={value}
      onChange={handleChange}
      onEnter={handleClick}
      autoFocus />
    <Button text="Join" onClick={handleClick} />
  </div>)
}

const Session = ({ name }) => {
  const [choices, setChoices] = useState([])
  const [selected, setSelected] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const { sessionId } = useParams()
  const ws = useRef(null)

  useEffect(() => {
    getChoices(sessionId, (res) => {
      setChoices(res.Choices)
      setEnabled(res.Open)
    })
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
        setSelected(null)
      } else if (event.Kind === "disabled") {
        setEnabled(false)
      } else if (event.Kind === "reset") {
        setEnabled(false)
        setSelected(null)
      }
    }
  }, [sessionId])

  return (
    <div className="content">
      {choices.map((c, i) =>
        <VoteButton
          key={i}
          choice={c}
          name={name}
          enabled={enabled}
          selected={selected === c}
          onClick={setSelected} />
      )}
    </div>)
}

const VoteButton = ({ name, choice, enabled, selected, onClick }) => {
  const { sessionId } = useParams()

  const handleClick = (choice) => {
    vote(sessionId, name, choice, () => onClick(choice))
  }

  return (
    <Button
      className={selected ? "selected": null}
      text={choice}
      disabled={!enabled}
      onClick={() => handleClick(choice)} />
    )
}

const Vote = () => {
  const [name, setName] = useState(null)
  const { sessionId } = useParams()

  const saveName = (name) => {
    window.localStorage.setItem("name", name)
    setName(name)
  }

  if (name === null) {
    const handleJoin = (name) => {
      join(
        sessionId,
        name,
        () => saveName(name),
        () => saveName(name))
    }

    return (
      <JoinForm
        onClickJoin={handleJoin}
        defaultValue={name || window.localStorage.getItem("name") || ""} />)
  } else {
    return <Session name={name} />
  }
}

export default Vote