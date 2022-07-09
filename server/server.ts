import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import getRoutes from './routes';
import mongoose from "mongoose";

dotenv.config();

// DB setup
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.3l6s1.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('open', () => {
    console.log('Database Connected');
});

// Server setup
const reactStaticFilesPathDevelopment = path.resolve(__dirname, "..", "client", "public");
const reactStaticFilesPathProduction = path.resolve(__dirname, "public");

const REACT_STATIC_FILES_PATH = process.env.NODE_ENV === 'development' ? reactStaticFilesPathDevelopment : reactStaticFilesPathProduction;

const reactAppPathDevelopment = path.resolve(__dirname, "..", "client", "public", "index.html");
const reactAppPathProduction = path.resolve(__dirname, "public", "index.html");

const REACT_APP_PATH = process.env.NODE_ENV === 'development' ? reactAppPathDevelopment : reactAppPathProduction;

const app = express();

app.use(cors());
app.use(express.json());

// Serve the React static files after build
app.use(express.static(REACT_STATIC_FILES_PATH));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on ${PORT}`);
});

app.use('/api', getRoutes());

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
    res.sendFile(REACT_APP_PATH);
});