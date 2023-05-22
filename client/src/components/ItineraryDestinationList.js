import React from "react";
import DestinationTile from "./DestinationTile";

const ItineraryDestinationList = ({ destinations }) => {
    const itineraryDestinationList = destinations.map((destination) => (
        <DestinationTile
            key={destination.id}
            destination={destination}
        />
    ));

    return (
        <div className="destination-box">
            <h4 className="form-title">Destinations</h4>
            {itineraryDestinationList}
        </div>
    );
};

export default ItineraryDestinationList;    