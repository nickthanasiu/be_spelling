import june11 from '../data/06-11-22.json';
import june12 from '../data/06-12-22.json';
import june20 from '../data/06-20-22.json';
import june24 from '../data/06-24-22.json';
import june25 from '../data/06-25-22.json';
import june27 from '../data/06-27-22.json';
import july4 from '../data/07-04-22.json';
import july6 from '../data/07-06-22.json';
import july7 from '../data/07-07-22.json';

// @TODO :: Refactor logic here. Should it all be in this file?
const getDefaultPuzzle = () => {

    // @TODO :: Should come from DB, not hard-coded json
    const puzzleData = june11;

    const puzzle = buildPuzzle(puzzleData);

    return puzzle;
};

const getRandomPuzzle = () => {
    const puzzleChoices = [
        june11,
        june12,
        june20,
        june24,
        june25,
        june27,
        july4,
        july6,
        july7
    ];

    const random = Math.floor(Math.random() * puzzleChoices.length);
    const puzzleData = puzzleChoices[random];
    const puzzle = buildPuzzle(puzzleData);

    return puzzle;
};

export default { getDefaultPuzzle, getRandomPuzzle };

function buildPuzzle(puzzleData) {
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
}