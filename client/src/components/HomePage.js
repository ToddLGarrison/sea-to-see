import React from "react";
import oman from "../assets/images/Oman_Mountain_Sunset.jpg"

const HomePage = (props) => {
    return(
        <div className="primary home-box">
            <div classname="grid homepage">
                <img className="homepage-photo" src={oman} alt="Sun set in Jabal Shams, Oman" />
            </div>
            <h4 className="homepage-text">
                Plan <em>your</em> trip
            </h4>
            <p className="developed-by-text">Developed by Todd Garrison</p>
        </div>
    )
}

export default HomePage