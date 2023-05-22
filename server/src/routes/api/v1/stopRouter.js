import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Stop } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import StopSerializer from "../../../serializers/StopSerializer.js"

const stopRouter = new express.Router({ mergeParams: true })

stopRouter.post("/", async (req, res) => {
    const bodyRaw = req.body
    const body = cleanUserInput(bodyRaw)
    const itineraryIdParams = req.params.id
    const destination = req.destination
    const stopDataWithId = {...body, itineraryId: itineraryIdParams, destinationId: destination.id}

    console.log(stopDataWithId)

    try {
        const newStop = await Stop.query().insertAndFetch(stopDataWithId)
        const stopSerializer = StopSerializer.stopDetails(newStop)
        return res.status(201).json({ stops: stopSerializer})
    } catch(error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        }
        console.log(error)
        return res.status(500).json({ errors: error})
    }
})

export default stopRouter