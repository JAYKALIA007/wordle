import React from "react";
import confettiAnimation from "./confetti.json";
import Lottie from "lottie-react";
export const ConfettiAnimation: React.FC = () => {
  return (
    <div className="absolute bottom-0">
      <Lottie animationData={confettiAnimation} loop={false} />
    </div>
  );
};
