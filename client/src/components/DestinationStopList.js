import React from "react";
import StopTile from "./StopTile";

const DestinationStopList = ({ stops }) => {
    const DestinationStopList = stops.map((stop) => (
        <StopTile
            key={stop.id}
            stop={stop}
        />
    ));

    return (
        <div>
            <h4>Stops</h4>
            {DestinationStopList}
        </div>
    )
}

export default DestinationStopList