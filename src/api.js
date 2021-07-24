export const baseUrl = "https://api.pajthy.akarasz.me"

export const followRedirectsAndOpenWSConnection = async (currentURL) => {
  return await fetch(currentURL.replace(/^ws/, "http"), {
    method: "GET",
    redirect: 'follow'
  })
  .then(res => {
    if (res.status === 426) {
      return new WebSocket(currentURL.replace(/^http/, "ws"))
    } else {
      throw res
    }
  })
}

export const createSession = (choices, onSuccess) => (
  fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(choices),
  })
  .then(res => {
    if (res.status === 201) {
      onSuccess?.(res.headers.get("location"))
    } else {
      throw res
    }
  }))

export const choices = (sessionId, onSuccess) => (
  fetch(baseUrl + "/" + sessionId, {
    method: "GET",
  })
  .then(res => Promise.all([res.status, res.json()]))
  .then(([code, body]) => {
    if (code === 200) {
      onSuccess?.(body)
    } else {
      throw (code, body)
    }
  }))

export const vote = (sessionId, name, choice, onSuccess) => (
  fetch(baseUrl + "/" + sessionId, {
    method: "PUT",
    body: JSON.stringify({Participant: name, Choice: choice}),
  })
  .then(res => {
    if (res.status === 202) {
      onSuccess?.()
    } else {
      throw res
    }
  }))

export const getSession = (sessionId, onSuccess) => (
  fetch(baseUrl + "/" + sessionId + "/control", {
    method: "GET",
  })
  .then(res => Promise.all([res.status, res.json()]))
  .then(([code, body]) => {
    if (code === 200) {
      onSuccess?.(body)
    } else {
      throw (code, body)
    }
  }))

export const startVote = (sessionId, onSuccess) => (
  fetch(baseUrl + "/" + sessionId + "/control/start", {
    method: "PATCH",
  })
  .then(res => {
    if (res.status === 202) {
      onSuccess?.()
    } else {
      throw res
    }
  }))

export const stopVote = (sessionId, onSuccess) => (
  fetch(baseUrl + "/" + sessionId + "/control/stop", {
    method: "PATCH",
  })
  .then(res => {
    if (res.status === 202) {
      onSuccess?.()
    } else {
      throw res
    }
  }))

export const resetVote = (sessionId, onSuccess) => (
  fetch(baseUrl + "/" + sessionId + "/control/reset", {
    method: "PATCH",
  })
  .then(res => {
    if (res.status === 202) {
      onSuccess?.()
    } else {
      throw res
    }
  }))

export const kickParticipant = (sessionId, name, onSuccess) => (
  fetch(baseUrl + "/" + sessionId + "/control/kick", {
    method: "PATCH",
    body: name,
  })
  .then(res => {
    if (res.status === 204) {
      onSuccess?.()
    } else {
      throw res
    }
  }))

export const join = (sessionId, name, onSuccess, onAlreadyJoined) => (
  fetch(baseUrl + "/" + sessionId + "/join", {
    method: "PUT",
    body: name,
  })
  .then(res => {
    if (res.status === 201) {
      onSuccess?.()
    } else if (res.status === 409) {
      onAlreadyJoined?.()
    } else {
      throw res
    }
  }))
