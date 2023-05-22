/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("itineraries", (table) => {
        table.date("departure_date")
        table.date("return_date")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("departure_date")
        table.dropColumn("return_date")
    })
}
