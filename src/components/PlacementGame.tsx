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
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleCheckAnswer = () => {
    const correct = selectedOptions.every(optionId => 
      currentQuestion.correctOptions.includes(optionId)
    ) && selectedOptions.length === currentQuestion.correctOptions.length;

    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(score + 20);
    } else {
      setScore(Math.max(0, score - 10));
    }
  };

  const handleResetQuestion = () => {
    setSelectedOptions([]);
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setShowAnswer(false);
      setIsCorrect(null);
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
            className="check-button"
            onClick={handleCheckAnswer}
            disabled={selectedOptions.length === 0 || showAnswer}
          >
            檢查答案
          </button>
          
          {showAnswer && (
            <button 
              className="reset-button"
              onClick={handleResetQuestion}
            >
              重新練習
            </button>
          )}
          
          <button 
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex >= questions.length - 1}
          >
            下一題
          </button>
        </div>
      </div>

      {showAnswer && (
        <div className="answer-feedback">
          <h4>答案回饋：</h4>
          <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✅ 正確！' : '❌ 不正確，請重新練習'}
          </div>
          {!isCorrect && (
            <div className="correct-answer">
              <h5>正確答案：</h5>
              <div className="correct-options">
                {currentQuestion.correctOptions.map(optionId => {
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
          )}
        </div>
      )}

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