import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../managers/EventManager";

export const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    getEventById(id).then(data => setEventDetails(data))

  }, [id]);


  return (
    <article className="event-details">
      <h2>{eventDetails.title}</h2>
      <div>Location: {eventDetails.location}</div>
    </article>
  );
};