import React from "react";

const ItineraryTile = props => {
    const { name, description, imageURL, departureDate, returnDate, id } = props.itinerary
    return (
            <div className="user-itinerary-list callout">
                <a href={`/itineraries/${props.itinerary.id}`}>
                    <h4>{name}</h4>
                    <p className="itinerary-description">{description}</p>
                    <p>{departureDate}-{returnDate}</p>
                    <div className="tile-image cell small-5">
                        <img src={imageURL} />
                    </div>
                </a>
            </div>
    )
}

export default ItineraryTile

