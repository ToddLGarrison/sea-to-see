import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Destination } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import DestinationSerializer from "../../../serializers/DestinationSerializer.js"

const destinationRouter = new express.Router({ mergeParams: true })

destinationRouter.get("/", async (req, res) => {
    const itineraryId = req.params.id

    try {
        const destinations = await Destination.query().where("itineraryId", itineraryId)
        return res.status(200).json({ destinations })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

destinationRouter.get("/:id", async (req, res) => {
    const destinationId = req.params.id

    try {
        const destination = await Destination.query().findById(destinationId)
        if(!destination) {
            return res.status(404).json({ errors: error })
        }
        return res.status(200).json({ destination })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

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

destinationRouter.delete("/:id", async (req, res) => {
    const destinationId = req.params.id

    try {
        const destinationToDelete = await Destination.query().findById(destinationId)
        if(destinationToDelete) {
            await Destination.query().delete().where("id", "=", destinationId)
            return res.status(200).json({ status: "Destination removed"})
        } else {
            return res.status(404).json({ status: "Error with removing"})
        }
    } catch(error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        } else {
            return res.status(500).json({ errors: error })
        }
    }
})

export default destinationRouter