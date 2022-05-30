import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import getRoutes from './routes';

dotenv.config();

const reactStaticFilesPathDevelopment = path.resolve(__dirname, "..", "client", "public");
const reactStaticFilesPathProduction = path.resolve(__dirname, "public");

const REACT_STATIC_FILES_PATH = process.env.NODE_ENV === 'development' ? reactStaticFilesPathDevelopment : reactStaticFilesPathProduction;

const reactAppPathDevelopment = path.resolve(__dirname, "..", "client", "public", "index.html");
const reactAppPathProduction = path.resolve(__dirname, "public", "index.html");

const REACT_APP_PATH = process.env.NODE_ENV === 'development' ? reactAppPathDevelopment : reactAppPathProduction;

const PORT = process.env.PORT || 5000;

const app = express();

// CORS
app.use(cors());

app.use(express.json());

// Serve the React static files after build
app.use(express.static(REACT_STATIC_FILES_PATH));

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on ${PORT}`);
});

app.use('/api', getRoutes());

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
    res.sendFile(REACT_APP_PATH);
});