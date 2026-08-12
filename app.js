// Sayfa yüklendiğinde çalışacak ana kodlar
document.addEventListener('DOMContentLoaded', () => {
  
  // DOM Elementlerini Seçme
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerMenu = document.getElementById('drawerMenu');

  // 1. Üç Çizgi Menüyü Açma / Kapama (Toggle)
  if (hamburgerBtn && drawerMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Tıklama olayının dışarı kaymasını engeller
      drawerMenu.classList.toggle('active');
    });

    // 2. Menü Dışında Bir Yere Tıklandığında Menüyü Otomatik Kapatma
    document.addEventListener('click', (e) => {
      if (!drawerMenu.contains(e.target) && e.target !== hamburgerBtn) {
        drawerMenu.classList.remove('active');
      }
    });

    // 3. Menü İçindeki Bir Linke Tıklandığında Menüyü Kapatma
    const drawerLinks = drawerMenu.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawerMenu.classList.remove('active');
      });
    });
  }

});
