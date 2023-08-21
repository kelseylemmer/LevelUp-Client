import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { Link, useNavigate } from "react-router-dom"


export const GameList = (props) => {
  const [games, setGames] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    getGames().then(data => setGames(data))
  }, [])

  return (
    <article className="games">
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/games/new" })
        }}
      >Register New Game</button>
      {
        games.map(game => {
          return <section key={`game--${game.id}`} className="game">
            <div className="game__title"><Link to={`/games/${game.id}`}>{game.title}</Link></div>
            <div> by {game.maker}</div>
          </section>
        })
      }
    </article>
  )
}