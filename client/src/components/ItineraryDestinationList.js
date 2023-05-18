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
        <>
            <h4>Destinations</h4>
            {itineraryDestinationList}
        </>
    );
};

export default ItineraryDestinationList;  