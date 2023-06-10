/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("itineraries", (table) => {
        table.string("imageURL")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("itineraries", (table) => {
        table.dropColumn("imageURL")
    })
}
