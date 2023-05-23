/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("itineraries", (table) => {
        table.string("departureDate")
        table.string("returnDate")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("itineraries", (table) => {
        table.dropColumn("departureDate")
        table.dropColumn("returnDate")
    })
}
