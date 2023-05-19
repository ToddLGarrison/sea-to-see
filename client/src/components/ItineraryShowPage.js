import React, { useState, useEffect } from "react";
import DestinationForm from "./DestinationForm";
import ItineraryDestinationList from "./ItineraryDestinationList";
import translateServerErrors from "../services/translateServerErrors"

const ItineraryShowPage = (props) => {
    const [itinerary, setItinerary] = useState({
        name:"",
        description: "",
        destinations: []

    })

    const [ errors, setErrors] = useState([])
    const [destinations, setDestinations] = useState([])

    const postDestination = async (newDestination) => {
        try{
            const itineraryId = props.match.params.id
            const response = await fetch(`/api/v1/itineraries/${itineraryId}/destinations`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newDestination)
            })
            if (!response.ok) {
                if(response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw(error)
                }
            } else {
                const body = await response.json()
                setErrors([])
                return setDestinations([body.destinations, ...destinations])
            }
        } catch(error){
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

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
            setDestinations(responseBody.itinerary.destinations)
        } catch(error){
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(() =>{
        getItinerary()
    }, [])
    
    let descriptionSection
    if (itinerary.description) {
        descriptionSection = <div className="itinerary-description">
            {itinerary.description}
            </div>
    }

    let destinationForm
    if (props.user) {
        destinationForm = (
            <DestinationForm
                postDestination={postDestination}
                errors={errors}
            />
        )
    }

    return (
        <>
            <div className="itinerary-box">
                <h3 className="form-title">My {itinerary.name} Itinerary</h3>
                {descriptionSection}
                <ItineraryDestinationList destinations={destinations} />
                {destinationForm}
            </div>
        </>
    )
}

export default ItineraryShowPage