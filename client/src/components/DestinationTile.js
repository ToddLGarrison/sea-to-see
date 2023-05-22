import React from "react";

const DestinationTile = props => {
    const { city, description, id,  } = props.destination
    return (
        <div className="destination-stop-box">
            <p>{id}: {city} - {description}</p>
        </div>
    )
}

export default DestinationTile