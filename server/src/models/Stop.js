const Model = require("./Model.js")

class Stop extends Model {
    static get tableName() {
        return "stops"
    }

    static get relationMappings() {
        const { Destination } = require("./index.js")

        return {
            destination: {
                relation: Model.BelongsToOneRelation,
                modelClass: Destination,
                join: {
                    from: "stops.destinationId",
                    to: "destinations.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["place"],
            properties: {
                place: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}

module.exports = Stop