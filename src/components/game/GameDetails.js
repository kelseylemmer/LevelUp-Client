import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById } from "../../managers/GameManager.js";

export const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    getGameById(id).then(data => setGameDetails(data))

  }, [id]);


  return (
    <article className="game-details">
      <h2>{gameDetails.title}</h2>
      <div>Creator: {gameDetails.creator}</div>
      <div>Number of Players: {gameDetails.number_of_players}</div>
      <div>Skill Level: {gameDetails.skill_level}</div>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: `/games/${gameDetails.id}/update` })
        }}
      >Edit Game</button>
    </article>
  );
};