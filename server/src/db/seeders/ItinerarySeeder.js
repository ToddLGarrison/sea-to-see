import { User, Itinerary } from "../../models/index.js"

class ItinerarySeeder {
    static async seed() {
        const bilbo = await User.query().findOne({ email: "bilbo@baggins.com" })
        const geralt = await User.query().findOne({ email: "g-money@email.com" })
        const carrots = await User.query().findOne({ email: "carrot@email.com"})

        const itinerariesData = [
            {
                name: "Mordor",
                description: "Walking tour",
                userId: bilbo.id
            },
            {
                name: "Rivendell",
                description: "Book tour",
                userId: bilbo.id
            },
            {
                name: "Velen",
                description: "Business trip",
                userId: geralt.id
            },
            {
                name: "Cintra",
                description: "Family visit",
                userId: geralt.id
            },
            {
                name: "Vermont",
                description: "Brewery and hiking tour",
                userId: carrots.id
            },
            {
                name: "Mordor",
                description: "Bilbo bachelor party",
                userId: carrots.id
            }
        ]
        for (const singleItineraryData of itinerariesData) {
            const currentItinerary = await Itinerary.query().findOne(singleItineraryData)
            if (!currentItinerary) {
                await Itinerary.query().insert(singleItineraryData)
            }
        }
    }
}

export default ItinerarySeeder