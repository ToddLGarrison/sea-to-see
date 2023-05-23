import React, { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

import MapSearch from "./MapSearch.js"
import ResultList from "./ResultList.js"

const GoogleMap = (props) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [error, setError] = useState("")
    
    const loader = new Loader({
        apiKey: "AIzaSyDvgwolfoAlewWA0qA02zBI4b53fgXOK-w",
        libraries: ["places"]
    });

    useEffect(() => {
        setError("")
        loader.load().then(() => {
        // const boston = { lat: 42.361, lng: -71.057 };
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                        
                        const request = {
                            query: searchQuery,
                            location: userLocation,
                            radius: "800"
                        }

                        const map = new google.maps.Map(document.getElementById("map"), {
                            center: userLocation,
                            zoom: 10,
                        })

                        const service = new google.maps.places.PlacesService(map);
                        if (searchQuery) {
                            service.textSearch(request, function(results, status) {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                setSearchResults(results)
                                results.forEach((result) => {
                                const resultContent = 
                                    `<p>${result.name}</p>` +
                                    `<p>${result.formatted_address}</p>`

                        const infowindow = new google.maps.InfoWindow({
                            content: resultContent,
                            ariaLabel: result.name,
                        })
                
                        const marker = new google.maps.Marker({
                            position: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
                            map: map,
                        })

                        marker.addListener("click", () => {
                            infowindow.open({
                                anchor: marker,
                                map,
                            })
                        })
                    })
                        map.setCenter(results[0].geometry.location);
                    } else {
                        setError("No results found, please try again.")
                    }
                })
            }
        },
        (error) => {
            console.error("Error retrieving user location", error)
        }
        )
    } else {
        console.error("Geolocation is not supported by this browser")
    }
})
    }, [searchQuery])

    return (
        <>
            <h1>Search Map</h1>
            <MapSearch setSearchQuery={setSearchQuery} />
            <p className="error">{error}</p>
            <div id="map" style={{height:400}}></div>
            <ResultList searchResults={searchResults} />
        </>
    )
}

export default GoogleMap