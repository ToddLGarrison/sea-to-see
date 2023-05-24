import React from "react";

const ItineraryTile = props => {
    const { name, description, departureDate, returnDate, id } = props.itinerary
    return (
            <div className="user-itinerary-list callout">
                <a href={`/itineraries/${props.itinerary.id}`}>
                    <h4>{name}</h4>
                    <p className="itinerary-description">{description}</p>
                    <p>{departureDate}-{returnDate}</p>
                </a>
            </div>
    )
}

export default ItineraryTile

