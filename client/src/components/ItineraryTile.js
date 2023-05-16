import React from "react";
import { Link } from "react-router-dom";

const ItineraryTile = props => {
    const { name, description, id } = props.itinerary
    return (
        <>
            <li><Link to={`/itineraries/${id}`}>{name}</Link></li>
            <p>{description}</p>
        </>
    )
}

export default ItineraryTile