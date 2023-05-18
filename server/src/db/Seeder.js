/* eslint-disable no-console */
import { connection } from "../boot.js"
import ItinerarySeeder from "./seeders/ItinerarySeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    console.log('seeding users...')
    await UserSeeder.seed()

    console.log("seeding itineraries!")
    await ItinerarySeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder