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
  const [overviewTab, setOverviewTab] = useState('essentials'); // essentials | guide | info

  useEffect(() => {
    const departure = new Date('2026-05-09T10:40:00+08:00');
    const now = new Date();
    const diff = Math.ceil((departure - now) / (1000 * 60 * 60 * 24));
    setDaysToGo(diff);
  }, []);

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
      mapsQuery: 'Sejong Hotel Seoul Myeongdong',
    },
    {
      name: 'Lahan Hotel Jeonju',
      cn: '全州拉漢飯店',
      stay: '5/11 - 5/13（2 晚）',
      address: '85 Girin-daero, Wansan-gu, Jeonju-si, Jeollabuk-do',
      tel: '+82-63-232-7000',
      code: '6 組房號 26008814 / 15 / 16 / 30 / 32 / 35',
      mapsQuery: 'Lahan Hotel Jeonju',
    },
  ];

  const shuttle = [
    { date: '5/9', time: '14:15', route: '仁川機場 → Sejong Hotel 明洞' },
    { date: '5/11', time: '09:00', route: 'Sejong Hotel → Lahan Hotel 全州' },
    { date: '5/12', time: '13:10', route: '接全員 → 全州地方法院／檢察院／律師協會會館' },
    { date: '5/13', time: '08:00', route: 'Lahan Hotel → 仁川機場' },
  ];

  const dayDetails = {
    '0509': {
      title: '抵達日 ・ 初見首爾與夜景',
      schedule: [
        { time: '08:50', title: '清泉崗國際機場集合', sub: '國際線建議 1.5-2h 前抵達・週末人潮+伴手禮分配', icon: Users, highlight: true },
        { time: '10:40', title: 'LJ736 起飛', sub: '台中清泉崗 T1 → 仁川 T2', icon: Plane },
        { time: '14:15', title: '抵達仁川機場', sub: '入境 → 接駁集合', icon: MapPin },
        { time: '14:15', title: '金先生接駁', sub: '黑色 8150 → Sejong Hotel', icon: Car },
        { time: '15:00', title: 'Sejong Hotel Check-in', sub: '訂房代號 26171059', icon: Hotel },
        { time: '18:00', title: '晚餐：黃金牧場 明洞店', sub: '12 人韓牛・熟成五花肉・專人代烤', icon: Utensils, highlight: true },
        { time: '20:15', title: '南山纜車 + N 首爾塔', sub: '夜景場次', icon: Sparkles },
      ],
    },
    '0510': {
      title: '首爾自由行 ・ 四種路線可選',
      note: '主推明洞線（米其林餃子＋NANTA＋Chimaek 慶典）。其他三條替代路線見下方。',
      schedule: [
        { time: '09:30', title: '北村韓屋村 晨間散策', sub: '傳統韓屋聚落・拍照點', icon: Camera },
        { time: '12:00', title: '明洞餃子 米其林午餐', sub: '必比登推薦', icon: Utensils },
        { time: '14:00', title: '明洞自由採買 + 大聖堂', sub: 'Olive Young・繁華商圈', icon: ShoppingBag },
        { time: '17:00', title: 'NANTA 亂打秀', sub: '明洞 ANT 秀劇場・震撼全場', icon: Sparkles, highlight: true },
        { time: '19:00', title: 'BBQ Chicken 明洞之星店', sub: '12 人 Chimaek 終極慶典', icon: Utensils },
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
        { time: '07:00', title: '飯店附近早餐', sub: '出發前用餐', icon: Coffee },
        { time: '09:00', title: 'Sejong Hotel 集合・接駁出發', sub: '金先生 → 公路旅行', icon: Car },
        { time: '11:30', title: '抵達全羅北道', sub: '中途休息站必買核桃燒', icon: MapPin },
        { time: '12:00', title: 'Lahan Hotel 韓方迎接', sub: '姜信武律師、朴鎰址律師', icon: Hotel, highlight: true },
        { time: '12:30', title: '午餐：종로회관（鐘路會館）', sub: '全州拌飯＋牛肉餅・₩21,000/人・韓方預訂 13 位', icon: Utensils },
        { time: '13:30', title: '全州韓屋村自由活動', sub: '韓服拍照・韓紙工藝・冰沙等美食（至 17:50）', icon: Camera },
        { time: '18:00', title: '晚餐：부부상회（夫婦商會）五花肉店', sub: '全羅北道律師協會 國際交流委員會委員長等作陪', icon: Utensils, highlight: true },
        { time: '20:00', title: '晚餐後聚會：전일갑오（全日甲午）', sub: '酒菜店（至 22:00）', icon: Utensils },
      ],
    },
    '0512': {
      title: '官方交流日 ・ 兩會國際交流',
      note: '本日為訪問重點。法院、檢察院為正式外交場合，請著正裝。法院／檢察院／律師協會會館皆可走路串連。',
      schedule: [
        { time: '07:00', title: '早餐 + 自由活動', sub: '飯店或全州解酒豆芽湯飯店・姜信武律師陪同（至 10:30）', icon: Coffee },
        { time: '10:50', title: '慶基殿 文化參觀', sub: '1410 年朝鮮太宗 11 年建・供奉太祖李成桂御真・中文解說員 임정숙 林先生 010-6778-6080・₩3,000/人・預訂 13 位（至 12:00）', icon: Building2 },
        { time: '12:00', title: '午餐：베테랑칼국수（老兵刀削麵）', sub: '姜信武律師、朴鎰址律師作陪', icon: Utensils },
        { time: '13:10', title: '巴士移動 → 法院', sub: 'Lahan Hotel 出發・約 30 分鐘・在法院正門下車', icon: Car },
        { time: '14:00', title: '全州地方法院 拜會法院長', sub: '喝茶・參觀法院・正式外交（可拍照、有紀念品）', icon: Scale, highlight: true, formal: true },
        { time: '15:00', title: '全州地方檢察院 拜會檢察長', sub: '從法院走路過去・喝茶・參觀檢察院・正式外交（可拍照、有紀念品）', icon: Briefcase, highlight: true, formal: true },
        { time: '16:00', title: '全羅北道律師協會會館', sub: '兩會國際交流活動・會長等出席（巴士停會館後方空地）', icon: Users, highlight: true, formal: true },
        { time: '16:50', title: '巴士回 Lahan Hotel・整理', sub: '車程約 30 分・整理至 17:50', icon: Car },
        { time: '18:00', title: '晚餐：천년누리봄（千年Nuribom）', sub: '全羅北道律師協會會長等作陪（至 21:00）', icon: Utensils, highlight: true },
        { time: '21:00', title: '晚餐後聚會', sub: '全羅北道律師協會會長等・酒菜店（至 22:30）', icon: Utensils },
      ],
    },
    '0513': {
      title: '送別 ・ 歸國',
      schedule: [
        { time: '07:30', title: 'Lahan Hotel 送別', sub: '姜信武律師、朴鎰址律師', icon: Hotel },
        { time: '08:00', title: '接駁出發', sub: 'Lahan Hotel → 仁川機場', icon: Car },
        { time: '14:50', title: 'LJ737 起飛', sub: '仁川 T2 → 台中清泉崗 T1', icon: Plane },
        { time: '16:30', title: '抵達台灣', sub: '結束 5 天 4 夜行程', icon: Home },
      ],
    },
  };

  const mustEat = [
    { name: '富村生牛肉', place: '廣藏市場', tag: '米其林・生拌活章魚', query: '富村生牛肉 廣藏市場 首爾' },
    { name: '順熙家綠豆煎餅', place: '廣藏市場', tag: '廣藏市場靈魂', query: '順熙家 綠豆煎餅 廣藏市場' },
    { name: '麻藥紫菜飯捲', place: '廣藏市場', tag: '沾芥末醬中毒', query: '麻藥紫菜飯捲 廣藏市場' },
    { name: '土俗村參雞湯', place: '景福宮旁', tag: 'Ginseng Chicken', query: '土俗村蔘雞湯 首爾' },
    { name: '明洞餃子', place: '明洞', tag: '米其林必比登', query: '明洞餃子 본점 首爾' },
    { name: 'BBQ Chicken 明洞之星', place: '明洞', tag: '炸雞啤酒慶典', query: 'BBQ Chicken 明洞之星店 首爾' },
    { name: '黃金牧場 明洞店', place: '明洞', tag: '熟成五花肉・韓牛', query: '황금목장 명동 黃金牧場 明洞' },
    { name: '北村六景', place: '北村韓屋村', tag: '餛飩麵', query: '북촌 한옥마을 6경 北村韓屋村' },
  ];

  const mustBuy = [
    { name: '人參、紅參', where: '南大門市場・廣藏市場・高麗參專賣店', query: '南大門市場 高麗參專賣店 首爾' },
    { name: '海苔', where: '南大門市場・廣藏市場・伴手禮首選', query: '南大門市場 首爾' },
    { name: '化妝品', where: 'Olive Young 明洞店', query: 'Olive Young 明洞 首爾' },
    { name: '傳統棉被', where: '廣藏市場・超細纖維・真空打包', query: '廣藏市場 棉被 首爾' },
    { name: '醃漬海鮮', where: '廣藏市場・醃明太子、章魚', query: '廣藏市場 首爾' },
    { name: '凍乾草莓', where: '南大門市場乾貨區', query: '南大門市場 乾貨 首爾' },
    { name: '韓文印章', where: '仁寺洞・個人化伴手禮', query: '仁寺洞 首爾' },
  ];

  const mustSee = [
    { name: '景福宮 + 光化門', tag: '朝鮮王朝正宮', query: '景福宮 首爾' },
    { name: '昌德宮', tag: '世界遺產', query: '昌德宮 首爾' },
    { name: 'N 首爾塔 + 南山纜車', tag: '夜景必看', query: 'N首爾塔 南山纜車' },
    { name: '明洞大聖堂', tag: 'Gothic Cathedral', query: '明洞聖堂 Myeongdong Cathedral' },
    { name: '清溪川', tag: '城市散步', query: '清溪川 首爾' },
    { name: '北村韓屋村', tag: '傳統韓屋', query: '北村韓屋村 Bukchon Hanok Village' },
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
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

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

            {/* ── 三分頁 pill：行前必看 / 攻略 / 聯絡資訊 ── */}
            <div className="flex gap-2 bg-white/80 backdrop-blur p-1.5 rounded-2xl ink-shadow">
              <OverviewPill active={overviewTab === 'essentials'} onClick={() => setOverviewTab('essentials')}
                icon={Plane} label="行前必看" sub="航班 · 住宿 · 接駁" />
              <OverviewPill active={overviewTab === 'guide'} onClick={() => setOverviewTab('guide')}
                icon={Sparkles} label="攻略" sub="必吃 · 必買 · 必看" />
              <OverviewPill active={overviewTab === 'info'} onClick={() => setOverviewTab('info')}
                icon={Phone} label="聯絡資訊" sub="聯絡人 · 實用" />
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

            {/* ── 聯絡資訊 ── */}
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
    </div>
  );
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────
function OverviewPill({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-xl transition-all ${
        active ? 'text-white shadow-md' : 'text-stone-500 hover:bg-blue-50'
      }`}
      style={active ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}}>
      <Icon className="w-5 h-5" style={!active ? { color: '#1E70A8' } : {}} />
      <div className="text-xs font-bold leading-none" style={!active ? { color: '#0F4C75' } : {}}>{label}</div>
      <div className={`text-[9px] leading-none mt-0.5 ${active ? 'text-white/80' : 'text-stone-400'}`}>{sub}</div>
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
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
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

function DayView({ day, details }) {
  if (!day || !details) return null;
  const Icon = day.icon;

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
                <div className={`p-3 rounded-2xl ${
                  item.formal ? 'border-l-4' :
                  item.highlight ? 'text-white' : 'bg-white border border-blue-100'
                }`} style={
                  item.formal ? { background: '#FEF6E0', borderLeftColor: '#FFB800' } :
                  item.highlight ? { background: 'linear-gradient(135deg, #4DA3D6 0%, #6FBEE0 100%)' } : {}
                }>
                  <div className={`font-bold text-sm leading-snug`} style={item.formal ? { color: '#7A4D00' } : !item.highlight ? { color: '#0F4C75' } : {}}>{item.title}</div>
                  <div className={`text-xs mt-1`} style={
                    item.formal ? { color: '#9A6300' } :
                    item.highlight ? { color: 'rgba(255,255,255,0.85)' } : { color: '#78716c' }
                  }>{item.sub}</div>
                </div>
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
