// ==========================================
// UYGULAMA ANA BAŞLATICI VE DÜZENLEYİCİ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  console.log("Türk Nizam Teşkilatı SPA Başlatıldı.");
  
  // Kayıtlı Ayarları Yükle
  loadSavedSettings();
}

// SEKMELER ARASI GEÇİŞ (SPA)
function showTab(tabName) {
  const tabs = ["home", "forum", "chat", "profile"];
  
  tabs.forEach(t => {
    const page = document.getElementById("tab-" + t);
    const navBtn = document.getElementById("nav" + capitalize(t));
    
    if (page) page.style.display = "none";
    if (navBtn) navBtn.classList.remove("active");
  });

  const targetPage = document.getElementById("tab-" + tabName);
  const targetNav = document.getElementById("nav" + capitalize(tabName));

  if (targetPage) targetPage.style.display = "block";
  if (targetNav) targetNav.classList.add("active");

  // Yan menü açıksa kapat
  closeRightSidebar();
}

// SAĞ MENÜ (3 ÇİZGİ) AÇ / KAPAT
function toggleRightSidebar() {
  const sidebar = document.getElementById("sidebarRight");
  if (sidebar) sidebar.classList.toggle("active");
}

function closeRightSidebar() {
  const sidebar = document.getElementById("sidebarRight");
  if (sidebar) sidebar.classList.remove("active");
}

// AKORDİYON (AYARLAR VE TEKNİK BİLGİLER)
function toggleAccordion(id) {
  const body = document.getElementById(id);
  const arrow = document.getElementById("accordionArrow");
  
  if (body) {
    if (body.style.display === "none" || body.style.display === "") {
      body.style.display = "block";
      if (arrow) arrow.style.transform = "rotate(90deg)";
    } else {
      body.style.display = "none";
      if (arrow) arrow.style.transform = "rotate(0deg)";
    }
  }
}

// YARDIMCI UTILS
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function triggerFileInput(id) {
  const fileInput = document.getElementById(id);
  if (fileInput) fileInput.click();
}
