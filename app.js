document.addEventListener('DOMContentLoaded', () => {
    // Menü Kontrolleri
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerMenu = document.getElementById('drawerMenu');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    hamburgerBtn.addEventListener('click', () => {
        drawerMenu.classList.add('active');
    });

    closeDrawerBtn.addEventListener('click', () => {
        drawerMenu.classList.remove('active');
    });

    // Modal Kontrolleri
    const modal = document.getElementById('authModal');
    const openLogin = document.getElementById('openLoginBtn');
    const openRegister = document.getElementById('openRegisterBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    openLogin.addEventListener('click', () => { modal.style.display = 'flex'; });
    openRegister.addEventListener('click', () => { modal.style.display = 'flex'; });
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

    // Dışarı tıklayınca kapat
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});
