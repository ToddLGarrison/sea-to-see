class DestinationSerializer {
    static async destinationDetails(destination) {
        const allowedAttributes = ["id", "city", "description"]
        let serializedDestination = {}

        for (const attribute of allowedAttributes) {
            serializedDestination[attribute] = destination[attribute]
        }

        const relatedStops = await destination.$relatedQuery("stops")

        serializedDestination.stops = relatedStops

        return serializedDestination
    }
}

export default DestinationSerializer