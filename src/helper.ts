export const NO_OF_ROWS = 6;
export const NO_OF_COLS = 5;

const WORDS = ['APPLE', 'TOWER', 'PAINT', 'AUNTY', 'RADIO']

export const getWordOfTheDay = () => {
    const randomNumberBetweenOneToFive = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomNumberBetweenOneToFive]
}