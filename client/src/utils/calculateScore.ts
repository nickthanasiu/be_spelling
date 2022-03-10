export function calculateScore(wordLength: number, isPangram: boolean = false) {
    const score = isPangram ? wordLength + 7
        : wordLength > 4 ? wordLength
        : 1;

    return score;
}
