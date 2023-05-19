class ItinerarySerializer {
    static async getSummary(itinerary) {
        const allowedAttributes = ["id", "name", "description"]

        let serializedItinerary = {}
        for (const attribute of allowedAttributes) {
            serializedItinerary[attribute] = itinerary[attribute]
        }

        const relatedDestinations = await itinerary.$relatedQuery("destinations")
        
        serializedItinerary.destinations = relatedDestinations

        return serializedItinerary
    }
}

export default ItinerarySerializer