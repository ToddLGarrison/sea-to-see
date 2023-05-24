import React from "react";

const DestinationTile = props => {
    const { city, description } = props.destination
    return (
        <div>
            <div className="destination-stop-box">
                <p className="destination-place-name">{city}:</p>
                <p className="itinerary-description">{description}</p>
            </div>
        </div>
    )
}

export default DestinationTile