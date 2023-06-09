const Model = require("./Model.js")

class Destination extends Model {
    static get tableName() {
        return "destinations"
    }

    static get relationMappings(){
        const { Itinerary } = require("./index.js")

        return {
            itinerary: {
                relation: Model.BelongsToOneRelation,
                modelClass: Itinerary,
                join: {
                    from: "destinations.itineraryId",
                    to: "itineraries.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["city"],
            properties: {
                city: { type: "string" },
                description: { type: "string"}
            }
        }
    }
}

module.exports = Destination