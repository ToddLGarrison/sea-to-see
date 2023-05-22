import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const StopForm = ({ postStop, errors }) => {
    const [newStop, setNewStop] = useState({
        name: "",
        description: "", 
    })

    const handleChange = (event) => {
        setNewStop({
            ...newStop,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postStop(newStop)
        clearForm()
    }

    const clearForm = () => {
        setNewStop ({
            name: "",
            description: ""
        })
    }

return (
    <div className="callout">
        <h4>Add Stop To Destination</h4>
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" onChange={handleChange} value={newStop.name} />
            </label>
            <label>
                Description:
                <input text="text" name="description" onChange={handleChange} value={newStop.description} />
            </label>
            <div className="button-group">
                <input className="button" type="submit" value="Add Stop" />
            </div>
        </form>

    </div>
)
}

export default StopForm