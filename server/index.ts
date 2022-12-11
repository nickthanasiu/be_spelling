import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import getRoutes from "./routes";

dotenv.config();

// DB config
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;

async function connectToDB() {
    try {
        await mongoose.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority`);

        // tslint:disable-next-line:no-console
        console.log('Database Connected');
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log('Error connecting to database: ', error);
    }
}

connectToDB();

// Server config
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Serve the React static files after build
app.use(express.static(
    path.resolve(__dirname, "public")
));

// Routes
app.use('/api', getRoutes());

app.get("/*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "public", "index.html")
    );
});

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on ${PORT}`);
});
