import { atom } from "recoil";

// @TODO :: This should eventually come from api call
const initialState = [
    "g",
    "h",
    "i",
    "n",
    "p",
    "w"
];

export const lettersState = atom({
    key: 'lettersState',
    default: initialState as string[]
});