import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../managers/EventManager";


export const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    getEventById(id).then(data => setEventDetails(data))

  }, [id]);


  return (
    <article className="event-details">
      <h2>{eventDetails.title}</h2>
      <div>Location: {eventDetails.location}</div>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: `/events/${eventDetails.id}/update` })
        }}
      >Edit Event</button>
    </article>
  );
};