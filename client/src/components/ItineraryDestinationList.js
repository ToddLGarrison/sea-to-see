import React from "react";
import DestinationTile from "./DestinationTile";

const ItineraryDestinationList = (props) => {
    const itineraryDestinationList = props.destinations.map((destination) =>{
        return(
            <DestinationTile
                key={destination.id}
                city={destination.city}
                description={destination.description}
            />
        )
    })
    return(
        <>
            <h4>Destinations</h4>
            {itineraryDestinationList}
        </>
    )
}

export default ItineraryDestinationList