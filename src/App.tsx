import React, { useState } from 'react';
import './App.css';
import { Option, Question, GameMode } from './types';
import CSVImporter from './components/CSVImporter';
import GameSelector from './components/GameSelector';
import MatchingGame from './components/MatchingGame';
import PlacementGame from './components/PlacementGame';
import { sampleOptions, sampleQuestions } from './testData';

function App() {
  const [options, setOptions] = useState<Option[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const handleImportOptions = (importedOptions: Option[]) => {
    setOptions(importedOptions);
    // 自動生成一些示例題目
    const generatedQuestions: Question[] = [
      {
        id: 'q1',
        description: '選擇所有水果',
        correctOptions: importedOptions
          .filter(opt => ['蘋果', '香蕉', '橘子'].includes(opt.text))
          .map(opt => opt.id)
      },
      {
        id: 'q2',
        description: '選擇所有動物',
        correctOptions: importedOptions
          .filter(opt => ['貓', '狗', '鳥'].includes(opt.text))
          .map(opt => opt.id)
      }
    ];
    setQuestions(generatedQuestions);
  };

  const handleLoadSampleData = () => {
    setOptions(sampleOptions);
    setQuestions(sampleQuestions);
  };

  const handleSelectMode = (mode: GameMode) => {
    setCurrentMode(mode);
    setGameStarted(true);
    setFinalScore(null);
  };

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
    setGameStarted(false);
  };

  const handleBackToMenu = () => {
    setCurrentMode(null);
    setGameStarted(false);
    setFinalScore(null);
  };

  const handleAddQuestion = () => {
    const description = prompt('請輸入題目描述：');
    if (description) {
      const newQuestion: Question = {
        id: `question_${Date.now()}`,
        description,
        correctOptions: []
      };
      setQuestions([...questions, newQuestion]);
      alert('新題目已添加！');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 教育遊戲</h1>
        <p>學習選項與意思的對應關係</p>
      </header>

      <main className="App-main">
        {!options.length ? (
          <div className="setup-section">
            <h2>開始遊戲</h2>
            <p>請先匯入選項和意思的對應關係</p>
            <CSVImporter onImport={handleImportOptions} />
            <div className="sample-data-section">
              <h3>或使用示例數據快速開始</h3>
              <button className="sample-data-button" onClick={handleLoadSampleData}>
                載入示例數據
              </button>
            </div>
          </div>
        ) : !gameStarted ? (
          <div className="game-section">
            {finalScore !== null && (
              <div className="game-result">
                <h2>遊戲結束！</h2>
                <p>最終分數: {finalScore}</p>
                <button onClick={handleBackToMenu}>返回主選單</button>
              </div>
            )}
            
            <div className="options-info">
              <h3>已匯入的選項 ({options.length} 個)</h3>
              <div className="options-preview">
                {options.slice(0, 5).map(option => (
                  <span
                    key={option.id}
                    className="option-preview"
                    style={{ backgroundColor: option.color }}
                  >
                    {option.text}
                  </span>
                ))}
                {options.length > 5 && <span>...</span>}
              </div>
            </div>

            <GameSelector onSelectMode={handleSelectMode} />
            
            <div className="question-management">
              <h3>題目管理</h3>
              <button onClick={handleAddQuestion}>添加新題目</button>
              {questions.length > 0 && (
                <div className="questions-list">
                  <h4>現有題目 ({questions.length} 個)</h4>
                  {questions.map(question => (
                    <div key={question.id} className="question-item">
                      <p>{question.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="game-play">
            {currentMode?.type === 'matching' && (
              <MatchingGame
                options={options}
                onComplete={handleGameComplete}
              />
            )}
            {currentMode?.type === 'placement' && (
              <PlacementGame
                options={options}
                questions={questions}
                onComplete={handleGameComplete}
              />
            )}
            <button className="back-button" onClick={handleBackToMenu}>
              返回主選單
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
