import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const DestinationForm = ({ postDestination, errors }) => {
    const [newDestination, setNewDestination] = useState({
        city: "",
        description: ""
    })

    const handleChange = (event) => {
        setNewDestination({
            ...newDestination,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postDestination(newDestination)
        clearForm()
    }

    const clearForm = () => {
        setNewDestination({
            city: "",
            description: ""
        })
    }

    return (
        <div className="callout destination-form-box">
            <h4 className="form-title">Add a Destination</h4>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input type="text" name="city" onChange={handleChange} value={newDestination.city}/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" onChange={handleChange} value={newDestination.description}/>
                </label>
                <div className="button-group">
                    <input className="button travel-button" type="submit" value="Add Destination" />
                </div>
            </form>
        </div>
    )

}

export default DestinationForm