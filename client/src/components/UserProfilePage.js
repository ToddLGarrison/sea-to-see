import React from "react";
import UserItineraryList from "./UserItineraryList";

const UserProfilePage = (props) => {
    return(
        <>
            <div className="user-details">
                <h3>Account Details</h3>
                <h5>Username: {props.user.username}</h5>
                <h5>Email: {props.user.email}</h5>
            </div>
            <UserItineraryList />
        </>
    )
}

export default UserProfilePage