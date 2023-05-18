const Model = require("./Model.js")

class Itinerary extends Model {
    static get tableName() {
        return "itineraries"
    }

    static get relationMappings() {
        const { User, Destination } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "itineraries.userId",
                    to: "users.id"
                }
            },
            destinations: {
                relation: Model.HasManyRelation,
                modelClass: Destination,
                join: {
                    from: "itineraries.id",
                    to: "destinations.itineraryId"
                }
            }
        }
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