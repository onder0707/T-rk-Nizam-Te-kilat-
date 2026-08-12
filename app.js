document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA SAYFA GEÇİŞ MİMARİSİ ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

    function switchPage(targetId) {
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${targetId}`) {
                item.classList.add('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                switchPage(targetId);
                closeDrawer();
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

    // --- 4. HAREKETLİ / VİDEO VE GÖRSEL YÜKLEME DESTEĞİ ---
    
    // Afiş (Banner) Yükleme (Resim veya Video)
    const bannerInput = document.getElementById('bannerInput');
    const bannerPreviewImg = document.getElementById('bannerPreviewImg');
    const bannerPreviewVideo = document.getElementById('bannerPreviewVideo');

    if (bannerInput) {
        bannerInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                if (file.type.startsWith('video/')) {
                    bannerPreviewImg.style.display = 'none';
                    bannerPreviewVideo.src = fileUrl;
                    bannerPreviewVideo.style.display = 'block';
                } else {
                    bannerPreviewVideo.style.display = 'none';
                    bannerPreviewImg.src = fileUrl;
                    bannerPreviewImg.style.display = 'block';
                }
            }
        });
    }

    // Profil Fotoğrafı Yükleme (Resim, GIF veya Video)
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreviewImg = document.getElementById('avatarPreviewImg');
    const avatarPreviewVideo = document.getElementById('avatarPreviewVideo');

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);
                if (file.type.startsWith('video/')) {
                    avatarPreviewImg.style.display = 'none';
                    avatarPreviewVideo.src = fileUrl;
                    avatarPreviewVideo.style.display = 'block';
                } else {
                    avatarPreviewVideo.style.display = 'none';
                    avatarPreviewImg.src = fileUrl;
                    avatarPreviewImg.style.display = 'block';
                }
            }
        });
    }

    // Hakkımda Düzenleme
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

    // --- 5. AYARLAR KONTROLLERİ VE TEKNİK BİLGİLER ---
    
    // Akordeon Aç / Kapat
    const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
    const settingsContent = document.getElementById('settingsContent');

    if (toggleSettingsBtn && settingsContent) {
        toggleSettingsBtn.addEventListener('click', () => {
            const isHidden = settingsContent.style.display === 'none';
            settingsContent.style.display = isHidden ? 'block' : 'none';
            toggleSettingsBtn.classList.toggle('active', isHidden);
        });
    }

    // Koyu Tema (Dark Mode) Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }

    // Yazı Boyutu Değişimi
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            document.body.classList.remove('font-small', 'font-large');
            if (e.target.value === 'small') {
                document.body.classList.add('font-small');
            } else if (e.target.value === 'large') {
                document.body.classList.add('font-large');
            }
        });
    }

    // Dil Seçici Desteği (Dinamik Etiket Değişimi)
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            const elements = document.querySelectorAll('[data-lang-tr]');
            elements.forEach(el => {
                if (lang === 'en') {
                    el.textContent = el.getAttribute('data-lang-en');
                } else {
                    el.textContent = el.getAttribute('data-lang-tr');
                }
            });
        });
    }

    // Önbellek Temizle
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            alert('Sistem önbelleği ve geçici veriler başarıyla temizlendi.');
        });
    }

    // Hata Bildir
    const reportIssueBtn = document.getElementById('reportIssueBtn');
    if (reportIssueBtn) {
        reportIssueBtn.addEventListener('click', () => {
            alert('Teknik destek talebiniz yöneticilere iletildi.');
        });
    }

});
                                                  
