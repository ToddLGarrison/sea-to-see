import React from "react";
import UserItineraryList from "./UserItineraryList";

const UserProfilePage = (props) => {
    return(
        <>
            <div className="user-details">
                <h2>Account Details</h2>
                <h4>Username: {props.user.username}</h4>
                <h4>Email: {props.user.email}</h4>
            </div>
            <UserItineraryList />
        </>
    )
}

export default UserProfilePage