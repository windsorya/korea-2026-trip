# 首爾 × 全州 律師公會交流 web app

> 2026/5/9-13 行程資訊網站

## 部署到 Vercel（5 分鐘）

```bash
# 1. 安裝相依套件
npm install

# 2. 安裝 Vercel CLI（首次才需要）
npm install -g vercel

# 3. 登入 Vercel（首次才需要，會跳瀏覽器）
vercel login

# 4. 部署到正式環境
vercel --prod
```

第一次跑 `vercel --prod` 會問你幾個問題：
- `Set up and deploy?` → **Y**
- `Which scope?` → 選你的帳號
- `Link to existing project?` → **N**
- `Project name?` → 直接 Enter（用 korea-2026-trip）或自訂
- `Directory?` → 直接 Enter（用當前目錄）
- 其他都直接 Enter（用偵測值）

完成後會給你網址，例如：`https://korea-2026-trip.vercel.app`

## 本機預覽

```bash
npm run dev
```

開啟 http://localhost:5173

## 之後要更新內容

直接編輯 `src/App.jsx`，存檔後：
```bash
vercel --prod
```
就會自動部署最新版。
