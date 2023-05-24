import React from "react"

import ResultTile from "./ResultTile"

const ResultList = (props) => {
    const results = props.searchResults.map((result) => {
        return (
        <ResultTile
            key={result.place_id}
            result={result}
            addGoogleDestinationToList={props.addGoogleDestinationToList}
        />
        )
    })

    return (
        <>
            {results}
        </>
    )
}

export default ResultList