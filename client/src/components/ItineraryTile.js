import React from "react";
import { Link } from "react-router-dom";

const ItineraryTile = props => {
    const { name, description, id } = props.itinerary
    return (
        <div className="cell small-12 medium-6 large-3">
            <div>
                <Link to={`/itineraries/${id}`} >{name}</Link>
            </div>
            <p>{description}</p>
        </div>
    )
}

export default ItineraryTile