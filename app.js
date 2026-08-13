// ==========================================
// 1. VERİ YAPILARI VE 25 ROL TANIMI
// ==========================================
const ROLES_LIST = [
  // A. Yönetim ve Liderlik
  "Kurucu (Founder)", "Genel Başkan", "Genel Başkan Yardımcısı", "Teşkilat Başkanı", "Genel Sekreter", "Başdanışman",
  // B. Bölge ve Saha
  "Bölge Başkanı", "İl Başkanı", "İlçe Başkanı", "Saha Sorumlusu", "Saha Üyesi",
  // C. Moderasyon ve Güvenlik
  "Baş Moderatör", "Forum Moderatörü", "Sohbet Moderatörü", "Siber Güvenlik Sorumlusu", "Denetmen",
  // D. İletişim, Medya ve Teknik
  "Basın ve Medya Sorumlusu", "Grafik & Tasarım Sorumlusu", "Yazılım ve Teknik Ekip", "Sosyal Medya Yöneticisi",
  // E. Üyelik ve Özel Rozetler
  "Kıdemli Üye", "Onursal Üye", "Doğrulanmış Üye", "Saha Gönüllüsü", "Aday / Misafir Üye"
];

// DİL DESTEĞİ VERİ TABANI (FRANSIZCA DAHİL)
const i18n = {
  tr: { home: "Ana Sayfa", profile: "Profil", announcements: "Duyurular" },
  en: { home: "Home", profile: "Profile", announcements: "Announcements" },
  fr: { home: "Accueil", profile: "Profil", announcements: "Annonces" }
};

// ÖRNEK GİRİŞ YAPAN KULLANICI (Siz - Kurucu)
let currentUser = {
  id: 1,
  username: "kurucu_admin",
  displayName: "Teşkilat Kurucusu",
  status: "dnd",
  isFounder: true, // Sadece siz Kurucusunuz
  roles: ["Kurucu (Founder)", "Yazılım ve Teknik Ekip"],
  titles: ["🎖️ Saha Kahramanı", "⭐ Teşkilat Çınarı"],
  specialPermissions: {
    canAccessAdminTab: true,
    canPostAnnouncement: true,
    canPostSocialMedia: true
  }
};

// ÖRNEK SİTE ÜYELERİ (Arama Çubuğu İçin)
let allUsers = [
  currentUser,
  {
    id: 2,
    username: "ahmet_saha",
    displayName: "Ahmet Yılmaz",
    status: "online",
    isFounder: false,
    roles: ["Saha Üyesi"],
    titles: ["Saha Gönüllüsü"],
    specialPermissions: { canAccessAdminTab: false, canPostAnnouncement: false, canPostSocialMedia: false }
  }
];

let selectedUserForAdmin = null; // Yönetim için seçilen üye

// ==========================================
// 2. İLK YÜKLEME VE BİREYSEL YETKİ KONTROLÜ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  applySpecialPermissionsUI();
  populateRoleDropdown();
  loadUserProfile(currentUser);
}

// Bireysel Özel Yetkileri Kontrol Et ve Menüleri Aç/Kapat
function applySpecialPermissionsUI() {
  const specialBlock = document.getElementById("specialAccessMenu");
  const btnPost = document.getElementById("menuPostBtn");
  const btnAdmin = document.getElementById("menuAdminBtn");

  const perms = currentUser.specialPermissions;

  if (perms.canAccessAdminTab || perms.canPostAnnouncement || perms.canPostSocialMedia) {
    specialBlock.style.display = "block";
    btnPost.style.display = (perms.canPostAnnouncement || perms.canPostSocialMedia) ? "block" : "none";
    btnAdmin.style.display = perms.canAccessAdminTab ? "block" : "none";
  } else {
    specialBlock.style.display = "none";
  }

  // Kurucu Butonunu Profilde Göster
  if (currentUser.isFounder) {
    document.getElementById("founderAdminControls").style.display = "block";
  }
}

// ==========================================
// 3. PROFILE ROL VE DURUM YÖNETİMİ
// ==========================================
function loadUserProfile(user) {
  document.getElementById("profileDisplayName").innerText = user.displayName;
  document.getElementById("profileUsername").innerText = "@" + user.username;
  document.getElementById("userStatusSelect").value = user.status;

  const rolesContainer = document.getElementById("profileRolesList");
  rolesContainer.innerHTML = "";

  // 1. Atanmış Rolleri Rozet Olarak Bas
  user.roles.forEach(role => {
    const badge = document.createElement("span");
    badge.className = "role-badge";
    badge.innerText = role;
    rolesContainer.appendChild(badge);
  });

  // 2. Ek Unvanları Bas
  user.titles.forEach(title => {
    const badge = document.createElement("span");
    badge.className = "title-badge";
    badge.innerText = title;
    rolesContainer.appendChild(badge);
  });
}

function changeUserStatus(newStatus) {
  currentUser.status = newStatus;
  alert("Durumunuz güncellendi: " + newStatus);
}

