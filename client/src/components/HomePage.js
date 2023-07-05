import React from "react";
import taj from "../assets/images/baby-taj.png"

const HomePage = (props) => {
    return(
        <div className="primary home-box">
            <div className="grid homepage">
                <img className="homepage-photo" src={taj} alt="Two chairs on a beach" />
                <p className="developed-by-text">Developed by Todd Garrison</p>
            </div>
            <h4 className="homepage-text">
                Plan <em>your</em> trip
            </h4>
        </div>
    )
}

export default HomePage