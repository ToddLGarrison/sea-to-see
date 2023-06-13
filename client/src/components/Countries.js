import React, { useState, useEffect } from "react";

const Countries = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/countries')
                result = await response.json()
                setCountries(result)
            } catch(error) {
                console.error(`Error in Fetch ${error.message}`)
            }
        }
        fetchData()
    }, [])

    const countryList = countries.map((country) => (
        <div key={country.id}>{country.name}</div>
    ))

    return <>{countryList}</>
    

}

export default Countries