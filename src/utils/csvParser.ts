import { Option } from '../types';

export const parseCSV = (csvText: string): Option[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const options: Option[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length >= 2) {
      const option: Option = {
        id: `option_${i}`,
        text: values[0],
        meaning: values[1],
        color: getRandomColor()
      };
      options.push(option);
    }
  }
  
  return options;
};

const getRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const exportToCSV = (options: Option[]): string => {
  const headers = ['選項', '意思'];
  const rows = options.map(option => [option.text, option.meaning]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
    
  return csvContent;
}; 