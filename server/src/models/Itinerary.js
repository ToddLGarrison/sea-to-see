const Model = require("./Model.js")

class Itinerary extends Model {
    static get tableName() {
        return "itineraries"
    }

    static get jsonSchema() {
        return{
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}

module.exports = Itinerary