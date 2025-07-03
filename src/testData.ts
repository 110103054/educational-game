import { Option, Question } from './types';

export const sampleOptions: Option[] = [
  {
    id: '1',
    text: '蘋果',
    meaning: 'apple',
    color: '#FF6B6B'
  },
  {
    id: '2',
    text: '香蕉',
    meaning: 'banana',
    color: '#4ECDC4'
  },
  {
    id: '3',
    text: '橘子',
    meaning: 'orange',
    color: '#45B7D1'
  },
  {
    id: '4',
    text: '貓',
    meaning: 'cat',
    color: '#96CEB4'
  },
  {
    id: '5',
    text: '狗',
    meaning: 'dog',
    color: '#FFEAA7'
  },
  {
    id: '6',
    text: '鳥',
    meaning: 'bird',
    color: '#DDA0DD'
  },
  {
    id: '7',
    text: '書',
    meaning: 'book',
    color: '#98D8C8'
  },
  {
    id: '8',
    text: '筆',
    meaning: 'pen',
    color: '#F7DC6F'
  }
];

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    description: '選擇所有水果',
    correctOptions: ['1', '2', '3'] // 蘋果、香蕉、橘子
  },
  {
    id: 'q2',
    description: '選擇所有動物',
    correctOptions: ['4', '5', '6'] // 貓、狗、鳥
  },
  {
    id: 'q3',
    description: '選擇所有文具',
    correctOptions: ['7', '8'] // 書、筆
  }
]; 