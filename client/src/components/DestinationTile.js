import React from "react";

const DestinationTile = props => {
    const { city, description, id,  } = props.destination
    return (
        <>
            <p>{city}</p>
            <p>{description}</p>
        </>
    )
}

export default DestinationTile