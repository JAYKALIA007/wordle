export const NO_OF_ROWS = 6;
export const NO_OF_COLS = 5;
export const WORD_LENGTH = 5;
export const WINNING_MESSAGE = "Woohooo... You have guessed the correct word !";
export const ERROR_MESSAGE = "No duplicates allowed"

const WORDS = ['APPLE', 'TOWER', 'PAINT', 'AUNTY', 'RADIO', 'PESKY']

export const getWordOfTheDay = () : string => {
    const randomNumberBetweenOneToFive = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomNumberBetweenOneToFive]
}

export const initializeMap = (word: string) : Map<string, number> => {
    const map = new Map();
    for (let i = 0; i < WORD_LENGTH; i++) {
      const curr = word.charAt(i);
      if (map.has(curr)) {
        map.set(curr, map.get(curr) + 1);
      } else {
        map.set(curr, 1);
      }
    }
    return map;
};


export const findMatchingIndicesAndUpdateMap = (
    guess: string,
    map: any,
    word: string
  ) : number[] => {
    let indices = [];
    for (let i = 0; i < 5; i++) {
      const currChar = guess.charAt(i);
      if (currChar === word.charAt(i) && map.has(currChar)) {
        indices.push(i);
        map.set(currChar, map.get(currChar) - 1);
        if (map.get(currChar) === 0) {
          map.delete(currChar);
        }
      }
    }
    return indices;
  };

export const getBgColorClassName = (
    index: number,
    matchingIndices: number[],
    map: any,
    character: string
  ) :  string => {
    let bgColor = "";
    if (matchingIndices.length > 0 && matchingIndices.includes(index)) {
      bgColor = "bg-green-700";
    } else {
      if (map.has(character)) {
        bgColor = "bg-yellow-700";
        map.set(character, map.get(character) - 1);
        if (map.get(character) === 0) {
          map.delete(character);
        }
      } else {
        bgColor = "bg-gray-700";
      }
    }
    return bgColor;
  };