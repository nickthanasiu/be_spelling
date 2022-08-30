import expressLoader from "./express";
import { Express } from "express";

const init = async (expressApp: Express) => {
    await expressLoader(expressApp);

    // tslint:disable-next-line:no-console
    console.log('Express initialized');
};

export default { init };