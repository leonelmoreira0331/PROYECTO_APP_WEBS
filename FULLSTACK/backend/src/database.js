import mongoose from 'mongoose';

async function connection() {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_LOCAL);
        console.log(`Connection database is connected on ${connection.host} - ${connection.port}`);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    } catch (error) {
        console.log(error);
    }
}
export default connection;