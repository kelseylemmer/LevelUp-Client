import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"



export const EventForm = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable,
      provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date_time: "",
    game: 0,
    location: ""
  })

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
      <h2 className="gameForm__title">Register New Game</h2>
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
            value={currentEvent.game}
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
            game: parseInt(currentEvent.game),
            location: currentEvent.location
          }

          // Send POST request to your API
          createEvent(event)
            .then(() => navigate("/events"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}