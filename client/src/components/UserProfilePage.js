import React from "react";

const UserProfilePage = (props) => {
    return(
        <>
        <h2>Account Details</h2>
        <h4>Username: {props.user.username}</h4>
        <h4>Email: {props.user.email}</h4>
        </>
    )
}

export default UserProfilePage