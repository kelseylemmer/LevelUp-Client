import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { editEvent, getEventById } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"




export const EditEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [games, setGames] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable,
      provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({})

  useEffect(() => {
    getEventById(id)
      .then((data) => {
        setCurrentEvent(data);
      });
  }, [id]);

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGames().then((data) => { setGames(data) })
  }, [])

  const changeEventState = (event) => {
    // TODO: Complete the onChange function
    const { name, value } = event.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Edit Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Event Title: </label>
          <input
            type="text"
            name="title"
            required autoFocus
            className="form-control"
            value={currentEvent.title}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date_time">Event Date & Time: </label>
          <input
            type="text"
            name="date_time"
            required autoFocus
            className="form-control"
            value={currentEvent.date_time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game">Game: </label>
          <select
            name="game"
            required autoFocus
            className="form-control"
            value={currentEvent.game.id}
            onChange={changeEventState}
          >
            <option value="">Select Game</option>
            {games.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            required autoFocus
            className="form-control"
            value={currentEvent.location}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const event = {
            title: currentEvent.title,
            date_time: currentEvent.date_time,
            game: parseInt(currentEvent.game.id),
            location: currentEvent.location
          }

          // Send POST request to your API
          editEvent(id, event)
            .then(() => navigate("/events"))
        }}
        className="btn btn-primary">Update</button>
    </form>
  )
} 