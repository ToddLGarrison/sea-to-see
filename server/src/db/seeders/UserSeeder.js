import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                username: "Bilbo",
                email: "bilbo@baggins.com",
                password: "1ring",
            },
            {
                username: "Geralt",
                email: "g-money@email.com",
                password: "roach",
            },
            {
                username: "Carrots",
                email: "carrot@email.com",
                password: "12345",
            }
        ]
        for (const singleUserData of userData) {
            const currentUser = await User.query().findOne({ email: singleUserData.email })
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder