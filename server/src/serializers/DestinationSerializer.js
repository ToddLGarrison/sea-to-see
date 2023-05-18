class DestinationSerializer {
    static destinationDetails(destination) {
        const allowedAttributes = ["id", "city", "description"]
        let serializedDestination = {}

        for (const attribute of allowedAttributes) {
            serializedDestination[attribute] = destination[attribute]
        }
        return serializedDestination
    }
}

export default DestinationSerializer