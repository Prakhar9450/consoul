import { useState, useEffect } from "react";
import { TextAnimate } from "../components/magicui/text-animate";
import { motion, AnimatePresence } from "framer-motion";

export function TextAnimateDemo() {
  const texts = [
    {
      line1: "Turn online traffic",
      line2: "into loyal customers"
    },
    {
      line1: "Get all your data",
      line2: "silos in one place?"
    },
    {
      line1: "Deliver hyper-personalized",
      line2: "campaigns?"
    },
    {
      line1: "Optimize workflows to",
      line2: "drive business impact?"
    },
    {
      line1: "Enhance real-time reporting",
      line2: "and decision making?"
    }
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setKey((prevKey) => prevKey + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col"
        >
          <TextAnimate
            animation="blurInUp"
            by="character"
            startOnView={false}
            once={false}
          >
            {texts[currentTextIndex].line1}
          </TextAnimate>
          
          {texts[currentTextIndex].line2 && (
            <TextAnimate
              animation="blurInUp"
              by="character"
              startOnView={false}
              once={false}
              delay={0.1} // Slight delay for the second line
            >
              {texts[currentTextIndex].line2}
            </TextAnimate>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}