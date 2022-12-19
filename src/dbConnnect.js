const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@contentmanagementapplic.se6gy6i.mongodb.net/?retryWrites=true&w=majority`)
        console.log("Database connected".magenta)
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect;