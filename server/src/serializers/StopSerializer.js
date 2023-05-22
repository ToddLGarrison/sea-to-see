class StopSerializer {
    static stopDetails(stop) {
        const allowedAttributes = ["id", "place", "description"]
        let serializedStop = {}

        for (const attribute of allowedAttributes) {
            serializedStop[attribute] = stop[attribute]
        }
        return serializedStop
    }
}

export default StopSerializer