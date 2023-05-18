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
        event.prevent()
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
        <>
            <h4>Destination</h4>
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
                    <input className="button" type="submit" value="Add Destination" />
                </div>
            </form>
        </>
    )

}

export default DestinationForm