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
        return res.status(201).json({ destination: destinationSerialized})

    } catch (error){
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        }

        return res.status(500).json({ errors: error })
    }

})

destinationRouter.delete("/:destinationId", async (req, res) => {
    const itineraryId = req.params.id
    const destinationId = req.params.destinationId
    const user = req.user

    try {
        const destinationToDelete = await Destination.query().findById(destinationId)
        .where({ id: destinationId, itineraryId: itineraryId})
        .first()

        if (!destinationToDelete) {
            return res.status(404).json({ status: "Destination not found!"})
        }
        if (user.id !== destinationToDelete.userId) {
            return res.status(403).json({ status: "Cannot delete destination" })
        }
        await Destination.query().deleteById(destinationId)
        return res.status(200).json({ status: "Destination deleted" })
    } catch(error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        } else {
            return res.status(500).json({ errors: error })
        }
    }
})

export default destinationRouter