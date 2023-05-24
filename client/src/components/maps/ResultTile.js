import React from "react"

const ResultTile = (props) => {
    const handleAddDestination = () => {
        const { name, types } = props.result
        const destination = {
            city: name,
            description: types[0],
        }
        props.addGoogleDestinationToList(destination)
    }
    return (
        <div className="callout">
            <h3>{props.result.name}</h3>
            <p>{props.result.types[0]}</p>
            <p>{props.result.formatted_address}</p>
            <p>{props.result.rating} / 5</p>
            <button className="button" onClick={handleAddDestination}>Add to Destination List</button>
        </div>
    )
}

export default ResultTile