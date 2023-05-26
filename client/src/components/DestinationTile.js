import React from "react";

const DestinationTile = (props) => {
    const { id, city, description } = props.destination
    const deleteDestination = props.deleteDestination

    const handleDelete = () => {
        deleteDestination(id)
    }

    return (
        <div>
            <div className="destination-stop-box">
                <div className="destination-details">
                    <p className="destination-place-name">{city}: </p>
                    <p className="itinerary-description">{description}</p>
                </div>
                <button className="button travel-button delete-button" onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}

export default DestinationTile