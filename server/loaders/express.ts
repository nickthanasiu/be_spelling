import express from "express";
import cors from "cors";
import getRoutes from "../routes";
import { Express } from "express";
import { REACT_STATIC_FILES_PATH, REACT_APP_PATH } from "../configs/staticFiles";

export default async (app: Express) => {
    app.use(cors());
    app.use(express.json());

    // Serve the React static files after build
    app.use(express.static(REACT_STATIC_FILES_PATH));

    app.use('/api', getRoutes());

    // All other unmatched requests will return the React app
    app.get("/", (req, res) => {
        res.sendFile(REACT_APP_PATH);
    });
};