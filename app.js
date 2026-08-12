// 1. Mobil Yan Menü Kontrolü
const hamburgerBtn = document.getElementById('hamburgerBtn');
const drawerMenu = document.getElementById('drawerMenu');

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        drawerMenu.classList.toggle('active');
    });
}

// 2. Giriş/Kayıt Modal (Pop-up) Kontrolü
const modal = document.getElementById('authModal');
const loginBtn = document.getElementById('openLoginBtn');
const registerBtn = document.getElementById('openRegisterBtn');
const closeBtn = document.getElementById('closeModalBtn');

// Butonlara basıldığında modalı göster
if (loginBtn) {
    loginBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
}
if (registerBtn) {
    registerBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
}

// Kapatma butonuna basıldığında gizle
if (closeBtn) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
}

// Modalın dışındaki siyah alana tıklanırsa kapat
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 3. İstatistik Sayaçlarını Başlatma
// İleride Firebase ile burayı canlı veriye bağlayabilirsin
document.addEventListener('DOMContentLoaded', () => {
    const membersSpan = document.getElementById('stat-members');
    const leadersSpan = document.getElementById('stat-leaders');
    
    if (membersSpan) membersSpan.innerText = '0';
    if (leadersSpan) leadersSpan.innerText = '0';
});
