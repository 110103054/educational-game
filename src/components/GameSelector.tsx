import React from 'react';
import { GameMode } from '../types';

interface GameSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelectMode }) => {
  const gameModes: GameMode[] = [
    {
      type: 'matching',
      name: '串連遊戲',
      description: '將選項與對應的意思配對'
    },
    {
      type: 'placement',
      name: '放置遊戲',
      description: '根據題目描述選擇正確的選項'
    }
  ];

  return (
    <div className="game-selector">
      <h2>選擇遊戲模式</h2>
      <div className="mode-grid">
        {gameModes.map(mode => (
          <div
            key={mode.type}
            className="mode-card"
            onClick={() => onSelectMode(mode)}
          >
            <h3>{mode.name}</h3>
            <p>{mode.description}</p>
            <div className="mode-icon">
              {mode.type === 'matching' ? '🔗' : '📝'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelector; 