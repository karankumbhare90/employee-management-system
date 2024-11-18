const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const connections = mongoose.connection;

        if (connections.readyState === 1) {
            console.log(`Database Connected`);
        }
        else {
            console.log(`Error while connecting !!`)
        }
    } catch (error) {
        console.log(`Something went wrong`);
    }
}


module.exports = connectDB;