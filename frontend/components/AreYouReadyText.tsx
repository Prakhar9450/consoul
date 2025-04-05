import { WordRotate } from "@/components/magicui/word-rotate";

export function WordRotateDemo() {
  // Array of text objects with line1 and line2 properties
  const texts = [
    "Turn online traffic into loyal customers?",
    "Get all your data silos in one place?",
    "Deliver hyper-personalized campaigns?",
    "Optimize workflows to drive business impact?",
    "Enhance real-time reporting and decision making?"
  ];

  // Extract just the first lines for WordRotate component
  const line = texts.map(text => text);
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <WordRotate
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#6438C3]"
          words={line}
         
        />
      </div>
    
    
    </div>
  );
}