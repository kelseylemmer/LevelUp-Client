import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { editGame, getGameById, getGameTypes } from '../../managers/GameManager.js'



export const EditGame = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [gameTypes, setGameTypes] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({})

  useEffect(() => {
    getGameById(id)
      .then((data) => {
        setCurrentGame(data);
      });
  }, [id]);

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => { setGameTypes(data) })
  }, [])

  const changeGameState = (event) => {
    // TODO: Complete the onChange function
    const { name, value } = event.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Edit Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input
            type="number"
            name="numberOfPlayers"
            required autoFocus
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <input
            type="text"
            name="skill_level"
            required autoFocus
            className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type: </label>
          <select
            name="gameTypeId"
            required autoFocus
            className="form-control"
            value={currentGame.game_type}
            onChange={changeGameState}
          >
            <option value="">Select Game Type</option>
            {gameTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.type}
              </option>
            ))}
          </select>

        </div>
      </fieldset>


      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const game = {
            title: currentGame.title,
            maker: currentGame.maker,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: currentGame.skill_level,
            game_type: parseInt(currentGame.game_type)
          }

          // Send POST request to your API
          editGame(id, game)
            .then(() => navigate("/games"))
        }}
        className="btn btn-primary">Update</button>
    </form>
  )
}