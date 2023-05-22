import React from "react";

const StopTile = props => {
    const { place, description } = props.stop
    return (
        <div>
            <h4>Hello from the StopTile</h4>
            <p>{place} - {description} </p>
        </div>
    )
}

export default StopTile