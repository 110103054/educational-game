import React, { useState } from 'react';
import { Option, Question } from '../types';
import ColorBlock from './ColorBlock';

interface PlacementGameProps {
  options: Option[];
  questions: Question[];
  onComplete: (score: number) => void;
}

const PlacementGame: React.FC<PlacementGameProps> = ({ options, questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [placedOptions, setPlacedOptions] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handlePlaceOptions = () => {
    const isCorrect = selectedOptions.every(optionId => 
      currentQuestion.correctOptions.includes(optionId)
    ) && selectedOptions.length === currentQuestion.correctOptions.length;

    if (isCorrect) {
      setScore(score + 20);
      setPlacedOptions([...placedOptions, ...selectedOptions]);
    } else {
      setScore(Math.max(0, score - 10));
    }

    setSelectedOptions([]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    } else {
      onComplete(score);
    }
  };

  const handleAddQuestion = () => {
    const description = prompt('請輸入題目描述：');
    if (description) {
      const newQuestion: Question = {
        id: `question_${Date.now()}`,
        description,
        correctOptions: []
      };
      // 這裡可以添加新題目到題目列表
      alert('新題目已添加！');
    }
  };

  return (
    <div className="placement-game">
      <div className="game-header">
        <h3>放置遊戲</h3>
        <p>根據題目描述選擇正確的選項</p>
        <div className="score">分數: {score}</div>
        <div className="progress">
          題目 {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="question-area">
        <div className="question-description">
          <h4>題目描述：</h4>
          <p>{currentQuestion?.description}</p>
        </div>

        <div className="options-selection">
          <h4>選擇正確的選項：</h4>
          <div className="options-grid">
            {options.map(option => (
              <ColorBlock
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onClick={() => handleOptionSelect(option.id)}
              />
            ))}
          </div>
        </div>

        <div className="game-controls">
          <button 
            className="place-button"
            onClick={handlePlaceOptions}
            disabled={selectedOptions.length === 0}
          >
            放置選項
          </button>
          
          <button 
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex >= questions.length - 1}
          >
            下一題
          </button>
        </div>
      </div>

      <div className="placed-options">
        <h4>已放置的選項：</h4>
        <div className="placed-grid">
          {placedOptions.map(optionId => {
            const option = options.find(opt => opt.id === optionId);
            return option ? (
              <ColorBlock
                key={option.id}
                option={option}
                isMatched={true}
              />
            ) : null;
          })}
        </div>
      </div>

      <div className="game-controls-bottom">
        <button className="add-question-button" onClick={handleAddQuestion}>
          添加新題目
        </button>
      </div>

      <div className="game-instructions">
        <p>根據題目描述選擇正確的選項</p>
        <p>正確選擇 +20 分，錯誤選擇 -10 分</p>
      </div>
    </div>
  );
};

export default PlacementGame; 