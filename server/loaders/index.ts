import expressLoader from "./express";
import { Express } from "express";

const init = async (expressApp: Express) => {
    await expressLoader(expressApp);
    console.log('Express initialized');
};

export default { init };