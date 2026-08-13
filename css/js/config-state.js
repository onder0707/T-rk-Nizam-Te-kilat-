// ==========================================
// 1. UYGULAMA DURUMU (STATE)
// ==========================================
const appState = {
  user: {
    name: "Kullanıcı Adı",
    username: "@kullanici_adi",
    role: "Saha Üyesi",
    status: "dnd", // online, dnd, away, offline
    joinDate: "13 Ağustos 2026",
    lastActive: "Rahatsız Etmeyin",
    about: "Deneme",
    avatar: "Screenshot_20260813-013040_Gallery.jpg",
    banner: "Screenshot_20260813-013040_Gallery.jpg",
    bannerType: "image" // 'image' veya 'video'
  },
  settings: {
    darkMode: false,
    fontSize: "normal", // small, normal, large
    language: "tr" // tr, en, fr
  }
};

// ==========================================
// 2. ÇOK DİLLİ SÖZLÜK (TRANSLATIONS)
// ==========================================
const i18n = {
  tr: {
    siteTitle: "Türk Nizam Teşkilatı",
    homeDesc: "Birliğimiz, vizyonumuz ve geleceğimiz için tek çatı altındayız.",
    online: "Çevrimiçi",
    members: "Kayıtlı Üye",
    rulesTitle: "Teşkilat Tüzüğü",
    rulesDesc: "Teşkilatımızın temel ilkeleri milli birlik, dürüstlük ve vatan sevgisi üzerine kuruludur.",
    guestBadge: "MİSAFİR ÜYE",
    guestNotice: "Sohbet ve Forum alanlarına katılmak için oturum açmanız gerekmektedir.",
    navHome: "Ana Sayfa",
    navForum: "Forum",
    navChat: "Sohbet",
    navProfile: "Profil",
    statusSet: "Durum Set Et:",
    joinDate: "Kayıt Tarihi",
    lastActive: "Son Aktiflik",
    aboutMe: "Hakkımda",
    editAbout: "✏️ Düzenle",
    settingsTitle: "Ayarlar & Teknik Bilgiler",
    darkMode: "Dark Mode",
    darkModeDesc: "Gece moduna geçiş yapın",
    fontSize: "Yazı Boyutu",
    fontSizeDesc: "Metin boyutlarını ölçekleyin",
    language: "Uygulama Dili",
    languageDesc: "Arayüz dilini değiştirin",
    techTitle: "Teknik & Sistem Bilgileri",
    clearCache: "Önbelleği Temizle",
    reportBug: "Hata Bildir"
  },
  en: {
    siteTitle: "Turkish Order Organization",
    homeDesc: "We are under one roof for our unity, vision and future.",
    online: "Online",
    members: "Registered Members",
    rulesTitle: "Organization Charter",
    rulesDesc: "The core principles of our organization are built on national unity, honesty, and love of country.",
    guestBadge: "GUEST MEMBER",
    guestNotice: "You need to log in to participate in Chat and Forum areas.",
    navHome: "Home",
    navForum: "Forum",
    navChat: "Chat",
    navProfile: "Profile",
    statusSet: "Set Status:",
    joinDate: "Join Date",
    lastActive: "Last Active",
    aboutMe: "About Me",
    editAbout: "✏️ Edit",
    settingsTitle: "Settings & Technical Info",
    darkMode: "Dark Mode",
    darkModeDesc: "Switch to night mode view",
    fontSize: "Font Size",
    fontSizeDesc: "Scale text sizes",
    language: "App Language",
    languageDesc: "Change interface language",
    techTitle: "Technical & System Info",
    clearCache: "Clear Cache",
    reportBug: "Report Bug"
  },
  fr: {
    siteTitle: "Organisation de l'Ordre Turc",
    homeDesc: "Nous sommes sous le même toit pour notre unité, notre vision et notre avenir.",
    online: "En ligne",
    members: "Membres Inscrits",
    rulesTitle: "Charte de l'Organisation",
    rulesDesc: "Les principes fondamentaux de notre organisation reposent sur l'unité nationale, l'honnêteté et le patriotisme.",
    guestBadge: "MEMBRE INVITÉ",
    guestNotice: "Vous devez vous connecter pour participer au chat et au forum.",
    navHome: "Accueil",
    navForum: "Forum",
    navChat: "Discussion",
    navProfile: "Profil",
    statusSet: "Définir Statut:",
    joinDate: "Date d'inscription",
    lastActive: "Dernière Activité",
    aboutMe: "À propos de moi",
    editAbout: "✏️ Modifier",
    settingsTitle: "Paramètres & Infos Techniques",
    darkMode: "Mode Sombre",
    darkModeDesc: "Passer en mode nuit",
    fontSize: "Taille de Police",
    fontSizeDesc: "Ajuster la taille du texte",
    language: "Langue de l'App",
    languageDesc: "Changer la langue",
    techTitle: "Infos Techniques & Système",
    clearCache: "Vider le Cache",
    reportBug: "Signaler un Bug"
  }
};
    
