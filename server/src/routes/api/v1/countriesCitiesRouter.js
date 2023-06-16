import express from "express"

const countriesCitiesRouter = new express.Router({ mergeParams: true })

countriesCitiesRouter.get("/countries", async (req, res) => {
    const url = 'https://countries-cities.p.rapidapi.com/location/country/list'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': "db8ed0cebfmsh52ce2fc91c47f63p1a93a7jsn622cfed9d691",
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(url, options)
        const result = await response.text()
        console.log(result)

        if(!results){
            console.log(error)
            return res.status(404).json({ errors: error })
        }
        return res.status(200).json({ result })
    } catch(error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }

})

export default countriesCitiesRouter