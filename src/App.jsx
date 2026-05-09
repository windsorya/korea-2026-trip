import React, { useState, useEffect } from 'react';
import {
  Phone, MapPin, Plane, Hotel, Car, AlertCircle,
  Utensils, ShoppingBag, Camera, Coffee, Sparkles, Globe,
  Building2, Scale, Briefcase, Home, Star, Clock, Users, X, Volume2
} from 'lucide-react';

export default function SeoulJeonjuTrip() {
  const [activeDay, setActiveDay] = useState('overview');
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [phrasesOpen, setPhrasesOpen] = useState(false);
  const [daysToGo, setDaysToGo] = useState(null);
  const [overviewTab, setOverviewTab] = useState('essentials'); // essentials | guide | map | info
  const [mapOpen, setMapOpen] = useState(false); // lightbox 開關
  const [mapCity, setMapCity] = useState('seoul'); // seoul | jeonju
  const [expandedDetail, setExpandedDetail] = useState(null); // 5/12 拜會詳細流程展開: court | prosecutor | bar | null

  // PWA 安裝相關 state
  const [installPrompt, setInstallPrompt] = useState(null);   // Android Chrome 的 beforeinstallprompt event
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const departure = new Date('2026-05-09T10:40:00+08:00');
    const now = new Date();
    const diff = Math.ceil((departure - now) / (1000 * 60 * 60 * 24));
    setDaysToGo(diff);
  }, []);

  useEffect(() => {
    // 已安裝（standalone）偵測：Android / iOS 兩套 API 都看
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;
    setIsStandalone(standalone);

    // iOS Safari 偵測（iOS 不支援 beforeinstallprompt，必須走教學 modal）
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // 使用者關過 banner 就記住
    if (localStorage.getItem('installDismissed') === '1') setInstallDismissed(true);

    // Android Chrome / Edge：beforeinstallprompt 事件 — 存起來等使用者點按鈕觸發
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);

    // 安裝完成清掉 prompt
    const installed = () => { setInstallPrompt(null); setIsStandalone(true); };
    window.addEventListener('appinstalled', installed);

    // 註冊 service worker（Chrome 要求最少有 SW 才會發 beforeinstallprompt）
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') setInstallPrompt(null);
    } else {
      // iOS（或 Android 但 SW 還沒 ready）→ 顯示教學
      setInstallModalOpen(true);
    }
  };

  const dismissInstall = () => {
    setInstallDismissed(true);
    localStorage.setItem('installDismissed', '1');
  };

  const showInstallBanner = !isStandalone && !installDismissed && (installPrompt || isIOS);

  // ─────────────────────────────────────────
  // DATA
  // ─────────────────────────────────────────
  const days = [
    { id: '0509', label: '5/9', sub: '週六', title: '抵達日', icon: Plane, accent: 'red' },
    { id: '0510', label: '5/10', sub: '週日', title: '首爾自由行', icon: Sparkles, accent: 'gold' },
    { id: '0511', label: '5/11', sub: '週一', title: '南下全州', icon: Car, accent: 'red' },
    { id: '0512', label: '5/12', sub: '週二', title: '官方交流★', icon: Scale, accent: 'red', highlight: true },
    { id: '0513', label: '5/13', sub: '週三', title: '送別歸國', icon: Plane, accent: 'gold' },
  ];

  const contacts = {
    emergency: [
      { name: '駐韓國台北代表部 急難救助', sub: '24h・限車禍／搶劫／生命安危', tel: '+82-10-9080-2761', urgent: true },
      { name: '駐韓代表處 一般辦公室', sub: '週一-五 09:00-11:30、13:30-15:30', tel: '+82-2-6329-6000' },
    ],
    korean: [
      { name: '姜信武 律師', sub: '韓方主要對接窗口・全程陪同', tel: '', note: '透過旅行社聯繫' },
      { name: '朴鎰址 律師', sub: '韓方陪同・全羅北道律師協會國際交流委員會', tel: '', note: '透過旅行社聯繫' },
      { name: '金先生 接駁司機', sub: '黑色 8150 車牌・全車禁菸', tel: '+82-10-9736-0706' },
    ],
    taiwan: [
      { name: '享樂家旅遊', sub: '台中市西區精誠路 397 號 1 樓', tel: '04-2475-8286', email: 'enjoy60526052@gmail.com' },
    ],
  };

  const flights = {
    out: {
      date: '5/9 週六', code: 'LJ736', airline: '真航空 Jin Air',
      from: '台中清泉崗 RMQ T1', fromTime: '10:40',
      to: '仁川機場 ICN T2', toTime: '14:15',
      duration: '2h 35m', aircraft: '波音 737MAX 8',
    },
    back: {
      date: '5/13 週三', code: 'LJ737', airline: '真航空 Jin Air',
      from: '仁川機場 ICN T2', fromTime: '14:50',
      to: '台中清泉崗 RMQ T1', toTime: '16:30',
      duration: '2h 40m', aircraft: '波音 737-800',
    },
  };

  const hotels = [
    {
      name: 'Sejong Hotel Seoul Myeongdong',
      cn: '首爾明洞世宗飯店',
      stay: '5/9 - 5/11（2 晚）',
      address: '145 Toegye-ro, Jung District, Seoul',
      tel: '+82-2-773-6000',
      code: '26171059（MR. HO/CHUNGMIN 名下）',
      mapsQuery: '세종호텔 명동',
    },
    {
      name: 'Lahan Hotel Jeonju',
      cn: '全州拉漢飯店',
      stay: '5/11 - 5/13（2 晚）',
      address: '85 Girin-daero, Wansan-gu, Jeonju-si, Jeollabuk-do',
      tel: '+82-63-232-7000',
      code: '6 組房號 26008814 / 15 / 16 / 30 / 32 / 35',
      mapsQuery: '라한호텔 전주',
    },
  ];

  const shuttle = [
    { date: '5/9', time: '14:15', route: '仁川機場 → Sejong Hotel 明洞' },
    { date: '5/11', time: '09:00', route: 'Sejong Hotel → Lahan Hotel 全州' },
    { date: '5/12', time: '13:00', route: '接全員 → 全州地方法院／檢察院／律師協會會館' },
    { date: '5/13', time: '08:00', route: 'Lahan Hotel → 仁川機場' },
  ];

  const dayDetails = {
    '0509': {
      title: '抵達日 ・ 初見首爾與夜景',
      schedule: [
        { time: '08:50', title: '清泉崗國際機場集合', sub: '國際線建議 1.5-2h 前抵達・週末人潮+伴手禮分配', icon: Users, highlight: true },
        { time: '10:40', title: 'LJ736 起飛', sub: '台中清泉崗 T1 → 仁川 T2', icon: Plane },
        { time: '14:15', title: '抵達仁川機場', sub: '入境 → 接駁集合', icon: MapPin, mapsQuery: '인천국제공항 제2터미널' },
        { time: '14:15', title: '金先生接駁', sub: '黑色 8150 → Sejong Hotel', icon: Car },
        { time: '15:00', title: 'Sejong Hotel Check-in', sub: '訂房代號 26171059', icon: Hotel, mapsQuery: '세종호텔 명동' },
        { time: '18:00', title: '晚餐：黃金牧場 明洞店', sub: '12 人韓牛・熟成五花肉・專人代烤', icon: Utensils, highlight: true, mapsQuery: '황금목장 명동점' },
        { time: '20:15', title: '南山纜車 + N 首爾塔', sub: '夜景場次', icon: Sparkles, mapsQuery: 'N서울타워' },
      ],
    },
    '0510': {
      title: '首爾自由行 ・ 四種路線可選',
      note: '主推明洞線（米其林餃子＋NANTA＋Chimaek 慶典）。其他三條替代路線見下方。',
      schedule: [
        { time: '09:30', title: '北村韓屋村 晨間散策', sub: '傳統韓屋聚落・拍照點', icon: Camera, mapsQuery: '북촌한옥마을' },
        { time: '12:00', title: '明洞餃子 米其林午餐', sub: '必比登推薦', icon: Utensils, mapsQuery: '명동교자 본점' },
        { time: '14:00', title: '明洞自由採買 + 大聖堂', sub: 'Olive Young・繁華商圈', icon: ShoppingBag, mapsQuery: '명동성당' },
        { time: '17:00', title: 'NANTA 亂打秀', sub: '明洞 ANT 秀劇場・震撼全場', icon: Sparkles, highlight: true, mapsQuery: '난타전용극장 명동' },
        { time: '19:00', title: 'BBQ Chicken 明洞之星店', sub: '12 人 Chimaek 終極慶典', icon: Utensils, mapsQuery: 'BBQ치킨 명동스타점' },
      ],
      alternatives: [
        { name: '替代 A・廣藏市場線', detail: '美食馬拉松 → 棉被／醃海鮮 → 清溪川 → 東大門 DDP' },
        { name: '替代 B・南大門線', detail: '兒童服飾 → 野菜煎餅 → 刀削麵巷 → 土俗村參雞湯' },
        { name: '替代 C・仁寺洞線', detail: '人人廣場 Ssamziegil → 土俗村參雞湯 → 明洞大聖堂' },
      ],
    },
    '0511': {
      title: '南下全州 ・ 韓食之都',
      schedule: [
        { time: '07:00', title: '飯店附近早餐', sub: '出發前用餐', icon: Coffee, mapsQuery: '세종호텔 명동' },
        { time: '09:00', title: 'Sejong Hotel 集合・接駁出發', sub: '金先生 → 公路旅行', icon: Car },
        { time: '11:30', title: '抵達全羅北道', sub: '中途休息站必買核桃燒', icon: MapPin, mapsQuery: '전주' },
        { time: '13:00', title: 'Lahan Hotel 韓方迎接', sub: '姜信武律師、朴鎰址律師', icon: Hotel, highlight: true, mapsQuery: '라한호텔 전주' },
        { time: '13:30', title: '午餐', sub: '韓方安排', icon: Utensils },
        { time: '15:00', title: '全州韓屋村自由活動', sub: '韓服拍照・韓紙工藝・冰沙', icon: Camera, mapsQuery: '전주한옥마을' },
        { time: '18:00', title: '五花肉晚餐', sub: '全羅北道律師協會 國際交流委員會委員長作陪', icon: Utensils, highlight: true },
      ],
    },
    '0512': {
      title: '官方交流日 ・ 兩會國際交流',
      note: '本日為訪問重點。法院、檢察院為正式外交場合,請著正裝。詳細流程由韓方提供,點下方藍色卡片展開細節。',
      schedule: [
        { time: '07:00', title: '早餐', sub: '飯店或全州解酒豆芽湯飯店', icon: Coffee, mapsQuery: '라한호텔 전주' },
        { time: '11:00', title: '慶基殿 文化參觀', sub: '1410 年朝鮮太宗 11 年建・供奉太祖李成桂御真・中文導覽預訂中', icon: Building2, mapsQuery: '경기전' },
        { time: '12:00', title: '午餐', sub: '姜信武、朴鎰址作陪', icon: Utensils },
        { time: '14:00', title: '全州地方法院 拜會法院長', sub: '14:00 抵達 → 14:05 參觀審判設施 → 14:30 與法院長談話 → 14:40 歡送 ⚠️ 家屬在咨詢室等待', icon: Scale, highlight: true, formal: true, expandKey: 'court' },
        { time: '15:00', title: '全州地方檢察院 拜會檢察長', sub: '15:00 與檢察長談話(7樓中會議室,家屬一起) → 15:10 參觀檢察院 → 15:25 合影贈禮(3樓大會議室)', icon: Briefcase, highlight: true, formal: true, expandKey: 'prosecutor' },
        { time: '16:00', title: '全羅北道律師協會會館 交流會', sub: '開幕詞 → 出席介紹 → 情況匯報 → 互贈禮品 → 合影 → 閉幕', icon: Users, highlight: true, formal: true, expandKey: 'bar' },
        { time: '18:00', title: '晚餐', sub: '全羅北道律師協會會長作陪', icon: Utensils, highlight: true },
      ],
    },
    '0513': {
      title: '送別 ・ 歸國',
      schedule: [
        { time: '06:30', title: 'Lahan Hotel 送別', sub: '姜信武律師、朴鎰址律師', icon: Hotel, mapsQuery: '라한호텔 전주' },
        { time: '08:00', title: '接駁出發', sub: 'Lahan Hotel → 仁川機場', icon: Car },
        { time: '14:50', title: 'LJ737 起飛', sub: '仁川 T2 → 台中清泉崗 T1', icon: Plane },
        { time: '16:30', title: '抵達台灣', sub: '結束 5 天 4 夜行程', icon: Home },
      ],
    },
  };

  const mustEat = [
    { name: '富村生牛肉', place: '廣藏市場', tag: '米其林・生拌活章魚', query: '부촌육회 광장시장' },
    { name: '順熙家綠豆煎餅', place: '廣藏市場', tag: '廣藏市場靈魂', query: '순희네 빈대떡' },
    { name: '麻藥紫菜飯捲', place: '廣藏市場', tag: '沾芥末醬中毒', query: '마약김밥 광장시장' },
    { name: '土俗村參雞湯', place: '景福宮旁', tag: 'Ginseng Chicken', query: '토속촌 삼계탕' },
    { name: '明洞餃子', place: '明洞', tag: '米其林必比登', query: '명동교자 본점' },
    { name: 'BBQ Chicken 明洞之星', place: '明洞', tag: '炸雞啤酒慶典', query: 'BBQ치킨 명동스타점' },
    { name: '黃金牧場 明洞店', place: '明洞', tag: '熟成五花肉・韓牛', query: '황금목장 명동점' },
    { name: '北村六景', place: '北村韓屋村', tag: '餛飩麵', query: '북촌한옥마을' },
  ];

  const mustBuy = [
    { name: '人參、紅參', where: '南大門市場・廣藏市場・高麗參專賣店', query: '남대문시장 인삼' },
    { name: '海苔', where: '南大門市場・廣藏市場・伴手禮首選', query: '남대문시장' },
    { name: '化妝品', where: 'Olive Young 明洞店', query: '올리브영 명동' },
    { name: '傳統棉被', where: '廣藏市場・超細纖維・真空打包', query: '광장시장 이불' },
    { name: '醃漬海鮮', where: '廣藏市場・醃明太子、章魚', query: '광장시장' },
    { name: '凍乾草莓', where: '南大門市場乾貨區', query: '남대문시장' },
    { name: '韓文印章', where: '仁寺洞・個人化伴手禮', query: '인사동' },
  ];

  const mustSee = [
    { name: '景福宮 + 光化門', tag: '朝鮮王朝正宮', query: '경복궁' },
    { name: '昌德宮', tag: '世界遺產', query: '창덕궁' },
    { name: 'N 首爾塔 + 南山纜車', tag: '夜景必看', query: 'N서울타워' },
    { name: '明洞大聖堂', tag: 'Gothic Cathedral', query: '명동성당' },
    { name: '清溪川', tag: '城市散步', query: '청계천' },
    { name: '北村韓屋村', tag: '傳統韓屋', query: '북촌한옥마을' },
  ];

  const phrases = [
    {
      category: '問候 ・ 基本',
      icon: '☀️',
      items: [
        { zh: '你好', ko: '안녕하세요', pin: 'annyeong-haseyo' },
        { zh: '早安', ko: '좋은 아침입니다', pin: 'jo-eun a-chim-imnida' },
        { zh: '晚安（睡前）', ko: '안녕히 주무세요', pin: 'annyeong-hi ju-mu-seyo' },
        { zh: '再見（你走我留）', ko: '안녕히 가세요', pin: 'annyeong-hi ga-seyo' },
        { zh: '再見（你留我走）', ko: '안녕히 계세요', pin: 'annyeong-hi gye-seyo' },
        { zh: '謝謝', ko: '감사합니다', pin: 'gamsa-hamnida' },
        { zh: '不客氣', ko: '천만에요', pin: 'cheonman-eyo' },
        { zh: '對不起', ko: '죄송합니다', pin: 'joesong-hamnida' },
        { zh: '不好意思（叫人）', ko: '저기요', pin: 'jeo-gi-yo' },
        { zh: '是', ko: '네', pin: 'ne' },
        { zh: '不是', ko: '아니요', pin: 'a-ni-yo' },
        { zh: '不用了 / 沒關係', ko: '괜찮아요', pin: 'gwaenchan-ayo' },
      ],
    },
    {
      category: '社交 ・ 律師團必備',
      icon: '🤝',
      items: [
        { zh: '初次見面', ko: '처음 뵙겠습니다', pin: 'cheoeum bep-gesseum-nida' },
        { zh: '請多指教', ko: '잘 부탁드립니다', pin: 'jal bu-tak-deurim-nida' },
        { zh: '我是台灣律師', ko: '저는 대만 변호사입니다', pin: 'jeo-neun dae-man byeon-ho-sa-imnida' },
        { zh: '見到你很高興', ko: '만나서 반갑습니다', pin: 'manna-seo ban-gap-seum-nida' },
        { zh: '感謝您的款待', ko: '환대해 주셔서 감사합니다', pin: 'hwan-dae-hae ju-syeo-seo gamsa-hamnida' },
        { zh: '吃飽了嗎？', ko: '식사하셨어요?', pin: 'sik-sa-ha-syeo-sseo-yo' },
        { zh: '辛苦了', ko: '수고하셨습니다', pin: 'su-go-ha-syeoss-seum-nida' },
        { zh: '玩得很開心 / 今天玄了', ko: '재미있었어요', pin: 'jae-mi-i-sseo-sseo-yo' },
        { zh: '乾杯', ko: '건배', pin: 'geon-bae' },
        { zh: '為了 ⋯（正式敬酒）', ko: '위하여', pin: 'wi-ha-yeo' },
      ],
    },
    {
      category: '購物 ・ 自由行必備',
      icon: '🛍️',
      items: [
        { zh: '多少錢？', ko: '얼마예요?', pin: 'eolma-yeyo' },
        { zh: '太貴了', ko: '너무 비싸요', pin: 'neomu bi-ssa-yo' },
        { zh: '可以便宜一點嗎？', ko: '좀 깎아 주세요', pin: 'jom kkakka ju-seyo' },
        { zh: '可以試穿嗎？', ko: '입어봐도 돼요?', pin: 'i-beo-bwa-do dwae-yo' },
        { zh: '有別的尺寸嗎？', ko: '다른 사이즈 있어요?', pin: 'da-reun sa-i-jeu i-sseo-yo' },
        { zh: '有別的顏色嗎？', ko: '다른 색깔 있어요?', pin: 'da-reun saek-kkal i-sseo-yo' },
        { zh: '可以刷卡嗎？', ko: '카드로 결제 돼요?', pin: 'ka-deu-ro gyeol-je dwae-yo' },
        { zh: '請給我收據', ko: '영수증 주세요', pin: 'yeong-su-jeung ju-seyo' },
        { zh: '可以退稅嗎？', ko: '택스 환급 돼요?', pin: 'taek-seu hwan-geup dwae-yo' },
        { zh: '我看看就好', ko: '그냥 볼게요', pin: 'geu-nyang bol-ge-yo' },
        { zh: '請給我這個', ko: '이거 주세요', pin: 'i-geo ju-seyo' },
        { zh: '請幫我打包', ko: '포장해 주세요', pin: 'po-jang-hae ju-seyo' },
      ],
    },
  ];

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  const telLink = (num) => `tel:${num.replace(/[\s-]/g, '')}`;
  const mapsLink = (q) => `https://map.naver.com/p/search/${encodeURIComponent(q)}`;

  // 韓語發音：統一開 Google 翻譯播放（最穩、發音最準、所有裝置一致）
  const speakKorean = (text) => {
    if (!text) return;
    const url = `https://translate.google.com/?sl=ko&tl=zh-TW&text=${encodeURIComponent(text)}&op=translate`;
    window.open(url, '_blank');
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F0F8FF] text-stone-800" style={{
      fontFamily: '"Plus Jakarta Sans", "Noto Sans TC", sans-serif',
      backgroundImage: `radial-gradient(circle at 10% 0%, rgba(135, 206, 235, 0.25) 0%, transparent 50%),
                        radial-gradient(circle at 90% 100%, rgba(255, 215, 100, 0.18) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 70%)`,
    }}>
      {/* GOOGLE FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@500;700&family=Noto+Serif+KR:wght@400;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        .fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .hand { font-family: 'Caveat', cursive; }
        .ink-shadow { box-shadow: 0 4px 20px -8px rgba(15, 76, 117, 0.15), 0 1px 2px rgba(15, 76, 117, 0.05); }
        .gradient-sea { background: linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 50%, #88CCED 100%); }
        .gradient-sun { background: linear-gradient(135deg, #FFB800 0%, #FFD24A 100%); }
        .wave-divider {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='12' viewBox='0 0 1200 12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 Q150,0 300,6 T600,6 T900,6 T1200,6' stroke='%234DA3D6' stroke-width='2' fill='none' /%3E%3C/svg%3E");
          background-repeat: repeat-x;
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <header className="relative overflow-hidden text-white rounded-b-[40px]" style={{
        background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 50%, #88CCED 100%)',
      }}>
        {/* 太陽 */}
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full opacity-90 blur-sm" style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }}></div>
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full" style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }}></div>
        {/* 海鷗 */}
        <div className="absolute top-12 left-8 text-white text-2xl opacity-60">∽</div>
        <div className="absolute top-20 left-20 text-white text-lg opacity-40">∽</div>

        <div className="relative px-6 pt-10 pb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2 text-white/80 text-[10px] tracking-[0.4em] uppercase">
            <span className="w-6 h-px bg-white/60"></span>
            <span>2026 KOREA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-1">
            首爾<span className="text-yellow-200 mx-2">×</span>全州
          </h1>
          <p className="hand text-3xl text-yellow-100 leading-none mb-2">Let's go!</p>
          <p className="text-white/90 text-sm">律師公會 國際交流訪問</p>
          <p className="text-white/70 text-sm tracking-wider mt-1">May 9 — 13, 2026</p>

          {daysToGo !== null && daysToGo > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-blur border border-white/40 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-100" />
              <span className="text-sm">距出發 <span className="font-bold text-yellow-100 text-xl">{daysToGo}</span> 天</span>
            </div>
          )}
          {daysToGo !== null && daysToGo <= 0 && daysToGo >= -4 && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-yellow-300/30 backdrop-blur border border-yellow-200/50 rounded-full">
              <Star className="w-4 h-4 text-yellow-100" />
              <span className="text-sm text-yellow-50">行程進行中</span>
            </div>
          )}
        </div>

        {/* 浪花裝飾底邊 */}
        <div className="h-3 wave-divider opacity-30"></div>
      </header>

      {/* QUICK ACTIONS（浮起卡片）*/}
      <div className="relative z-10 max-w-3xl mx-auto px-3 -mt-6 grid grid-cols-4 gap-2">
        <button onClick={() => setEmergencyOpen(true)}
          className="bg-white py-3 flex flex-col items-center gap-1 rounded-2xl ink-shadow active:scale-95 transition-transform">
          <AlertCircle className="w-5 h-5" style={{ color: '#1E70A8' }} />
          <span className="text-[10px] tracking-wider font-bold" style={{ color: '#1E70A8' }}>緊急</span>
        </button>
        <a href={telLink('+82-10-9736-0706')}
          className="bg-white py-3 flex flex-col items-center gap-1 rounded-2xl ink-shadow active:scale-95 transition-transform">
          <Car className="w-5 h-5" style={{ color: '#1E70A8' }} />
          <span className="text-[10px] tracking-wider font-bold" style={{ color: '#1E70A8' }}>司機</span>
        </a>
        <button onClick={() => setActiveDay('0512')}
          className="py-3 flex flex-col items-center gap-1 rounded-2xl ink-shadow active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }}>
          <Scale className="w-5 h-5 text-white" />
          <span className="text-[10px] tracking-wider font-bold text-white">5/12★</span>
        </button>
        <button onClick={() => setPhrasesOpen(true)}
          className="bg-white py-3 flex flex-col items-center gap-1 rounded-2xl ink-shadow active:scale-95 transition-transform">
          <Globe className="w-5 h-5" style={{ color: '#1E70A8' }} />
          <span className="text-[10px] tracking-wider font-bold" style={{ color: '#1E70A8' }}>韓語</span>
        </button>
      </div>

      {/* INSTALL TO HOME SCREEN BANNER */}
      {showInstallBanner && (
        <div className="relative z-10 max-w-3xl mx-auto px-3 mt-3">
          <div className="rounded-2xl px-4 py-3 ink-shadow flex items-center gap-3"
               style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }}>
            <div className="text-2xl shrink-0">📲</div>
            <div className="flex-1 min-w-0 text-white">
              <div className="font-extrabold text-sm leading-tight">加入主畫面・隨時開啟</div>
              <div className="text-xs opacity-95 mt-0.5">
                {isIOS ? 'iPhone：點下方「看教學」三步驟完成' : 'Android：一鍵安裝到主畫面'}
              </div>
            </div>
            <button onClick={handleInstallClick}
                    className="shrink-0 bg-white px-3 py-2 text-sm font-extrabold rounded-xl active:scale-95 transition-transform"
                    style={{ color: '#7A4D00' }}>
              {isIOS ? '看教學' : '安裝'}
            </button>
            <button onClick={dismissInstall}
                    className="shrink-0 text-white/90 active:text-white p-1"
                    aria-label="關閉安裝提示">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── DAY TABS ─── */}
      <nav className="sticky top-0 z-30 mt-4 px-3">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur p-2 rounded-2xl flex gap-1 overflow-x-auto scrollbar-hide ink-shadow">
          <TabButton active={activeDay === 'overview'} onClick={() => setActiveDay('overview')}
            label="總覽" sub="行前" />
          {days.map(d => (
            <TabButton key={d.id} active={activeDay === d.id} onClick={() => setActiveDay(d.id)}
              label={d.label} sub={d.sub} highlight={d.highlight} />
          ))}
        </div>
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24">
        {activeDay === 'overview' && (
          <div className="space-y-6 fade-up">
            {/* 行程速覽（一定首先看到，5 張小卡點任一張跳到該日）*/}
            <Section title="行程速覽" subtitle="At a Glance">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {days.map(d => {
                  const Icon = d.icon;
                  return (
                    <button key={d.id} onClick={() => setActiveDay(d.id)}
                      className={`group relative p-4 text-left transition-all bg-white rounded-2xl ink-shadow active:scale-95 ${
                        d.highlight ? 'ring-2 ring-yellow-400' : ''
                      }`}>
                      {d.highlight && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      )}
                      <Icon className="w-5 h-5 mb-2" style={{ color: d.highlight ? '#E89B00' : '#1E70A8' }} />
                      <div className="font-extrabold text-lg leading-none" style={{ color: '#0F4C75' }}>{d.label}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{d.sub}</div>
                      <div className="text-xs mt-2 leading-tight font-semibold"
                           style={{ color: d.highlight ? '#E89B00' : '#1E70A8' }}>
                        {d.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>

            {/* ── 四分頁 pill：行前必看 / 攻略 / 地圖 / 聯絡資訊 ── */}
            <div className="grid grid-cols-4 gap-1.5 bg-white/80 backdrop-blur p-1.5 rounded-2xl ink-shadow">
              <OverviewPill active={overviewTab === 'essentials'} onClick={() => setOverviewTab('essentials')}
                icon={Plane} label="行前必看" sub="航班 · 住宿" />
              <OverviewPill active={overviewTab === 'guide'} onClick={() => setOverviewTab('guide')}
                icon={Sparkles} label="攻略" sub="吃 · 買 · 看" />
              <OverviewPill active={overviewTab === 'map'} onClick={() => setOverviewTab('map')}
                icon={MapPin} label="地圖" sub="飯店 3km" />
              <OverviewPill active={overviewTab === 'info'} onClick={() => setOverviewTab('info')}
                icon={Phone} label="聯絡" sub="聯絡人" />
            </div>

            {/* ── 行前必看 ── */}
            {overviewTab === 'essentials' && (
              <div className="space-y-6 fade-up">
                <Section title="航班資訊" subtitle="Flights">
                  <FlightCard label="去程" data={flights.out} />
                  <FlightCard label="回程" data={flights.back} />
                  <Note>建議起飛前 2-2.5 小時抵達機場辦理報到</Note>
                </Section>

                <Section title="住宿" subtitle="Stay">
                  {hotels.map((h, i) => (
                    <HotelCard key={i} data={h} />
                  ))}
                </Section>

                <Section title="接駁安排" subtitle="Shuttle">
                  <div className="text-white p-5 mb-3 rounded-2xl ink-shadow" style={{ background: 'linear-gradient(135deg, #0F4C75 0%, #1E70A8 100%)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-xs text-white/70 tracking-widest uppercase mb-1">Driver</div>
                        <div className="text-xl font-extrabold">金先生</div>
                        <div className="text-sm text-white/85 mt-1">黑色 8150 ・ 全車禁菸</div>
                      </div>
                      <a href={telLink('+82-10-9736-0706')}
                         className="flex items-center gap-2 text-white px-4 py-2 text-sm font-bold transition-colors rounded-xl shadow"
                         style={{ background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }}>
                        <Phone className="w-4 h-4" />
                        撥打
                      </a>
                    </div>
                    <div className="text-white/80 text-sm font-mono">+82-10-9736-0706</div>
                  </div>
                  <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden">
                    {shuttle.map((s, i) => (
                      <div key={i} className={`flex items-center gap-4 p-3 ${i !== shuttle.length - 1 ? 'border-b border-blue-50' : ''}`}>
                        <div className="text-center w-14 shrink-0">
                          <div className="font-extrabold text-sm" style={{ color: '#1E70A8' }}>{s.date}</div>
                          <div className="text-xs text-stone-500">{s.time}</div>
                        </div>
                        <div className="flex-1 text-sm text-stone-700">{s.route}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            )}

            {/* ── 攻略 ── */}
            {overviewTab === 'guide' && (
              <div className="space-y-6 fade-up">
                <Section title="首爾自由行攻略" subtitle="Must Eat · Buy · See">
                  <SubBlock icon={Utensils} label="必吃">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {mustEat.map((m, i) => (
                        <a key={i} href={mapsLink(m.query)} target="_blank" rel="noreferrer"
                           className="block p-3 bg-white border-l-4 rounded-r-2xl ink-shadow active:scale-95 transition-transform"
                           style={{ borderLeftColor: '#FFB800' }}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-bold" style={{ color: '#0F4C75' }}>{m.name}</div>
                              <div className="text-xs text-stone-500 mt-0.5">{m.place} ・ <span className="font-semibold" style={{ color: '#E89B00' }}>{m.tag}</span></div>
                            </div>
                            <MapPin className="w-4 h-4 shrink-0" style={{ color: '#88CCED' }} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </SubBlock>
                  <SubBlock icon={ShoppingBag} label="必買">
                    <ul className="space-y-1.5 bg-white p-4 rounded-2xl ink-shadow">
                      {mustBuy.map((m, i) => (
                        <li key={i}>
                          <a href={mapsLink(m.query)} target="_blank" rel="noreferrer"
                             className="flex items-baseline gap-3 py-1.5 border-b border-dashed border-blue-100 last:border-0 active:bg-blue-50 -mx-2 px-2 rounded transition-colors">
                            <span className="font-bold shrink-0" style={{ color: '#0F4C75' }}>{m.name}</span>
                            <span className="text-xs text-stone-500 ml-auto text-right">{m.where}</span>
                            <MapPin className="w-3.5 h-3.5 shrink-0 self-center" style={{ color: '#88CCED' }} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </SubBlock>
                  <SubBlock icon={Camera} label="必看">
                    <div className="flex flex-wrap gap-2">
                      {mustSee.map((m, i) => (
                        <a key={i} href={mapsLink(m.query)} target="_blank" rel="noreferrer"
                           className="inline-flex items-center gap-2 px-3 py-2 text-white text-sm rounded-xl shadow active:scale-95 transition-transform"
                           style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}>
                          <span className="font-bold">{m.name}</span>
                          <span className="text-xs text-white/80">{m.tag}</span>
                          <MapPin className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </SubBlock>
                </Section>
              </div>
            )}

            {/* ── 地圖（攻略圖 + 熱點）── */}
            {overviewTab === 'map' && (
              <div className="space-y-4 fade-up">

                {/* 城市切換 pill */}
                <div className="grid grid-cols-2 gap-2 bg-white/80 backdrop-blur p-1.5 rounded-2xl ink-shadow">
                  <button
                    onClick={() => setMapCity('seoul')}
                    className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl transition-all ${
                      mapCity === 'seoul' ? 'text-white shadow-md' : 'text-stone-500 hover:bg-blue-50'
                    }`}
                    style={mapCity === 'seoul' ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}}>
                    <div className="text-sm font-bold leading-none" style={mapCity !== 'seoul' ? { color: '#0F4C75' } : {}}>首爾</div>
                    <div className={`text-[10px] leading-none mt-1 ${mapCity === 'seoul' ? 'text-white/85' : 'text-stone-400'}`}>5/9 - 5/11 · 飯店 3km</div>
                  </button>
                  <button
                    onClick={() => setMapCity('jeonju')}
                    className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl transition-all ${
                      mapCity === 'jeonju' ? 'text-white shadow-md' : 'text-stone-500 hover:bg-blue-50'
                    }`}
                    style={mapCity === 'jeonju' ? { background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' } : {}}>
                    <div className="text-sm font-bold leading-none" style={mapCity !== 'jeonju' ? { color: '#0F4C75' } : {}}>全州</div>
                    <div className={`text-[10px] leading-none mt-1 ${mapCity === 'jeonju' ? 'text-white/85' : 'text-stone-400'}`}>5/11 - 5/13 · 拜會行程</div>
                  </button>
                </div>

                {/* 首爾地圖 */}
                {mapCity === 'seoul' && (
                  <Section title="首爾旅遊地圖" subtitle="Seoul Travel Map · 飯店 3 公里半徑">
                    <p className="text-xs text-stone-500 mb-3 px-1">
                      📍 中心點:世宗飯店 · 點圖中地標跳 Naver Map · 點圖放大看細節
                    </p>

                    <div className="relative rounded-2xl overflow-hidden ink-shadow bg-white">
                      <picture>
                        <source srcSet="/seoul-map.webp" type="image/webp" />
                        <img
                          src="/seoul-map.jpg"
                          alt="首爾旅遊地圖"
                          className="w-full h-auto block cursor-zoom-in"
                          onClick={() => setMapOpen(true)}
                          loading="lazy"
                        />
                      </picture>

                      <Hotspot top="14%" left="44%" label="景福宮"
                        query="景福宮 Gyeongbokgung Palace Seoul" />
                      <Hotspot top="22%" left="60%" label="昌德宮"
                        query="昌德宮 Changdeokgung Palace Seoul" />
                      <Hotspot top="46%" left="56%" label="明洞大聖堂"
                        query="명동성당 Myeongdong Cathedral Seoul" />
                      <Hotspot top="32%" left="72%" label="N首爾塔"
                        query="N Seoul Tower 남산서울타워" />
                      <Hotspot top="68%" left="44%" label="明洞商圈"
                        query="명동 Myeongdong Shopping Street Seoul" />
                      <Hotspot top="68%" left="60%" label="Olive Young"
                        query="올리브영 명동타운점 Olive Young Myeongdong" />
                      <Hotspot top="84%" left="46%" label="廣藏市場"
                        query="광장시장 Gwangjang Market Seoul" />
                      <Hotspot top="62%" left="28%" label="南大門市場"
                        query="남대문시장 Namdaemun Market Seoul" />
                      <Hotspot top="42%" left="22%" label="仁寺洞"
                        query="인사동 Insadong Seoul" />
                    </div>

                    <div className="mt-3 text-[11px] text-stone-400 text-center px-2">
                      地圖僅供本團內部參考使用 · 點圖可全螢幕檢視
                    </div>
                  </Section>
                )}

                {/* 全州地圖 */}
                {mapCity === 'jeonju' && (
                  <Section title="全州 Jeonju 拜會地圖" subtitle="韓屋之城 · 美食之都 · 文化交流之旅">
                    <p className="text-xs text-stone-500 mb-3 px-1">
                      📍 中心點:Lahan Hotel · 5/12 拜會 4 個官方地點 · 司機接送 · 點圖放大看細節
                    </p>

                    <div className="relative rounded-2xl overflow-hidden ink-shadow bg-white">
                      <picture>
                        <source srcSet="/jeonju-map.webp" type="image/webp" />
                        <img
                          src="/jeonju-map.jpg"
                          alt="全州拜會地圖"
                          className="w-full h-auto block cursor-zoom-in"
                          onClick={() => setMapOpen(true)}
                          loading="lazy"
                        />
                      </picture>
                    </div>

                    <div className="mt-3 text-[11px] text-stone-400 text-center px-2">
                      地圖僅供本團內部參考使用 · 點圖可全螢幕檢視
                    </div>
                  </Section>
                )}

                {/* 必逛/必買/必吃 重點(只在首爾顯示) */}
                {mapCity === 'seoul' && (
                  <Section title="飯店 3 公里範圍重點" subtitle="Quick Reference">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-2xl bg-white border border-blue-100 ink-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">🏛️</span>
                          <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>必逛地標</span>
                        </div>
                        <div className="text-sm text-stone-700 leading-relaxed">
                          景福宮 · 昌德宮 · 光化門 · 勤政殿 · N首爾塔 · 南山纜車 · 明洞大聖堂 · 明洞商圈 · 清溪川 · 南大門市場 · 廣藏市場 · 首爾火車站 · 仁寺洞傳統文化街
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-blue-100 ink-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">🎁</span>
                          <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>必買特產</span>
                        </div>
                        <div className="text-sm text-stone-700 leading-relaxed">
                          高麗人蔘 · 韓國海苔 · 柚子茶 · 韓國泡菜 · 韓國傳統工藝品 · K-Beauty 美妝
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-blue-100 ink-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">🍴</span>
                          <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>必吃美食</span>
                        </div>
                        <div className="text-sm text-stone-700 leading-relaxed">
                          韓式烤肉 · 部隊鍋 · 拌飯 · 辣炒年糕 · 廣藏市場綠豆煎餅 · 魚板湯
                        </div>
                      </div>
                    </div>
                  </Section>
                )}

                {/* 全州拜會行程清單 */}
                {mapCity === 'jeonju' && (
                  <Section title="5/12 拜會行程" subtitle="Official Visits">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-2xl ink-shadow border-l-4" style={{ background: '#FEF6E0', borderLeftColor: '#FFB800' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm" style={{ color: '#7A4D00' }}>11:00 ❶ 慶基殿</span>
                        </div>
                        <div className="text-xs" style={{ color: '#9A6300' }}>朝鮮王朝歷史建築 · 太祖李成桂御真 · 中文導覽</div>
                      </div>
                      <div className="p-4 rounded-2xl ink-shadow border-l-4" style={{ background: '#FEF6E0', borderLeftColor: '#FFB800' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm" style={{ color: '#7A4D00' }}>14:00 ❷ 全州地方法院</span>
                        </div>
                        <div className="text-xs" style={{ color: '#9A6300' }}>拜會法院長 · 喝茶參觀 · 正式外交</div>
                      </div>
                      <div className="p-4 rounded-2xl ink-shadow border-l-4" style={{ background: '#FEF6E0', borderLeftColor: '#FFB800' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm" style={{ color: '#7A4D00' }}>15:00 ❸ 全州地方檢察院</span>
                        </div>
                        <div className="text-xs" style={{ color: '#9A6300' }}>拜會檢察長 · 喝茶參觀 · 正式外交</div>
                      </div>
                      <div className="p-4 rounded-2xl ink-shadow border-l-4" style={{ background: '#FEF6E0', borderLeftColor: '#FFB800' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm" style={{ color: '#7A4D00' }}>16:00 ❹ 全羅北道律師協會會館</span>
                        </div>
                        <div className="text-xs" style={{ color: '#9A6300' }}>兩會國際交流 · 會長等出席 · 18:00 晚餐</div>
                      </div>
                    </div>
                  </Section>
                )}

                {/* 全州必吃必看 */}
                {mapCity === 'jeonju' && (
                  <Section title="全州必吃必看" subtitle="Local Highlights">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-2xl bg-white border border-blue-100 ink-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">🍴</span>
                          <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>必吃美食</span>
                        </div>
                        <div className="text-sm text-stone-700 leading-relaxed">
                          全州拌飯(色香味俱全) · 解酒湯飯(清爽暖胃) · 五花肉(香嫩多汁) · 紅豆湯(甜而不膩) · 高速公路休息站核桃燒
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-blue-100 ink-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">🏯</span>
                          <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>韓屋村必看</span>
                        </div>
                        <div className="text-sm text-stone-700 leading-relaxed">
                          韓紙工藝(體驗傳統工藝之美) · 韓服體驗(穿韓服留下美照) · 慶基殿(感受歷史氣息) · 殿洞聖堂(紅磚哥德式教堂)
                        </div>
                      </div>
                    </div>
                  </Section>
                )}

              </div>
            )}
            {overviewTab === 'info' && (
              <div className="space-y-6 fade-up">
                <Section title="聯絡人總表" subtitle="Contacts">
                  <ContactGroup title="韓方" items={contacts.korean} />
                  <ContactGroup title="台方旅行社" items={contacts.taiwan} />
                </Section>

                <Section title="實用資訊" subtitle="Practical">
                  <div className="grid grid-cols-2 gap-2">
                    <InfoCard label="時差" value="+1h" detail="韓國 = 台灣 +1 小時" />
                    <InfoCard label="電壓" value="220V" detail="C/F 型圓孔兩孔" />
                    <InfoCard label="貨幣" value="KRW" detail="韓圓・市區匯率較好" />
                    <InfoCard label="地圖 App" value="Naver" detail="或 Kakao Map" />
                  </div>
                  <Note>
                    Google Maps 在韓國定位精度差，建議改用 Naver Map 或 Kakao Map。
                    第一天就買 T-money 卡（地鐵、公車、便利商店通用）。
                  </Note>
                </Section>
              </div>
            )}
          </div>
        )}

        {activeDay !== 'overview' && (
          <DayView
            day={days.find(d => d.id === activeDay)}
            details={dayDetails[activeDay]}
            expandedDetail={expandedDetail}
            setExpandedDetail={setExpandedDetail}
          />
        )}
      </main>

      {/* ─── EMERGENCY MODAL ─── */}
      {emergencyOpen && (
        <Modal onClose={() => setEmergencyOpen(false)} title="緊急聯絡" subtitle="Emergency">
          {contacts.emergency.map((c, i) => (
            <a key={i} href={telLink(c.tel)}
               className={`block p-4 mb-2 transition-all active:scale-[0.98] rounded-2xl text-white ink-shadow`}
               style={c.urgent
                 ? { background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' }
                 : { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold">{c.name}</div>
                  <div className="text-xs mt-1 opacity-90">{c.sub}</div>
                  <div className="text-sm font-mono mt-2">{c.tel}</div>
                </div>
                <Phone className="w-5 h-5 shrink-0 mt-1" />
              </div>
            </a>
          ))}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 text-sm rounded-xl" style={{ color: '#7A4D00' }}>
            <strong>地址：</strong>韓國首爾市鍾路區世宗大路 149 號光化門大廈 6 樓
            <br /><strong>Email：</strong>kor@mofa.gov.tw
          </div>
        </Modal>
      )}

      {/* ─── PHRASES MODAL ─── */}
      {phrasesOpen && (
        <Modal onClose={() => setPhrasesOpen(false)} title="韓語救急" subtitle="Korean Phrases">
          <div className="mb-3 px-1 text-xs text-stone-500">
            點 <Volume2 className="w-3 h-3 inline" /> 跳 Google 翻譯播放發音
          </div>
          {phrases.map((cat, ci) => (
            <div key={ci} className="mb-4">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-base">{cat.icon}</span>
                <span className="text-xs font-bold tracking-[0.2em]" style={{ color: '#1E70A8' }}>
                  {cat.category}
                </span>
                <div className="flex-1 h-px bg-blue-100"></div>
              </div>
              <div className="space-y-1">
                {cat.items.map((p, i) => (
                  <div key={i} className="p-3 bg-white border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-stone-500 w-20 shrink-0">{p.zh}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold leading-tight" style={{ fontFamily: '"Noto Serif KR", serif', color: '#0F4C75' }}>
                          {p.ko}
                        </div>
                        <div className="text-[11px] italic mt-0.5" style={{ color: '#1E70A8' }}>
                          {p.pin}
                        </div>
                      </div>
                      <button onClick={() => speakKorean(p.ko)}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-white shadow active:scale-90 transition-transform"
                        style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}
                        aria-label="播放發音">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-2 p-3 rounded-xl text-xs leading-relaxed" style={{ background: '#FEF6E0', color: '#7A4D00' }}>
            ⓘ <strong>正式敬酒</strong>用「위하여」，比「乾杯」更得體<br />
            ⓘ 點 <Volume2 className="w-3 h-3 inline" /> 會跳到 Google 翻譯播放發音（按播放鍵聽韓語）
          </div>
        </Modal>
      )}

      {/* ─── INSTALL TO HOME SCREEN MODAL (iOS / Android 雙教學) ─── */}
      {installModalOpen && (
        <Modal onClose={() => setInstallModalOpen(false)} title="加入主畫面" subtitle={isIOS ? 'iPhone・iPad' : 'Android'}>
          <div className="space-y-3">
            <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ background: '#FEF6E0', color: '#7A4D00' }}>
              ⚠️ 必須用 <strong>{isIOS ? 'Safari' : 'Chrome / Samsung Internet / Edge'}</strong> 打開本網頁。
              <br />LINE / FB / IG 等內建瀏覽器{isIOS ? '無此功能' : '只能做網頁捷徑(無法全螢幕)'},請先在內建瀏覽器點右上角「⋯」/「⋮」→ <strong>{isIOS ? '用 Safari 開啟' : '在 Chrome 開啟'}</strong>。
            </div>

            {isIOS ? (
              /* ─── iOS Safari ─── */
              <ol className="space-y-2">
                <InstallStep n={1}>
                  點 Safari <strong>底部網址列右側</strong>的 <span className="inline-block bg-blue-50 px-2 py-0.5 rounded text-xs font-mono">⬆️</span> <strong>分享按鈕</strong>
                  <div className="text-xs mt-1" style={{ color: '#78716c' }}>(向上箭頭方框圖示。若你把網址列改到頂部,則在頂部右側)</div>
                </InstallStep>
                <InstallStep n={2}>
                  分享選單往下滑,點 <span className="inline-block bg-blue-50 px-2 py-0.5 rounded text-xs">加入主畫面 <strong>➕</strong></span>
                </InstallStep>
                <InstallStep n={3}>
                  右上角點 <strong>「新增」</strong>,主畫面就會出現「韓國交流」icon (藍底白「韓」字)
                </InstallStep>
              </ol>
            ) : (
              /* ─── Android Chrome ─── */
              <ol className="space-y-2">
                <InstallStep n={1}>
                  點 Chrome <strong>右上角</strong>的 <span className="inline-block bg-blue-50 px-2 py-0.5 rounded text-xs font-mono">⋮</span> <strong>(三點選單)</strong>
                </InstallStep>
                <InstallStep n={2}>
                  選 <span className="inline-block bg-blue-50 px-2 py-0.5 rounded text-xs">📲 <strong>安裝應用程式</strong></span> 或 <span className="inline-block bg-blue-50 px-2 py-0.5 rounded text-xs">加到主畫面</span>
                  <div className="text-xs mt-1" style={{ color: '#78716c' }}>(Samsung Internet 是 ☰ → 加到 → 主畫面)</div>
                </InstallStep>
                <InstallStep n={3}>
                  彈出對話框點 <strong>「安裝」</strong> / 「新增」,主畫面就會出現「韓國交流」icon (藍底白「韓」字)
                </InstallStep>
              </ol>
            )}

            <div className="p-3 rounded-xl text-xs" style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)', color: 'white' }}>
              ✓ 裝完後從主畫面點 icon 開啟,跟 native app 一樣全螢幕、無瀏覽器網址列
            </div>
          </div>
        </Modal>
      )}

      {/* ─── MAP LIGHTBOX ─── 點圖全螢幕看,可雙指縮放 */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2"
          onClick={() => setMapOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setMapOpen(false); }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
            aria-label="關閉"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs">
            雙指縮放看細節 · 點空白關閉
          </div>
          <picture>
            <source srcSet={mapCity === 'jeonju' ? '/jeonju-map.webp' : '/seoul-map.webp'} type="image/webp" />
            <img
              src={mapCity === 'jeonju' ? '/jeonju-map.jpg' : '/seoul-map.jpg'}
              alt={mapCity === 'jeonju' ? '全州拜會地圖' : '首爾旅遊地圖'}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              style={{ touchAction: 'pinch-zoom' }}
            />
          </picture>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────
function InstallStep({ n, children }) {
  return (
    <li className="flex items-start gap-3 p-3 bg-white border border-blue-100 rounded-2xl">
      <div className="shrink-0 w-7 h-7 rounded-full font-extrabold text-white flex items-center justify-center text-sm"
           style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}>{n}</div>
      <div className="flex-1 text-sm leading-relaxed" style={{ color: '#0F4C75' }}>{children}</div>
    </li>
  );
}

function OverviewPill({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-1 px-1 py-2.5 rounded-xl transition-all ${
        active ? 'text-white shadow-md' : 'text-stone-500 hover:bg-blue-50'
      }`}
      style={active ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}}>
      <Icon className="w-5 h-5" style={!active ? { color: '#1E70A8' } : {}} />
      <div className="text-xs font-bold leading-none" style={!active ? { color: '#0F4C75' } : {}}>{label}</div>
      <div className={`text-[9px] leading-none mt-0.5 ${active ? 'text-white/80' : 'text-stone-400'}`}>{sub}</div>
    </button>
  );
}

// 地圖熱點：點擊跳 Naver Map 導航
// 5/12 法院拜會詳細流程
function CourtDetail() {
  return (
    <div className="rounded-2xl p-4 ink-shadow" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
      <div className="text-xs font-bold tracking-wider mb-3" style={{ color: '#7A4D00' }}>
        🏛️ 全州地方法院 詳細流程（韓方提供）
      </div>

      <div className="space-y-2 text-xs leading-relaxed">
        <DetailRow time="14:00-14:05" title="抵達法院 & 移動" desc="正門迎接(公報官、總務課長)・庶務擔當官指引・保安管理隊指揮車輛" />
        <DetailRow time="14:05-14:25" title="參觀審判設施(20分鐘)" desc={
          <span>
            參觀順序:<br/>
            ① 法曹三聖像 → ② 刑事法庭(203號) → ③ 會面交往中心 'Doran Doran' → ④ 民事法庭(501號) 遠程審判演示<br/>
            <span className="text-stone-500">負責人員:公報官、總務課長</span>
          </span>
        } />
        <DetailRow time="14:25-14:30" title="移動到 8 樓小會議室" desc="庶務行政官指引" />
        <DetailRow time="14:30-14:40" title="與法院長談話(10分鐘)" desc={
          <span>
            <span className="font-bold" style={{ color: '#B45309' }}>⚠️ 家屬只能在咨詢室等待,不能進場</span><br/>
            出席:首席部長法官、公報官、台中律師公會 8 位、日本鹿兒島縣 2 位、全羅北道 4 位、翻譯<br/>
            <span className="text-stone-500">主持:公報官 / 指引:庶務行政官</span>
          </span>
        } />
        <DetailRow time="14:40" title="正門歡送" desc="庶務行政官指引" />
      </div>

      <div className="mt-3 pt-3 border-t" style={{ borderColor: '#FFE082' }}>
        <div className="text-xs font-bold mb-2" style={{ color: '#7A4D00' }}>📋 8 樓談話座位圖</div>
        <picture>
          <source srcSet="/court-seating.webp" type="image/webp" />
          <img src="/court-seating.jpg" alt="法院 8 樓會議室座位圖"
            className="w-full rounded-lg cursor-zoom-in" loading="lazy"
            onClick={(e) => { e.stopPropagation(); window.open('/court-seating.jpg', '_blank'); }} />
        </picture>
        <div className="text-[11px] text-stone-500 mt-2 leading-relaxed">
          台方位置:左側 6 位(林炯郡 國際交流委員會副委員長、莎絲奇雅・薄斯凱 國際委員會委員、朴日鎮 國際交流特別委員副幹事、姜信武、李參日 律師會副會長、公報官)+ 首席部長法官 / 韓方位置:右側(餘宇泉 國際交流委員會委員長、李宇章 理事、韓榮秉 事務總長、吳燮均 常務理事、金學洙 律師會會長、後莉娜・卞肅 國際委員會委員長、河松民 律師會理事長、田容鎮 翻譯)
        </div>
      </div>
    </div>
  );
}

// 5/12 檢察院拜會詳細流程
function ProsecutorDetail() {
  return (
    <div className="rounded-2xl p-4 ink-shadow" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
      <div className="text-xs font-bold tracking-wider mb-3" style={{ color: '#7A4D00' }}>
        ⚖️ 全州地方檢察院 詳細流程(韓方提供)
      </div>

      <div className="space-y-2 text-xs leading-relaxed">
        <DetailRow time="15:00-15:10" title="與檢察長談話" desc={
          <span>
            <span className="font-bold" style={{ color: '#15803D' }}>✅ 家屬都可一起參加!</span><br/>
            地點:7 樓 中會議室
          </span>
        } />
        <DetailRow time="15:10-15:25" title="參觀檢察院(15分鐘)" desc={
          <span>
            參觀順序:<br/>
            ① 檢察官辦公室(刑事 1 部 김훈영 檢察官) → ② 錄音錄像調查室 → ③ 婦女兒童調查室 → ④ 溫故知新畫廊<br/>
            <span className="text-stone-500">活動負責人指引・正門歡送</span>
          </span>
        } />
        <DetailRow time="15:25-15:30" title="合影留念 + 贈送紀念品" desc="地點:3 樓 大會議室" />
      </div>
    </div>
  );
}

// 5/12 律協交流會詳細流程
function BarMeetingDetail() {
  return (
    <div className="rounded-2xl p-4 ink-shadow" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
      <div className="text-xs font-bold tracking-wider mb-3" style={{ color: '#7A4D00' }}>
        👥 律協交流會 6 道流程(韓方提供)
      </div>

      <div className="space-y-2 text-xs leading-relaxed">
        <DetailRow time="①" title="開幕詞及致辭" desc="全羅北道律師會會長歡迎辭 → 台中律師公會理事長致辭" />
        <DetailRow time="②" title="出席人員介紹" desc="全羅北道律師會 → 台中律師公會 雙方介紹" />
        <DetailRow time="③" title="情況匯報" desc="全羅北道律師會 → 台中律師公會 雙方匯報" />
        <DetailRow time="④" title="互贈禮品" desc="雙方代表互贈紀念品" />
        <DetailRow time="⑤" title="合影留念" desc="全體合照" />
        <DetailRow time="⑥" title="閉幕" desc="會議結束 → 接續 18:00 律協會長作陪晚餐" />
      </div>

      <div className="mt-3 pt-3 border-t text-[11px] leading-relaxed" style={{ borderColor: '#FFE082', color: '#7A4D00' }}>
        💡 <strong>準備提醒</strong>:理事長致辭 / 公會情況匯報需事先準備中文稿(由翻譯協助同步翻韓文),禮品 13 份由台方準備
      </div>
    </div>
  );
}

// DetailRow 元件
function DetailRow({ time, title, desc }) {
  return (
    <div className="flex gap-2">
      <div className="shrink-0 w-20 font-bold font-mono text-xs" style={{ color: '#7A4D00' }}>{time}</div>
      <div className="flex-1">
        <div className="font-bold" style={{ color: '#0F4C75' }}>{title}</div>
        <div className="text-stone-700 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

function Hotspot({ top, left, label, query }) {
  const handleClick = (e) => {
    e.stopPropagation(); // 不要觸發父層的 lightbox open
    const url = `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };
  return (
    <button
      onClick={handleClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ top, left }}
      aria-label={`查看 ${label}`}
    >
      {/* 脈動光環(縮小+更柔和) */}
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#FFB800', opacity: 0.3 }}></span>
      {/* 主要圓點(從 w-5 h-5 縮小到 w-3 h-3) */}
      <span className="relative block w-3 h-3 rounded-full border border-white shadow-md active:scale-90 transition-transform"
        style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FFB800 100%)' }}>
      </span>
      {/* 標籤(桌面 hover 才出現) */}
      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </button>
  );
}

function TabButton({ active, onClick, label, sub, highlight }) {
  return (
    <button onClick={onClick}
      className={`shrink-0 px-3 py-2 text-center transition-all rounded-xl ${
        active
          ? 'text-white shadow-md'
          : highlight ? 'bg-yellow-100' : 'bg-transparent hover:bg-white'
      }`}
      style={active ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}}>
      <div className={`font-bold text-sm leading-none`}
           style={!active ? (highlight ? { color: '#E89B00' } : { color: '#1E70A8' }) : {}}>
        {label}
        {highlight && <span className="ml-0.5">★</span>}
      </div>
      <div className={`text-[10px] mt-0.5`} style={active ? { color: 'rgba(255,255,255,0.8)' } : { color: '#6b7280' }}>{sub}</div>
    </button>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className="fade-up">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: '#0F4C75' }}>{title}</h2>
        <span className="hand text-xl" style={{ color: '#E89B00' }}>~ {subtitle}</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #88CCED 0%, transparent 100%)' }}></div>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SubBlock({ icon: Icon, label, children }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2" style={{ color: '#1E70A8' }}>
        <Icon className="w-4 h-4" />
        <span className="font-bold text-sm tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}

function FlightCard({ label, data }) {
  return (
    <div className="bg-white border border-blue-100 ink-shadow rounded-2xl overflow-hidden">
      <div className="px-4 py-2 text-white flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0F4C75 0%, #1E70A8 100%)' }}>
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4" />
          <span className="text-sm font-bold tracking-wider">{label}</span>
        </div>
        <span className="text-xs text-white/80">{data.date}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-extrabold leading-none" style={{ color: '#0F4C75' }}>{data.fromTime}</div>
            <div className="text-xs text-stone-500 mt-1">{data.from}</div>
          </div>
          <div className="px-3 text-blue-300">
            <div className="border-t border-dashed border-blue-300 w-12"></div>
            <div className="text-[10px] text-center mt-1 text-stone-500">{data.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold leading-none" style={{ color: '#0F4C75' }}>{data.toTime}</div>
            <div className="text-xs text-stone-500 mt-1">{data.to}</div>
          </div>
        </div>
        <div className="pt-3 border-t border-blue-50 flex items-center justify-between text-xs text-stone-500">
          <span>{data.code} ・ {data.airline}</span>
          <span>{data.aircraft}</span>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ data }) {
  const telLink = (num) => `tel:${num.replace(/[\s-]/g, '')}`;
  const mapsLink = (q) => `https://map.naver.com/p/search/${encodeURIComponent(q)}`;
  return (
    <div className="bg-white border border-blue-100 ink-shadow p-5 rounded-2xl">
      <div className="flex items-start gap-3 mb-3">
        <Hotel className="w-5 h-5 mt-1 shrink-0" style={{ color: '#1E70A8' }} />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold tracking-wider" style={{ color: '#1E70A8' }}>{data.stay}</div>
          <div className="font-extrabold text-lg leading-tight" style={{ color: '#0F4C75' }}>{data.cn}</div>
          <div className="text-xs text-stone-500 mt-0.5">{data.name}</div>
        </div>
      </div>
      <div className="text-sm text-stone-700 mb-2">{data.address}</div>
      <div className="text-xs text-stone-500 mb-3">訂房代號：{data.code}</div>
      <div className="flex gap-2">
        <a href={telLink(data.tel)}
           className="flex-1 flex items-center justify-center gap-2 py-2.5 text-white text-sm font-bold transition-colors rounded-xl"
           style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}>
          <Phone className="w-4 h-4" /> 撥打
        </a>
        <a href={mapsLink(data.mapsQuery)} target="_blank" rel="noreferrer"
           className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-yellow-100 text-sm font-bold transition-colors rounded-xl"
           style={{ color: '#E89B00' }}>
          <MapPin className="w-4 h-4" /> 地圖
        </a>
      </div>
      <div className="mt-2 text-xs text-stone-500 text-center">Check-in 15:00 ・ Check-out 11:00</div>
    </div>
  );
}

function ContactGroup({ title, items }) {
  const telLink = (num) => `tel:${num.replace(/[\s-]/g, '')}`;
  return (
    <div className="mb-3">
      <div className="text-xs tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: '#1E70A8' }}>{title}</div>
      {items.map((c, i) => (
        <div key={i} className="bg-white border border-blue-100 p-4 mb-2 rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-bold" style={{ color: '#0F4C75' }}>{c.name}</div>
              <div className="text-xs text-stone-500 mt-0.5">{c.sub}</div>
              {c.email && <div className="text-xs text-stone-500 mt-1 font-mono">{c.email}</div>}
              {c.note && <div className="text-xs mt-1" style={{ color: '#E89B00' }}>{c.note}</div>}
            </div>
            {c.tel && (
              <a href={telLink(c.tel)}
                 className="flex items-center gap-1 px-3 py-1.5 text-white text-xs font-bold shrink-0 transition-colors rounded-xl"
                 style={{ background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' }}>
                <Phone className="w-3 h-3" />
                撥打
              </a>
            )}
          </div>
          {c.tel && <div className="text-xs text-stone-400 mt-2 font-mono">{c.tel}</div>}
        </div>
      ))}
    </div>
  );
}

function InfoCard({ label, value, detail }) {
  return (
    <div className="p-4 bg-white border border-blue-100 rounded-2xl">
      <div className="text-[10px] tracking-[0.3em] uppercase mb-1 font-bold" style={{ color: '#88CCED' }}>{label}</div>
      <div className="text-2xl font-extrabold leading-none" style={{ color: '#0F4C75' }}>{value}</div>
      <div className="text-xs text-stone-500 mt-2">{detail}</div>
    </div>
  );
}

function Note({ children }) {
  return (
    <div className="mt-2 px-4 py-3 bg-yellow-50 border-l-4 text-xs leading-relaxed rounded-r-xl" style={{ borderLeftColor: '#FFB800', color: '#7A4D00' }}>
      {children}
    </div>
  );
}

function DayView({ day, details, expandedDetail, setExpandedDetail }) {
  if (!day || !details) return null;
  const Icon = day.icon;
  const mapsLink = (q) => `https://map.naver.com/p/search/${encodeURIComponent(q)}`;

  return (
    <div className="fade-up">
      {/* DAY HEADER */}
      <div className={`relative overflow-hidden mb-6 p-6 rounded-3xl text-white ink-shadow`} style={{
        background: day.highlight
          ? 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)'
          : 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 60%, #88CCED 100%)',
      }}>
        {day.highlight && (
          <div className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/25"></div>
        )}
        <div className="relative">
          <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase mb-2 opacity-90">
            <Icon className="w-4 h-4" />
            <span>Day · {day.label}</span>
            <span>·</span>
            <span>{day.sub}</span>
          </div>
          <h2 className="text-3xl font-extrabold leading-tight">{details.title}</h2>
          {details.note && (
            <p className="mt-3 text-sm opacity-95 leading-relaxed">{details.note}</p>
          )}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="relative">
        <div className="absolute left-[68px] top-2 bottom-2 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #88CCED 0%, #DDEEF7 100%)' }}></div>
        {details.schedule.map((item, i) => {
          const ItemIcon = item.icon || Clock;
          const isExpandable = !!item.expandKey;
          const isExpanded = expandedDetail === item.expandKey;
          return (
            <div key={i} className="flex gap-4 mb-3 relative">
              <div className="w-14 shrink-0 text-right pt-2">
                <div className="font-extrabold text-sm font-mono" style={{ color: '#1E70A8' }}>{item.time}</div>
              </div>
              <div className={`relative z-10 w-8 h-8 shrink-0 flex items-center justify-center rounded-full mt-1 ink-shadow ${
                item.formal ? 'text-white' :
                item.highlight ? 'text-white' :
                'bg-white border-2'
              }`} style={
                item.formal ? { background: 'linear-gradient(135deg, #FFB800 0%, #FFD24A 100%)' } :
                item.highlight ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } :
                { borderColor: '#88CCED', color: '#1E70A8' }
              }>
                <ItemIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 pb-2">
                <button
                  onClick={isExpandable ? () => setExpandedDetail(isExpanded ? null : item.expandKey) : undefined}
                  className={`w-full text-left p-3 rounded-2xl transition-all ${
                    item.formal ? 'border-l-4' :
                    item.highlight ? 'text-white' : 'bg-white border border-blue-100'
                  } ${isExpandable ? 'active:scale-[0.98]' : ''}`}
                  style={
                    item.formal ? { background: '#FEF6E0', borderLeftColor: '#FFB800' } :
                    item.highlight ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}
                  }
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm leading-snug`} style={item.formal ? { color: '#7A4D00' } : !item.highlight ? { color: '#0F4C75' } : {}}>{item.title}</div>
                      <div className={`text-xs mt-1`} style={
                        item.formal ? { color: '#9A6300' } :
                        item.highlight ? { color: 'rgba(255,255,255,0.85)' } : { color: '#78716c' }
                      }>{item.sub}</div>
                    </div>
                    {isExpandable && (
                      <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{
                        background: item.formal ? '#FFB800' : 'rgba(255,255,255,0.3)',
                        color: item.formal ? 'white' : 'white'
                      }}>
                        {isExpanded ? '收起 ▲' : '詳細 ▼'}
                      </span>
                    )}
                    {!isExpandable && item.mapsQuery && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); window.open(mapsLink(item.mapsQuery), '_blank'); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); window.open(mapsLink(item.mapsQuery), '_blank'); } }}
                        className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full cursor-pointer active:scale-95 transition-transform"
                        style={{
                          background: item.highlight ? 'rgba(255,255,255,0.95)' : 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)',
                          color: item.highlight ? '#1E70A8' : 'white'
                        }}
                      >
                        <MapPin className="w-3 h-3" />
                        導航
                      </span>
                    )}
                  </div>
                </button>

                {/* 展開詳細流程 */}
                {isExpandable && isExpanded && (
                  <div className="mt-2 fade-up">
                    {item.expandKey === 'court' && <CourtDetail />}
                    {item.expandKey === 'prosecutor' && <ProsecutorDetail />}
                    {item.expandKey === 'bar' && <BarMeetingDetail />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ALTERNATIVES */}
      {details.alternatives && (
        <div className="mt-8">
          <div className="text-xs tracking-[0.3em] uppercase mb-3 font-bold" style={{ color: '#1E70A8' }}>替代路線 · Alternatives</div>
          {details.alternatives.map((a, i) => (
            <div key={i} className="p-3 mb-2 bg-white border border-blue-100 rounded-2xl">
              <div className="font-bold text-sm" style={{ color: '#0F4C75' }}>{a.name}</div>
              <div className="text-xs text-stone-500 mt-1">{a.detail}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Modal({ children, onClose, title, subtitle }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-blue-900/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#F0F8FF] w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 text-white p-4 flex items-center justify-between rounded-t-3xl" style={{ background: 'linear-gradient(135deg, #0F4C75 0%, #1E70A8 100%)' }}>
          <div>
            <div className="text-xs text-white/70 tracking-[0.3em] uppercase">{subtitle}</div>
            <div className="text-xl font-extrabold">{title}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 transition-colors rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
