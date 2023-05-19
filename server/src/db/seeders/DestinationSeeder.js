import { User, Itinerary, Destination } from "../../models/index.js"

class DestinationSeeder {
    static async seed() {
        const bilbo = await User.query().findOne({ email: "bilbo@baggins.com" })
        const geralt = await User.query().findOne({ email: "g-money@email.com" })
        const carrots = await User.query().findOne({ email: "carrot@email.com"})

        const mordor = await Itinerary.query().findOne({ name: "Mordor" })
        const rivendell = await Itinerary.query().findOne({ name: "Rivendell" })
        const velen = await Itinerary.query().findOne({ name: "Velen" })
        const cintra = await Itinerary.query().findOne({ name: "Cintra" })
        const vermont = await Itinerary.query().findOne({ name: "Vermont" })
    
        const destinationData = [
            {
                city: "Black gate",
                description: "Great food",
                userId: bilbo.id,
                itineraryId: mordor.id
            },
            {
                city: "Rivendell",
                description: "Best bakery",
                userId: bilbo.id,
                itineraryId: rivendell.id
            },
            {
                city: "Oxenfurt",
                description: "A cute city",
                userId: geralt.id,
                itineraryId: velen.id
            },
            {
                city: "Cintra",
                description: "What a castle",
                userId: geralt.id,
                itineraryId: cintra.id
            },
            {
                city: "Burlington",
                description: "Carrot beer!",
                userId: carrots.id,
                itineraryId: vermont.id
            },
        ]
        for (const singleDestinationData of destinationData) {
            const currentDestination = await Destination.query().findOne(singleDestinationData)
            if (!currentDestination) {
                await Destination.query().insert(singleDestinationData)
            }
        }
    }
}

export default DestinationSeeder