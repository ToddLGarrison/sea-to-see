import express from "express"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { User, Itinerary } from "../../../models/index.js"

const itinerariesRouter = new express.Router()

itinerariesRouter.get("/", async (req, res) => {
    try {
        const itineraries = await Itinerary.query()
        return res.status(200).json({ itineraries: itineraries})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

itinerariesRouter.post("/new", async (req, res) => {
    const { name, description } = req.body
    const { id } = req.user
    try {
        const postingUser = await User.query().findById(id)
        const cleanItinerary = cleanUserInput({ name, description })
        const newItinerary = await postingUser.$relatedQuery("itineraries").insertAndFetch(cleanItinerary)

        return res.status(201).json({ itineraries: newItinerary })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error })
        } else {
            console.log(error)
            return res.status(500).json({ errors: error })
        }
    }
})

itinerariesRouter.get("/id", async (req, res) => {
    const itineraryId = req.params.id
    try {
        const showItinerary = await Itinerary.query().findById(itineraryId)
        return res.status(200).json({ itinerary: showItinerary })
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default itinerariesRouter