import React from "react";

const DestinationTile = (props) => {
    const { id, city, description, deleteDestination } = props.destination

    const handleDelete = () => {
        deleteDestination(id)
    }

    return (
        <div>
            <div className="destination-stop-box">
                <p className="destination-place-name">{city}:</p>
                <p className="itinerary-description">{description}</p>
                <button className="button travel-button delete-button" onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}

export default DestinationTile