import React, { useState } from 'react';
import { Option } from '../types';
import ColorBlock from './ColorBlock';

interface MatchingGameProps {
  options: Option[];
  onComplete: (score: number) => void;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ options, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Array<{ optionId: string; meaning: string }>>([]);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option: Option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
    } else {
      // 檢查是否配對正確
      if (selectedOption.meaning === option.text || selectedOption.text === option.meaning) {
        const newPair = {
          optionId: selectedOption.id,
          meaning: selectedOption.meaning
        };
        setMatchedPairs([...matchedPairs, newPair]);
        setScore(score + 10);
        
        // 檢查遊戲是否完成
        if (matchedPairs.length + 1 === options.length) {
          onComplete(score + 10);
        }
      } else {
        setScore(Math.max(0, score - 5));
      }
      setSelectedOption(null);
    }
  };

  const isMatched = (option: Option) => {
    return matchedPairs.some(pair => pair.optionId === option.id);
  };

  const isSelected = (option: Option) => {
    return selectedOption?.id === option.id;
  };

  return (
    <div className="matching-game">
      <div className="game-header">
        <h3>串連遊戲</h3>
        <p>將選項與對應的意思配對</p>
        <div className="score">分數: {score}</div>
      </div>
      
      <div className="game-area">
        <div className="options-container">
          <h4>選項</h4>
          <div className="options-grid">
            {options.map(option => (
              <ColorBlock
                key={option.id}
                option={option}
                isSelected={isSelected(option)}
                isMatched={isMatched(option)}
                onClick={() => !isMatched(option) && handleOptionClick(option)}
              />
            ))}
          </div>
        </div>
        
        <div className="meanings-container">
          <h4>意思</h4>
          <div className="meanings-list">
            {options.map(option => (
              <div
                key={`meaning_${option.id}`}
                className={`meaning-item ${isMatched(option) ? 'matched' : ''}`}
                onClick={() => !isMatched(option) && handleOptionClick(option)}
              >
                {option.meaning}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="game-instructions">
        <p>點擊一個選項，然後點擊對應的意思來配對</p>
        <p>正確配對 +10 分，錯誤配對 -5 分</p>
      </div>
    </div>
  );
};

export default MatchingGame; 