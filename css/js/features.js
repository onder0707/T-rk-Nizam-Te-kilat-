// ==========================================
// 1. İSİM, KULLANICI ADI VE PROFİL İŞLEMLERİ
// ==========================================

// İSİM DEĞİŞTİRME
function editProfileName() {
  const currentName = appState.user.name;
  const newName = prompt("Yeni İsim Giriniz:", currentName);
  
  if (newName && newName.trim() !== "") {
    appState.user.name = newName.trim();
    document.getElementById("profName").innerText = appState.user.name;
    saveStateToStorage();
  }
}

// KULLANICI ADI DEĞİŞTİRME
function editUsername() {
  const currentUsername = appState.user.username;
  const newUsername = prompt("Yeni Kullanıcı Adı (@...):", currentUsername);
  
  if (newUsername && newUsername.trim() !== "") {
    let formatted = newUsername.trim();
    if (!formatted.startsWith("@")) formatted = "@" + formatted;
    appState.user.username = formatted;
    document.getElementById("profUsername").innerText = appState.user.username;
    saveStateToStorage();
  }
}

// AVATAR (RESİM) YÜKLEME
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      appState.user.avatar = e.target.result;
      document.getElementById("profAvatar").src = e.target.result;
      saveStateToStorage();
    };
    reader.readAsDataURL(file);
  }
}

// BANNER (KAPAK RESMİ VEYA VİDEOSU) YÜKLEME
function handleBannerUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    const isVideo = file.type.startsWith("video/");

    reader.onload = function(e) {
      const bannerImg = document.getElementById("bannerImg");
      const bannerVideo = document.getElementById("bannerVideo");

      if (isVideo) {
        appState.user.bannerType = "video";
        appState.user.banner = e.target.result;
        
        bannerImg.style.display = "none";
        bannerVideo.style.display = "block";
        bannerVideo.src = e.target.result;
      } else {
        appState.user.bannerType = "image";
        appState.user.banner = e.target.result;

        bannerVideo.style.display = "none";
        bannerImg.style.display = "block";
        bannerImg.src = e.target.result;
      }
      saveStateToStorage();
    };
    reader.readAsDataURL(file);
  }
}

// DURUM DEĞİŞTİRME (🟢 Çevrimiçi vb.)
function updateUserStatus(statusVal) {
  appState.user.status = statusVal;
  const lastActiveEl = document.getElementById("valLastActive");
  
  if (statusVal === "online") lastActiveEl.innerText = "Şimdi aktif";
  else if (statusVal === "dnd") lastActiveEl.innerText = "Rahatsız Etmeyin";
  else if (statusVal === "away") lastActiveEl.innerText = "Dışarıda";
  else lastActiveEl.innerText = "Çevrimdışı";

  saveStateToStorage();
}

// HAKKIMDA DÜZENLEME
function editAboutMe() {
  const currentText = appState.user.about;
  const newText = prompt("Hakkımda yazısını düzenleyin:", currentText);
  if (newText !== null) {
    appState.user.about = newText.trim();
    document.getElementById("valAboutText").innerText = appState.user.about;
    saveStateToStorage();
  }
}

// ==========================================
// 2. AYARLAR (DARK MODE, FONT, DİL)
// ==========================================

function toggleDarkMode(isDark) {
  appState.settings.darkMode = isDark;
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  saveStateToStorage();
}

function changeFontSize(size) {
  appState.settings.fontSize = size;
  if (size === "small") document.body.style.fontSize = "13px";
  else if (size === "large") document.body.style.fontSize = "17px";
  else document.body.style.fontSize = "15px";
  
  saveStateToStorage();
}

function changeLanguage(lang) {
  appState.settings.language = lang;
  const dict = i18n[lang] || i18n["tr"];

  // Arayüz Elemanlarını Çevir
  setText("siteTitleText", dict.siteTitle);
  setText("txtHomeDesc", dict.homeDesc);
  setText("lblOnline", dict.online);
  setText("lblMembers", dict.members);
  setText("txtRulesTitle", dict.rulesTitle);
  setText("txtRulesDesc", dict.rulesDesc);
  setText("lblGuestBadge", dict.guestBadge);
  setText("txtGuestNotice", dict.guestNotice);
  setText("lblNavHome", dict.navHome);
  setText("lblNavForum", dict.navForum);
  setText("lblNavChat", dict.navChat);
  setText("lblNavProfile", dict.navProfile);
  setText("lblStatusSet", dict.statusSet);
  setText("lblJoinDate", dict.joinDate);
  setText("lblLastActive", dict.lastActive);
  setText("lblAboutMe", dict.aboutMe);
  setText("lblEditAbout", dict.editAbout);
  setText("lblSettingsTitle", dict.settingsTitle);
  setText("lblDarkMode", dict.darkMode);
  setText("lblDarkModeDesc", dict.darkModeDesc);
  setText("lblFontSize", dict.fontSize);
  setText("lblFontSizeDesc", dict.fontSizeDesc);
  setText("lblLanguage", dict.language);
  setText("lblLanguageDesc", dict.languageDesc);
  setText("lblTechTitle", dict.techTitle);
  setText("lblClearCache", dict.clearCache);
  setText("lblReportBug", dict.reportBug);

  saveStateToStorage();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

// ==========================================
// 3. YARDIMCI & HAFIZA FONKSİYONLARI
// ==========================================

function clearAppCache() {
  localStorage.clear();
  alert("Uygulama önbelleği başarıyla temizlendi.");
  location.reload();
}

function reportBug() {
  alert("Hata bildirim formu açılıyor... Teşkilat yönetimine iletilecektir.");
}

function saveStateToStorage() {
  localStorage.setItem("tnt_app_state", JSON.stringify(appState));
}

function loadSavedSettings() {
  const saved = localStorage.getItem("tnt_app_state");
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(appState, parsed);
  }

  // Yüklenen verileri ekrana bas
  document.getElementById("profName").innerText = appState.user.name;
  document.getElementById("profUsername").innerText = appState.user.username;
  document.getElementById("valAboutText").innerText = appState.user.about;
  
  if (appState.settings.darkMode) {
    document.getElementById("darkModeToggle").checked = true;
    toggleDarkMode(true);
  }
  
  if (appState.settings.language) {
    document.getElementById("languageSelect").value = appState.settings.language;
    changeLanguage(appState.settings.language);
  }
}
  
