import React, { useEffect, useMemo, useState } from "react";

type WordlePropsType = {};

const NO_OF_ROWS = 6;
const NO_OF_COLS = 5;
const CORRECT_WORD = "PAINT";
export const Wordle: React.FC<WordlePropsType> = () => {
  const [guesses, setGuesses] = useState<Array<string>>([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const isWinningCombination = useMemo(() => guess === CORRECT_WORD, [guess]);

  useEffect(() => {
    if (guesses.includes(CORRECT_WORD)) {
      setMessage("Woohooo... You have guessed the correct word");
    }
  }, [guesses]);

  return (
    <div>
      {Array(NO_OF_ROWS)
        .fill("")
        .map((_, index1) => {
          return (
            <div className="flex" key={index1}>
              {Array(NO_OF_COLS)
                .fill("")
                .map((_, index2) => {
                  const word = guesses.length > index1 ? guesses[index1] : "";
                  const character = word.length > 0 ? word.charAt(index2) : "";
                  const isPerfectMatch =
                    CORRECT_WORD.charAt(index2) === character;
                  return (
                    <div
                      key={index2}
                      className={`border w-20 h-20 flex justify-center items-center m-2 ${
                        isPerfectMatch && "bg-green-600"
                      }`}
                    >
                      {character}
                    </div>
                  );
                })}
            </div>
          );
        })}
      <div className="flex gap-4 mt-10 mx-2 text-sm">
        <input
          type="text"
          minLength={5}
          maxLength={5}
          value={guess}
          onChange={(e) => setGuess(e.target.value.toLocaleUpperCase())}
          className="border border-gray-300 w-40 text-sm px-2 rounded"
          //   disabled={guesses.includes(CORRECT_WORD)}
        />
        <button
          className="border border-gray-300 px-2 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
          //   disabled={guess.length !== 5 || Boolean(message)}
          disabled={guess.length !== 5}
          onClick={() => {
            if (guesses && !guesses.includes(guess)) {
              setGuesses((prev) => [...prev, guess]);
              setGuess("");
              setMessage("");
            } else {
              setMessage("No duplicates allowed");
            }
          }}
        >
          Submit
        </button>
      </div>
      {message && <div className="m-2">{message}</div>}
    </div>
  );
};
