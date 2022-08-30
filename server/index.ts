import dotenv from "dotenv";
import express from "express";
import loaders from "./loaders";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    const app = express();

    await loaders.init(app);

    app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server listening on ${PORT}`);
    });
}

startServer();