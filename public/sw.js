// 最小 service worker：Chrome 要求至少有 fetch handler 才會觸發 beforeinstallprompt
// 不做 cache，每次都從 network 取（避免 PWA stale 內容問題）
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  // pass-through，不攔截不 cache
});
