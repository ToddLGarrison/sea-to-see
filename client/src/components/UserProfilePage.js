import React from "react";
import UserItineraryList from "./UserItineraryList";

const UserProfilePage = (props) => {
    return(
        <>
            <h2>Account Details</h2>
            <h4>Username: {props.user.username}</h4>
            <h4>Email: {props.user.email}</h4>
            <h2>Your Itinerary List</h2>
            <UserItineraryList />
        </>
    )
}

export default UserProfilePage