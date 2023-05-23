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
                departureDate: "5/4",
                returnDate: "10/4",
                userId: bilbo.id
            },
            {
                name: "Rivendell",
                description: "Book tour",
                departureDate: "3/2",
                returnDate: "6/1",
                userId: bilbo.id
            },
            {
                name: "Velen",
                description: "Business trip",
                departureDate: "1/20",
                returnDate: "5/3",
                userId: geralt.id
            },
            {
                name: "Cintra",
                description: "Family visit",
                departureDate: "6/13",
                returnDate: "8/4",
                userId: geralt.id
            },
            {
                name: "Vermont",
                description: "Brewery and hiking tour",
                departureDate: "3/18",
                returnDate: "3/20",
                userId: carrots.id
            },
            {
                name: "Mordor",
                description: "Bilbo bachelor party",
                departureDate: "5/4",
                returnDate: "10/4",
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