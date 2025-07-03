#!/bin/bash

echo "🎮 教育遊戲部署腳本"
echo "=================="

# 檢查是否安裝了 serve
if ! command -v serve &> /dev/null; then
    echo "正在安裝 serve..."
    npm install -g serve
fi

# 構建項目
echo "正在構建項目..."
npm run build

# 檢查構建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 構建成功！"
    echo "🚀 啟動本地伺服器..."
    echo "📱 遊戲將在 http://localhost:3000 開啟"
    echo "按 Ctrl+C 停止伺服器"
    
    # 啟動伺服器
    serve -s build -l 3000
else
    echo "❌ 構建失敗，請檢查錯誤訊息"
    exit 1
fi
