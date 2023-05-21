import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserItineraryList = (props) => {
    const [userItineraries, setUserItineraries] = useState([])

    const getUserItineraries = async () => {
        try{
            const response = await fetch("/api/v1/users")
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setUserItineraries(body.itineraries)
        } catch(error) {
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(() =>{
        getUserItineraries()
    }, [])

    const userItineraryListItems = userItineraries.map(itineraryObject => {
        return (
            <li className="user-itinerary-list callout" key={itineraryObject.id}>
                <h4><Link to={`/itineraries/${itineraryObject.id}`}>{itineraryObject.name}</Link></h4>
            </li>
        )
    })

    return (
        <div className="itinerary-showpage-list grid">
            <h2 className="form-title">My Itinerary List</h2>
            {userItineraryListItems}
        </div>
    )
}
export default UserItineraryList