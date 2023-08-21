import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../../managers/GameManager.js";

export const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});

  useEffect(() => {
    getGameById(id).then(data => setGameDetails(data))

  }, [id]);


  return (
    <article className="game-details">
      <h2>{gameDetails.title}</h2>
      <div>Creator: {gameDetails.creator}</div>
      <div>Number of Players: {gameDetails.number_of_players}</div>
      <div>Skill Level: {gameDetails.skill_level}</div>
    </article>
  );
};