import React from "react";

const DestinationTile = props => {
    const { city, description,  } = props.destination
    return (
        <div className="destination-stop-box">
            <p>{city} - {description}</p>
        </div>
    )
}

export default DestinationTile