import React from 'react';
import { Option } from '../types';

interface ColorBlockProps {
  option: Option;
  isSelected?: boolean;
  isMatched?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({
  option,
  isSelected = false,
  isMatched = false,
  onClick,
  draggable = false,
  onDragStart
}) => {
  return (
    <div
      className={`color-block ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
      style={{
        backgroundColor: option.color,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <span className="block-text">{option.text}</span>
    </div>
  );
};

export default ColorBlock; 