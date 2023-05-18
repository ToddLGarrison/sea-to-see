class ItinerarySerializer {
    static async getSummary(itinerary) {
        const allowedAttributes = ["id", "name", "description"]

        let serializedItinerary = {}
        for (const attribute of allowedAttributes) {
            serializedItinerary[attribute] = itinerary[attribute]
        }

        return serializedItinerary
    }
}

export default ItinerarySerializer