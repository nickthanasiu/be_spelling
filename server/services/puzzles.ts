import puzzleData from '../data/puzzles.json';

// @TODO :: Refactor logic here. Should it all be in this file?
const getDefaultPuzzle = () => {
    // @TODO :: Should come from DB, not hard-coded json
    const { pangrams, words } = puzzleData;

    // Calculate wordCount and add to puzzleData object
    puzzleData.wordCount = pangrams.length + words.length;

    // Pangram is worth its length plus 7
    const calculatePangramScore = (pangram: string): number =>
        pangram.length + 7;

    // Four letter words are worth one point, while larger words are worth their length
    const calculateWordScore = (word: string): number =>
        word.length > 4 ? word.length : 1;

    // Calculate maxScore and add to puzzleData object
    let maxScore = 0;

    words.forEach(word => maxScore += calculateWordScore(word));
    pangrams.forEach(pangram => maxScore += calculatePangramScore(pangram));

    puzzleData.maxScore = maxScore;

    const percentToScore = (percentage: number) =>
        Math.floor(maxScore * (percentage / 100));

    // Generate rankings
    const rankings = [
        { name: 'Beginner', threshold: 0 },
        { name: 'Good Start', threshold: percentToScore(2) },
        { name: 'Moving Up', threshold: percentToScore(5) },
        { name: 'Good', threshold: percentToScore(8) },
        { name: 'Solid', threshold: percentToScore(15) },
        { name: 'Nice', threshold: percentToScore(25) },
        { name: 'Great', threshold: percentToScore(40) },
        { name: 'Amazing', threshold: percentToScore(50) },
        { name: 'Genius', threshold: percentToScore(70) },
        { name: 'Queen Bee', threshold: maxScore },
    ];

    puzzleData.rankings = rankings;

    return puzzleData;
};

export default { getDefaultPuzzle };