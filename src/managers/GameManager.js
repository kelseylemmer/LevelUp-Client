export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const createGame = (game) => {
  return fetch("http://localhost:8000/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(game)
  })
    .then(response => response.json())
}

export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    method: "GET",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const getGameById = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}

export const editGame = (id, game) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(game),
  })
};