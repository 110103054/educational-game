import React, { useRef } from 'react';
import { Option } from '../types';
import { parseCSV } from '../utils/csvParser';

interface CSVImporterProps {
  onImport: (options: Option[]) => void;
}

const CSVImporter: React.FC<CSVImporterProps> = ({ onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      try {
        const options = parseCSV(csvText);
        onImport(options);
        alert(`成功匯入 ${options.length} 個選項！`);
      } catch (error) {
        alert('CSV 格式錯誤，請檢查檔案格式');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        try {
          const options = parseCSV(csvText);
          onImport(options);
          alert(`成功匯入 ${options.length} 個選項！`);
        } catch (error) {
          alert('CSV 格式錯誤，請檢查檔案格式');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="csv-importer">
      <h3>匯入選項和意思的對應關係</h3>
      <div 
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drop-zone-content">
          <p>📁 點擊或拖拽 CSV 檔案到此處</p>
          <p className="format-hint">格式：選項,意思</p>
          <p className="example">範例：蘋果,apple</p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CSVImporter; 