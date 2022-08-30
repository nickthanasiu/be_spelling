import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import { Express } from "express";

const init = async (expressApp: Express) => {
    await mongooseLoader();
    await expressLoader(expressApp);

    // tslint:disable-next-line:no-console
    console.log('Express initialized');
};

export default { init };