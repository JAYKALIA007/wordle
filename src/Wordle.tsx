import React, { useEffect, useMemo, useState } from "react";
import { NO_OF_COLS, NO_OF_ROWS, getWordOfTheDay } from "./helper";

type WordlePropsType = {};

const WORD_OF_THE_DAY = getWordOfTheDay();
export const Wordle: React.FC<WordlePropsType> = () => {
  const [guesses, setGuesses] = useState<Array<string>>([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const isWinningCombination = useMemo(
    () => guesses.includes(WORD_OF_THE_DAY),
    [guesses]
  );

  useEffect(() => {
    if (guesses.includes(WORD_OF_THE_DAY)) {
      setMessage("Woohooo... You have guessed the correct word !");
    } else if (guess === "") {
      setMessage("");
    }
  }, [guess, guesses]);

  return (
    <div className="min-h-screen overflow-scroll flex flex-col gap-10 justify-center items-center">
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
                    const character =
                      word.length > 0 ? word.charAt(index2) : "";
                    const isPerfectMatch =
                      WORD_OF_THE_DAY.charAt(index2) === character;
                    return (
                      <div
                        key={index2}
                        className={`border w-20 h-20 flex justify-center items-center m-2 text-white text-xl font-semibold ${
                          character
                            ? isPerfectMatch
                              ? "bg-green-700"
                              : "bg-gray-600"
                            : "bg-white"
                        }`}
                      >
                        {character}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div className="flex flex-col gap-4 mx-2 text-sm items-center">
        <div>
          <input
            type="text"
            minLength={5}
            maxLength={5}
            value={guess}
            onChange={(e) => setGuess(e.target.value.toLocaleUpperCase())}
            className="border border-gray-300 w-40 text-sm px-2 rounded mx-4 disabled:cursor-not-allowed"
            disabled={isWinningCombination}
          />
          <button
            className="border border-gray-300 px-2 py-0.5 rounded cursor-pointer disabled:cursor-not-allowed"
            disabled={guess.length !== 5 || Boolean(message)}
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
        {message && (
          <div
            className={`m-2 text-xl ${!isWinningCombination && "text-red-800"}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
