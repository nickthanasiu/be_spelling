import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default async () => {

    // DB setup
    const mongodbUsername = process.env.MONGODB_USERNAME;
    const mongodbPassword = process.env.MONGODB_PASSWORD;

    try {
        await mongoose.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority`);

        // tslint:disable-next-line:no-console
        console.log('Database Connected');
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log('Error connecting to database: ', error);
    }
};