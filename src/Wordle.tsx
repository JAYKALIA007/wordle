import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ERROR_MESSAGE,
  NO_OF_COLS,
  NO_OF_ROWS,
  WINNING_MESSAGE,
  WORD_LENGTH,
  findMatchingIndicesAndUpdateMap,
  getBgColorClassName,
  getWordOfTheDay,
  initializeMap,
} from "./helper";
import { easeOut, motion } from "framer-motion";
import { Input } from "./Input";
import { ConfettiAnimation } from "./Confetti";

const WORD_OF_THE_DAY = getWordOfTheDay();

export const Wordle: React.FC = () => {
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean>(false);

  const initialMapValue = initializeMap(WORD_OF_THE_DAY);
  let myMap = new Map(initialMapValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const isWinningGuess = useMemo(
    () => guessedWords.includes(WORD_OF_THE_DAY),
    [guessedWords]
  );

  useEffect(() => {
    if (guessedWords.includes(WORD_OF_THE_DAY)) {
      setFeedbackMessage(WINNING_MESSAGE);
      setIsCorrectGuess(true);
    } else if (currentGuess === "") {
      setFeedbackMessage("");
    }
  }, [currentGuess, guessedWords]);

  const handleGuessSubmit = () => {
    if (currentGuess.length !== 5 || guessedWords.includes(currentGuess)) {
      setFeedbackMessage(ERROR_MESSAGE);
      inputRef.current?.focus();
      return;
    }

    const updatedGuessedWords = [...guessedWords, currentGuess];
    setGuessedWords(updatedGuessedWords);
    if (updatedGuessedWords.length === 6 && currentGuess !== WORD_OF_THE_DAY) {
      setFeedbackMessage(
        `Sorry, you've run out of attempts. The correct word was ${WORD_OF_THE_DAY}.`
      );
      return;
    }

    setCurrentGuess("");
    setFeedbackMessage("");
    inputRef.current?.focus();
  };

  console.log({ WORD_OF_THE_DAY });

  const rowsArray = Array(NO_OF_ROWS).fill("");
  const colsArray = Array(NO_OF_COLS).fill("");

  return (
    <div className="min-h-screen overflow-scroll flex flex-col gap-10 justify-center items-center">
      <div>
        {rowsArray.map((_, index1) => {
          const word = guessedWords.length > index1 ? guessedWords[index1] : "";

          myMap = new Map(initialMapValue);

          const matchingIndices =
            word.length > 0
              ? findMatchingIndicesAndUpdateMap(word, myMap, WORD_OF_THE_DAY)
              : [];

          return (
            <motion.div
              variants={{
                start: { transition: { staggerChildren: 0.1 } },
                end: { transition: { staggerChildren: 0.1 } },
              }}
              transition={{
                duration: 0.2,
                yoyo: Infinity,
                ease: easeOut,
              }}
              initial="start"
              animate={
                isWinningGuess && index1 === guessedWords.length - 1
                  ? "end"
                  : {}
              }
              key={index1}
              className="flex"
            >
              {colsArray.map((_, index2) => {
                const character = word.length > 0 ? word.charAt(index2) : "";

                const bgColor = getBgColorClassName(
                  index2,
                  matchingIndices,
                  myMap,
                  character
                );

                return (
                  <motion.div
                    variants={{
                      end: {
                        opacity: 1,
                        y: [0, -50, 0],
                      },
                    }}
                    key={index2}
                    className={`border w-10 h-10 md:w-20 md:h-20 flex justify-center items-center m-2 text-white text-xl font-semibold ${
                      character ? bgColor : ""
                    }`}
                  >
                    {character}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 mx-2 text-sm items-center">
        <div>
          <Input
            inputRef={inputRef}
            guess={currentGuess}
            onChange={(e) =>
              setCurrentGuess(e.target.value.toLocaleUpperCase())
            }
            disabled={isWinningGuess}
          />

          <button
            className=" text-white border border-gray-300 px-2 py-0.5 rounded cursor-pointer disabled:cursor-not-allowed"
            disabled={
              currentGuess.length !== WORD_LENGTH || Boolean(feedbackMessage)
            }
            onClick={handleGuessSubmit}
          >
            Submit
          </button>
        </div>

        {feedbackMessage && (
          <div
            className={`m-2 text-lg md:text-xl ${
              !isWinningGuess ? "text-red-800" : "text-white"
            }`}
          >
            {feedbackMessage}
          </div>
        )}
      </div>
      {isCorrectGuess && <ConfettiAnimation />}
    </div>
  );
};
