import dotenv from "dotenv";
import path from "path";

dotenv.config();

const production = process.env.NODE_ENV !== 'development';

let REACT_STATIC_FILES_PATH: string;
let REACT_APP_PATH: string;

if (production) {
    REACT_STATIC_FILES_PATH = path.resolve(__dirname, "public");
    REACT_APP_PATH = path.resolve(__dirname, "public", "index.html");
} else {
    REACT_STATIC_FILES_PATH = path.resolve(__dirname, "..", "client", "public");
    REACT_APP_PATH = path.resolve(__dirname, "..", "client", "public", "index.html");
}

export { REACT_STATIC_FILES_PATH, REACT_APP_PATH };