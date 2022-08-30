import express from "express";
import path from "path";
import cors from "cors";
import getRoutes from "../routes";
import { Express } from "express";

export default async (app: Express) => {
    app.use(cors());
    app.use(express.json());

    // Serve the React static files after build
    app.use(express.static(
        path.resolve(__dirname, "..", "public")
    ));

    app.use('/api', getRoutes());

    // All other unmatched requests will return the React app
    app.get("/", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "..", "public", "index.html")
        );
    });
};