import React from 'react';
import { TextAnimate } from "./text-animate"; // Adjust the import path as needed

const SingleTextAnimation = () => {
  return (
    <div className="flex">
      <TextAnimate
        animation="blurInUp"
        by="text"
        once={true}
      >
        increase Customer Retention
      </TextAnimate>
    </div>
  );
};

export default SingleTextAnimation;