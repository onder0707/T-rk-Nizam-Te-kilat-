document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA SAYFA GEÇİŞ MİMARİSİ ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

    function switchPage(targetId) {
        // Tüm sayfaları gizle
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        // Hedef sayfayı göster
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Alt navigasyondaki aktiflik göstergesini güncelle
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${targetId}`) {
                item.classList.add('active');
            }
        });

        // Sayfa değiştiğinde en üste kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Navigasyon tıklamalarını dinle
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                switchPage(targetId);
                closeDrawer(); // Eğer mobil menü açıksa kapat
            }
        });
    });

    // --- 2. MOBİL YAN MENÜ (DRAWER) ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerMenu = document.getElementById('drawerMenu');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    function openDrawer() {
        drawerMenu.classList.add('active');
        drawerOverlay.classList.add('active');
    }

    function closeDrawer() {
        drawerMenu.classList.remove('active');
        drawerOverlay.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // --- 3. MODAL KONTROLLERİ ---
    const authModal = document.getElementById('authModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (openLoginBtn) openLoginBtn.addEventListener('click', () => authModal.style.display = 'flex');
    if (openRegisterBtn) openRegisterBtn.addEventListener('click', () => authModal.style.display = 'flex');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => authModal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.style.display = 'none';
    });

    // --- 4. PROFİL İŞLEVLERİ (DISCORD TARZI) ---
    const statusSelect = document.getElementById('statusSelect');
    const statusDot = document.getElementById('statusDot');
    const lastActiveText = document.getElementById('lastActiveText');

    // Durum Değişimi
    if (statusSelect) {
        statusSelect.addEventListener('change', (e) => {
            const status = e.target.value;
            statusDot.className = 'status-dot'; // sınıfları sıfırla

            if (status === 'online') {
                statusDot.classList.add('status-online');
                lastActiveText.textContent = 'Şimdi aktif';
            } else if (status === 'dnd') {
                statusDot.classList.add('status-dnd');
                lastActiveText.textContent = 'Rahatsız Etmeyin';
            } else if (status === 'idle') {
                statusDot.classList.add('status-idle');
                lastActiveText.textContent = 'Dışarıda';
            } else if (status === 'invisible') {
                statusDot.classList.add('status-invisible');
                lastActiveText.textContent = 'Çevrimdışı görünüyor';
            }
        });
    }

    // Profil Fotoğrafı ve GIF Değiştirme Önizlemesi
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatarPreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Afiş (Banner) Değiştirme Önizlemesi
    const bannerInput = document.getElementById('bannerInput');
    const bannerPreview = document.getElementById('bannerPreview');

    if (bannerInput) {
        bannerInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    bannerPreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Bio / Açıklama Düzenleme
    const editBioBtn = document.getElementById('editBioBtn');
    const saveBioBtn = document.getElementById('saveBioBtn');
    const bioDisplay = document.getElementById('bioDisplay');
    const bioEditArea = document.getElementById('bioEditArea');
    const bioInput = document.getElementById('bioInput');

    if (editBioBtn) {
        editBioBtn.addEventListener('click', () => {
            bioInput.value = bioDisplay.textContent;
            bioEditArea.style.display = 'block';
            bioDisplay.style.display = 'none';
        });
    }

    if (saveBioBtn) {
        saveBioBtn.addEventListener('click', () => {
            if (bioInput.value.trim() !== '') {
                bioDisplay.textContent = bioInput.value;
            }
            bioEditArea.style.display = 'none';
            bioDisplay.style.display = 'block';
        });
    }
});
            
