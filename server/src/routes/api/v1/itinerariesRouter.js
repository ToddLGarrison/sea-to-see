import express from "express"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { User, Itinerary, Destination } from "../../../models/index.js"
import destinationRouter from "./destinationRouter.js"
import uploadImage from "../../../services/uploadImage.js"

const itinerariesRouter = new express.Router()

itinerariesRouter.get("/", async (req, res) => {
    try {
        const itineraries = await Itinerary.query()
        return res.status(200).json({ itineraries: itineraries})
    } catch(error) {
        return res.status(500).json({ errors: error })
    }
})

itinerariesRouter.post("/", uploadImage.single("image") async (req, res) => {
    const { name, description, departureDate, returnDate } = req.body
    const { id } = req.user
    const image = req.file ? req.file.location : null
    try {
        const postingUser = await User.query().findById(id)
        const cleanItinerary = cleanUserInput({ name, description, departureDate, returnDate, imageURL: image })
        const newItinerary = await postingUser.$relatedQuery("itineraries").insertAndFetch(cleanItinerary)

        return res.status(201).json({ itineraries: newItinerary })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error })
        } else {
            return res.status(500).json({ errors: error })
        }
    }
})

itinerariesRouter.get("/:id", async (req, res) => {
    const itineraryId = req.params.id
    try {
        const showItinerary = await Itinerary.query().findById(itineraryId)
        const destinations = await showItinerary.$relatedQuery("destinations")
        showItinerary.destinations = destinations
        return res.status(200).json({ itinerary: showItinerary })
    } catch(error) {
        return res.status(500).json({ errors: error })
    }
})

itinerariesRouter.patch("/:id", async (req, res)=> {
    const { name, description, departureDate, returnDate } = req.body
    const { id } = req.user
    const itineraryId = req.params.id

    try {
        const itineraryToUpdate = await Itinerary.query().findById(itineraryId)
        if(id === itineraryToUpdate.userId) {
            const cleanItinerary = cleanUserInput({ name, description, departureDate, returnDate })
            const updateItinerary = await Itinerary.query().patchAndFetchById(itineraryId, {
                name: cleanItinerary.name, 
                description: cleanItinerary.description, 
                departureDate: cleanItinerary.departureDate, 
                returnDate: cleanItinerary.returnDate 
            })
            return res.status(201).json({ itinerary: updateItinerary })
        } else {
            return res.status(404).json({ status: "Update Failed"})
        }
    } catch(error){
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error })
        } else{ 
            return res.status(500).json({ errors: error })
        }
    }
})

itinerariesRouter.delete("/:id", async (req, res) => {
    const { id } = req.user;
    const itineraryId = req.params.id;
    
        try {
        const itineraryToDelete = await Itinerary.query().findById(itineraryId);
        if (id === itineraryToDelete.userId) {
            await Destination.query().delete().where("itineraryId", "=", itineraryId);
            await Itinerary.query().delete().where("id", "=", itineraryId);
            return res.status(200).json({ status: "Itinerary Deleted" });
        } else {
            return res.status(404).json({ status: "Error with Deleting" });
        }
        } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error });
        } else {
            return res.status(500).json({ errors: error });
        }
        }
    });

itinerariesRouter.use("/:id/destinations", destinationRouter)

export default itinerariesRouter