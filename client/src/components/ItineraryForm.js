import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone"


const ItineraryForm = (props) => {
    const [images, setImages] = useState([])
    const [newImageFormData, setNewImageFormData] = useState([])

    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newItinerary, setNewItinerary] = useState({
        name: "",
        description: "",
        departure: "",
        return: ""
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

    const handleImageUpload = (acceptedImage) => {
        setNewImageFormData({
            ...newImageFormData,
            image: acceptedImage[0]
        })
    }

    const postItinerary = async (newItineraryData) => {
        const formData = new FormData()
        formData.append('name', newItinerary.name)
        formData.append('description', newItinerary.description)
        formData.append('departureDate', newItinerary.departureDate)
        formData.append('returnDate', newItinerary.returnDate)
        formData.append('image', newItinerary.image)
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
        <div className="callout form-box">
            <h2 className="form-title">Create New Itinerary</h2>
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
                <div className="callout primary">
                    <Dropzone onDrop={handleImageUpload}>
                        {({getRootProps, getInputProps}) =>(
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="form-title">Upload Itinerary Picture - drag 'n' drop or click to upload</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <input className="button travel-button" type="submit" value="Create" />
            </form>
        </div>
    )
}

export default ItineraryForm