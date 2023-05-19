/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("destinations", (table) => {
        table.bigIncrements("id")
        table.string("city").notNullable()
        table.string("description")
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("itineraryId").notNullable().unsigned().index().references("itineraries.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("destinations")
}
