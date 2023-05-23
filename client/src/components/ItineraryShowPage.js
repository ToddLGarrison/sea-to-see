import React, { useState, useEffect } from "react";
import DestinationForm from "./DestinationForm";
import ItineraryDestinationList from "./ItineraryDestinationList";
import translateServerErrors from "../services/translateServerErrors"
import GoogleMap from "./maps/GoogleMap";
import { Redirect } from "react-router-dom";

const ItineraryShowPage = (props) => {
    const [itinerary, setItinerary] = useState({
        name:"",
        description: "",
        departureDate: "",
        returnDate: "",
        destinations: []

    })

    const [ errors, setErrors] = useState([])
    const [destinations, setDestinations] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

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

    let dateSection
    if (itinerary.departureDate) {
        dateSection = <div className="itinerary-description">
            Dates: {itinerary.departureDate} -{itinerary.returnDate}
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

    let editButton;

    const editItinerary = () => {
        setShouldRedirect({ status: true, newItineraryId: itinerary?.id })
    }

    if(props.user?.id === itinerary.userId){
        editButton = <button className="button" onClick={editItinerary}>Edit/Delete Itinerary</button>
    }

    if(shouldRedirect){
        return <Redirect push to={`/itineraries/${shouldRedirect.newItineraryId}/edit`}/>
    }

    return (
        <div className="itinerary-box">
                <h3 className="form-title">My {itinerary.name} Itinerary</h3>
                {dateSection}
                {descriptionSection}
                
            <div>
                <ItineraryDestinationList destinations={destinations} />
                {destinationForm}
                <div>
                    <GoogleMap />
                </div>
            </div>
            {editButton}
        </div>
    )
}

export default ItineraryShowPage