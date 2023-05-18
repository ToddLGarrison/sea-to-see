import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { Redirect } from "react-router-dom";

const ItineraryForm = (props) => {
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newItinerary, setNewItinerary] = useState({
        name: "",
        description: ""
    })

    const handleInputChange = (event) => {
        setNewItinerary({
            ...newItinerary,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postItinerary(newItinerary)
    }

    const postItinerary = async (newItineraryData) => {
        try {
            const response = await fetch(`/api/v1/itineraries`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newItineraryData)
            })
            if (!response.ok) {
                if(response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.error.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                }
            } else {
                const responseBody = await response.json()
                const updatedItinerary = responseBody.itineraries
                setNewItinerary({...newItinerary, id: updatedItinerary.id })
                setShouldRedirect(true)
            }
        } catch(error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (shouldRedirect) {
        return <Redirect push to={`/itineraries/${newItinerary.id}`}/>
    }

    return (
        <>
            <h2>Create a New Itinerary</h2>
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
                <input className="button" type="submit" value="Create" />
            </form>
        </>
    )
}

export default ItineraryForm