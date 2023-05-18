import ItinerarySerializer from "./ItinerarySerializer.js"

class UserSerializer {
    static async getSummary(user) {
        const allowedAttributes = ["id", "email", "username"]

        let serializedUser = {}
        for (const attribute of allowedAttributes) {
            serializedUser[attribute] = user[attribute]
        }
        const relatedItineraries = await user.$relatedQuery("itineraries")
        const serializedItineraries = await Promise.all(
            relatedItineraries.map(async (itinerary) => await ItinerarySerializer.getSummary(itinerary))
        )
        
        serializedUser.itineraries = serializedItineraries
        
        return serializedUser
    }
}
export default UserSerializer