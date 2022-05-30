const getDefaultPuzzle = () => {
    // @TODO :: Should come from DB, not hard-coded
    const defaultPuzzle = {
        centerLetter: "o",
        letters: [
            "g",
            "h",
            "i",
            "n",
            "p",
            "w"
        ],
        pangrams: [
            "whooping",
            "whopping"
        ],
        words: [
            "going",
            "gong",
            "goon",
            "goop",
            "gown",
            "gowning",
            "hippo",
            "hogging",
            "honing",
            "hoop",
            "hooping",
            "hoping",
            "hopping",
            "noggin",
            "nohow",
            "noon",
            "ongoing",
            "onion",
            "opining",
            "opinion",
            "owing",
            "owning",
            "phoning",
            "phono",
            "pinion",
            "pinioning",
            "pogo",
            "pogoing",
            "pong",
            "pooh",
            "poop",
            "pooping",
            "popping",
            "powwow",
            "whoop",
            "whop",
            "winnow",
            "winnowing",
            "wino",
            "woohoo",
            "wooing",
            "wowing"
        ]
    };

    return defaultPuzzle;
};

export default { getDefaultPuzzle };