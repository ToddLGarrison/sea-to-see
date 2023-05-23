import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Destination } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import DestinationSerializer from "../../../serializers/DestinationSerializer.js"

const destinationRouter = new express.Router({ mergeParams: true })

destinationRouter.post("/", async (req, res) => {
    const bodyRaw = req.body
    const body = cleanUserInput(bodyRaw)
    const itineraryIdParams = req.params.id
    const user = req.user
    const destinationDataWithId = {...body, itineraryId: itineraryIdParams, userId: user.id}
    
    try {
        const newDestination = await Destination.query().insertAndFetch(destinationDataWithId)
        const destinationSerialized = DestinationSerializer.destinationDetails(newDestination)
        return res.status(201).json({ destinations: destinationSerialized})

    } catch (error){
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        }
        return res.status(500).json({ errors: error })
    }

})

export default destinationRouter