import React from "react";
import { ALPHABET_REGEX, WORD_LENGTH } from "./helper";

type InputPropsType = {
  inputRef: React.RefObject<HTMLInputElement>;
  guess: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export const Input: React.FC<InputPropsType> = ({
  inputRef,
  guess,
  onChange,
  disabled,
}) => {
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    if (ALPHABET_REGEX.test(inputValue) || inputValue === "") {
      onChange(event);
    }
  }

  return (
    <input
      autoFocus
      ref={inputRef}
      type="text"
      minLength={WORD_LENGTH}
      maxLength={WORD_LENGTH}
      value={guess}
      className="border border-gray-300 w-40 text-sm px-2 rounded mx-4 disabled:cursor-not-allowed"
      disabled={disabled}
      onInput={handleInputChange}
    />
  );
};
