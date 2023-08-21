export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(event)
  })
    .then()
}

export const getEventById = (id) => {
  return fetch(`http://localhost:8000/events/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}