// ==========================================
// 4. HIZLI ÜYE ARAMA VE YÖNETİM (SAĞ MENÜ)
// ==========================================
function searchUsers(query) {
  const resultsDropdown = document.getElementById("searchResults");
  resultsDropdown.innerHTML = "";

  if (!query.trim()) return;

  const filtered = allUsers.filter(u => 
    u.username.toLowerCase().includes(query.toLowerCase()) || 
    u.displayName.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach(u => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.innerText = `${u.displayName} (@${u.username})`;
    item.onclick = () => selectUserFromSearch(u);
    resultsDropdown.appendChild(item);
  });
}

function selectUserFromSearch(user) {
  selectedUserForAdmin = user;
  document.getElementById("searchResults").innerHTML = "";
  showSection("profile");
  loadUserProfile(user);

  // Eğer Kurucu bakıyorsa yetki verme paneli açılır
  if (currentUser.isFounder) {
    document.getElementById("founderAdminControls").style.display = "block";
  }
}

// ==========================================
// 5. BİREYSEL YETKİ VE ROL ATAMA MODALI
// ==========================================
function populateRoleDropdown() {
  const select = document.getElementById("roleAssignSelect");
  select.innerHTML = "";
  ROLES_LIST.forEach(role => {
    const opt = document.createElement("option");
    opt.value = role;
    opt.innerText = role;
    select.appendChild(opt);
  });
}

function openPermissionModal() {
  const target = selectedUserForAdmin || currentUser;
  document.getElementById("targetUserLabel").innerText = "Hedef Üye: " + target.displayName;
  
  // Checkbox durumlarını yükle
  document.getElementById("permAdminTab").checked = target.specialPermissions.canAccessAdminTab;
  document.getElementById("permAnnounce").checked = target.specialPermissions.canPostAnnouncement;
  document.getElementById("permSocial").checked = target.specialPermissions.canPostSocialMedia;

  document.getElementById("permissionModal").style.display = "flex";
}

function closePermissionModal() {
  document.getElementById("permissionModal").style.display = "none";
}

function assignSelectedRole() {
  const target = selectedUserForAdmin || currentUser;
  const selectedRole = document.getElementById("roleAssignSelect").value;

  if (!target.roles.includes(selectedRole)) {
    target.roles.push(selectedRole);
    alert(`${target.displayName} kişisine "${selectedRole}" rolü atandı!`);
    loadUserProfile(target);
  } else {
    alert("Bu rol zaten üyeye atanmış.");
  }
}

function saveIndividualPermissions() {
  const target = selectedUserForAdmin || currentUser;
  
  target.specialPermissions.canAccessAdminTab = document.getElementById("permAdminTab").checked;
  target.specialPermissions.canPostAnnouncement = document.getElementById("permAnnounce").checked;
  target.specialPermissions.canPostSocialMedia = document.getElementById("permSocial").checked;

  alert(`${target.displayName} için özel izinler başarıyla kaydedildi!`);
  closePermissionModal();
  applySpecialPermissionsUI();
}

// ==========================================
// 6. ÖZEL PAYLAŞIM VE İÇERİK YAYINLAMA
// ==========================================
function openPostModal() {
  document.getElementById("postModal").style.display = "flex";
}

function closePostModal() {
  document.getElementById("postModal").style.display = "none";
}

function submitPost() {
  const type = document.getElementById("postTypeSelect").value;
  const content = document.getElementById("postContentInput").value;

  if (!content.trim()) return alert("Lütfen içerik yazın!");

  if (type === "announcement") {
    if (!currentUser.specialPermissions.canPostAnnouncement) {
      return alert("Ana Sayfada Duyuru Yapma Özel İzniniz Yok!");
    }
    const container = document.getElementById("homeAnnouncementsList");
    container.innerHTML = `<div class="card"><p>${content}</p><small>Paylaşan: ${currentUser.displayName}</small></div>` + container.innerHTML;
    alert("Duyuru Ana Sayfada Yayınlandı!");
  } else if (type === "social") {
    if (!currentUser.specialPermissions.canPostSocialMedia) {
      return alert("Sosyal Medyada Paylaşım Yapma Özel İzniniz Yok!");
    }
    const container = document.getElementById("socialFeedList");
    container.innerHTML = `<div class="card"><p>${content}</p><small>Paylaşan: ${currentUser.displayName}</small></div>` + container.innerHTML;
    alert("Gönderi Sosyal Medya Akışında Yayınlandı!");
  }

  document.getElementById("postContentInput").value = "";
  closePostModal();
}

// ==========================================
// 7. GENEL SAYFA VE MENÜ NAVİGASYONU
// ==========================================
function showSection(sectionId) {
  const sections = ["homeSection", "profileSection", "socialMediaSection", "adminPanelSection"];
  sections.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = "none";
  });

  if (sectionId === "home") document.getElementById("homeSection").style.display = "block";
  if (sectionId === "profile") document.getElementById("profileSection").style.display = "block";
  if (sectionId === "socialMedia") document.getElementById("socialMediaSection").style.display = "block";
  if (sectionId === "adminPanel") document.getElementById("adminPanelSection").style.display = "block";
}

function filterByRegion(regionName) {
  alert(regionName + " Bölgesi Temsilcilik Sayfası Yükleniyor...");
}

function toggleLeftMenu() {
  const sb = document.getElementById("leftSidebar");
  sb.classList.toggle("active");
    }
                         
