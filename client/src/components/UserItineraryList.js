import React, { useState, useEffect } from "react";
import ItineraryTile from "./ItineraryTile";

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
            <ItineraryTile
                key={itineraryObject.id} 
                itinerary={itineraryObject}
            />
        )
    })

    return (
        <div className="itinerary-showpage-list">
            <h2 className="form-title">My Itinerary List</h2>
            <div className="grid-x grid-margin-x">
                {userItineraryListItems}
            </div>
        </div>
    )
}
export default UserItineraryList