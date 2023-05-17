import React, { useState, useEffect } from "react";

const ItineraryShowPage = (props) => {
    const [itinerary, setItinerary] = useState({})

    const getItinerary = async () => {
        try {
            const itineraryId = props.match.params.id
            const response = await fetch(`/api/v1/itineraries/${itineraryId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setItinerary(responseBody.itinerary)
        } catch(error){
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(() =>{
        getItinerary()
    }, [])
    
    let descriptionSection
    if (itinerary.description) {
        descriptionSection = <p>Itinerary description: {itinerary.description}</p>
    }
    return (
        <>
            <h2>Your Itinerary</h2>
            <h3>{itinerary.name}</h3>
            {descriptionSection}
        </>
    )
}

export default ItineraryShowPage