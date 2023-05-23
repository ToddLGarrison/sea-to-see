import React, { useState, useEffect} from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { Redirect } from "react-router-dom";
import cleanDBOutput from "../services/cleanDBOutput";

const EditDeleteItineraryForm = props => {

    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newItinerary, setNewItinerary] = useState({
        name: "",
        description: "",
        departureDate: "",
        returnDate: ""
    })

    const handleInputChange = (event) => {
        setNewItinerary({
            ...newItinerary,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        patchItinerary
    }

    const getItinerary = async () => {
        try {
            const itineraryId = props.match.params.id
            const response = await fetch(`/api/v1/itineraries/${itineraryId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
                }
            const responseBody = await response.json()
            const updatedItinerary = cleanDBOutput(responseBody.itinerary)

            setNewItinerary({ name: updatedItinerary.name, description: updatedItinerary.description, departureDate: updatedItinerary.departureDate, returnDate: updatedItinerary.returnDate})
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getItinerary()
    }, [])

    if (shouldRedirect) {
        return <Redirect push to={`/itineraries/${shouldRedirect.newItineraryId}`}/>
    }

    const patchItinerary = async () => {
        const newItineraryName = newItinerary.name
        const newItineraryDescription = newItinerary.description
        const newItineraryDepartureDate = newItinerary.departureDate
        const newItineraryReturnDate = newItinerary.returnDate
        const itineraryId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/itineraries/${itineraryId}`, {
                method: "PATCH",
                headers: new Headers({
                    "content-Type": "application/json"
                }),
                body: JSON.stringify({ name: newItineraryName, description: newItineraryDescription, departureDate: newItineraryDepartureDate, returnDateDate: newItineraryReturnDate })
            })
            if(!response.ok) {
                if (response.status == 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                }
            } else {
                const responseBody = await response.json()
                const updatedItineraryRaw = responseBody.itinerary
                const updatedItinerary = cleanDBOutput(updatedItineraryRaw)
                setShouldRedirect({ status: true, newItineraryId: updatedItinerary.id})
            }
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    const deleteItinerary = async () => {
        const itineraryId = props.match.params.id

        try {
            const response = await fetch(`/api/v1/itineraries/${itineraryId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
            })
            if(!response.ok) {
                if (response.status == 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                }
            } else {
                const responseBody = await response.json()
                setShouldRedirect({ status: true, newItineraryId: ""})
            }
        } catch (error){
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    return (
        <div className="callout form-box">
            <h1>Edit Itinerary</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={newItinerary.name}
                        />
                </label>
                <label>
                    Description:
                        <input
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                            value={newItinerary.description}
                        />
                </label>
                <label>
                    Departure Date:
                        <input
                            type="text"
                            name="departureDate"
                            onChange={handleInputChange}
                            value={newItinerary.departureDate}
                        />
                </label>
                <label>
                    Return:
                        <input
                            type="text"
                            name="returnDate"
                            onChange={handleInputChange}
                            value={newItinerary.returnDate}
                        />
                </label>
                <input className="button" type="submit" defaultValue="Edit" />
            </form>
            <button className="button" onClick={deleteItinerary}>Delete Itinerary</button>
        </div>
    )

}

export default EditDeleteItineraryForm