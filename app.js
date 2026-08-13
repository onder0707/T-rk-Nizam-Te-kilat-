/* ==========================================
   TÜRK NİZAM TEŞKİLATI - UYGULAMA MANTIĞI (APP.JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE (DURUM METİNLERİ VE VERİLER) ---
  const state = {
    activePage: 'page-home',
    isDarkMode: true,
    fontSize: 'normal',
    language: 'tr',
    user: {
      name: 'Önder',
      handle: '@kullanici_adi',
      about: 'Deneme'
    },
    posts: []
  };

  // --- DOM ELEMANLARI ---
  const navItems = document.querySelectorAll('.nav-item');
  const pageSections = document.querySelectorAll('.page-section');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');
  const brandLink = document.getElementById('brand-link');
  const menuTuzukLink = document.getElementById('menu-tuzuk-link');

  // Profil & Ayarlar DOM
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const fontSizeSelect = document.getElementById('font-size-select');
  const languageSelect = document.getElementById('language-select');
  const accordionBtn = document.getElementById('settings-accordion-btn');
  const accordionBody = document.getElementById('settings-accordion-body');
  const editNameBtn = document.getElementById('edit-name-btn');
  const displayName = document.getElementById('display-name');
  const editAboutBtn = document.getElementById('edit-about-btn');
  const aboutText = document.getElementById('about-text');

  // --- SAYFA GEÇİŞ YÖNETİMİ (SPA) ---
  function navigateTo(targetId) {
    pageSections.forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      state.activePage = targetId;
      window.scrollTo(0, 0);
    }

    // Alt navigasyonu güncelle
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Menü açıksa kapat
    closeSideMenu();
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      navigateTo(target);
    });
  });

  brandLink.addEventListener('click', () => navigateTo('page-home'));
  
  if (menuTuzukLink) {
    menuTuzukLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('page-tuzuk');
    });
  }

  // --- YAN MENÜ YÖNETİMİ ---
  function openSideMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
  }

  function closeSideMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }

  if (menuToggle) menuToggle.addEventListener('click', openSideMenu);
  if (menuClose) menuClose.addEventListener('click', closeSideMenu);
  if (overlay) overlay.addEventListener('click', closeSideMenu);

  // --- AKORDİYON AYARLARI ---
  if (accordionBtn) {
    accordionBtn.addEventListener('click', () => {
      accordionBody.classList.toggle('active');
      const icon = accordionBtn.querySelector('.accordion-icon');
      if (icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      }
    });
  }

  // --- KARANLIK / AYDINLIK MOD ---
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
      state.isDarkMode = e.target.checked;
      if (state.isDarkMode) {
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
      }
    });
  }

  // --- METİN BOYUTU SEÇİMİ ---
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      const size = e.target.value;
      document.body.classList.remove('font-small', 'font-normal', 'font-large');
      document.body.classList.add(`font-${size}`);
      state.fontSize = size;
    });
  }

  // --- İSİM VE HAKKIMDA DÜZENLEME ---
  if (editNameBtn) {
    editNameBtn.addEventListener('click', () => {
      const newName = prompt('Yeni adınızı giriniz:', state.user.name);
      if (newName && newName.trim() !== '') {
        state.user.name = newName.trim();
        displayName.textContent = state.user.name;
      }
    });
  }

  if (editAboutBtn) {
    editAboutBtn.addEventListener('click', () => {
      const newAbout = prompt('Hakkımda metnini giriniz:', state.user.about);
      if (newAbout !== null) {
        state.user.about = newAbout.trim();
        aboutText.textContent = state.user.about || 'Henüz bir bilgi eklenmedi.';
      }
    });
    }
                            // --- GÖRSEL YÜKLEME VE ÖNİZLEME İŞLEMLERİ ---
  const attachImgBtn = document.getElementById('attach-img-btn');
  const postImageInput = document.getElementById('post-image-input');
  const imagePreviewContainer = document.getElementById('image-preview-container');
  const imagePreviewEl = document.getElementById('image-preview-el');
  const removeImgBtn = document.getElementById('remove-img-btn');

  let selectedPostImage = null;

  if (attachImgBtn && postImageInput) {
    attachImgBtn.addEventListener('click', () => postImageInput.click());

    postImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          selectedPostImage = event.target.result;
          imagePreviewEl.src = selectedPostImage;
          imagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', () => {
      selectedPostImage = null;
      postImageInput.value = '';
      imagePreviewEl.src = '';
      imagePreviewContainer.style.display = 'none';
    });
  }

  // Profil Banner ve Avatar Yükleme Dinleyicileri
  const triggerBannerBtn = document.getElementById('trigger-banner-btn');
  const bannerFileInput = document.getElementById('banner-file-input');
  const profileBannerEl = document.getElementById('profile-banner-el');

  if (triggerBannerBtn && bannerFileInput) {
    triggerBannerBtn.addEventListener('click', () => bannerFileInput.click());
    bannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          profileBannerEl.style.backgroundImage = `url('${ev.target.result}')`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const triggerAvatarBtn = document.getElementById('trigger-avatar-btn');
  const avatarFileInput = document.getElementById('avatar-file-input');
  const avatarImgEl = document.getElementById('avatar-img-el');

  if (triggerAvatarBtn && avatarFileInput) {
    triggerAvatarBtn.addEventListener('click', () => avatarFileInput.click());
    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          avatarImgEl.innerHTML = `<img src="${ev.target.result}" alt="Avatar">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // --- FORUM GÖNDERİ PAYLAŞMA MANTIĞI ---
  const submitPostBtn = document.getElementById('submit-post-btn');
  const postInput = document.getElementById('post-input');
  const postCategorySelect = document.getElementById('post-category-select');
  const postsContainer = document.getElementById('posts-container');

  if (submitPostBtn) {
    submitPostBtn.addEventListener('click', () => {
      const text = postInput.value.trim();
      const category = postCategorySelect.value;
      const type = document.querySelector('input[name="postType"]:checked')?.value || 'post';

      if (!text && !selectedPostImage) {
        alert('Lütfen bir metin yazın veya görsel ekleyin.');
        return;
      }

      const newPost = {
        id: Date.now(),
        author: state.user.name,
        handle: state.user.handle,
        text: text,
        category: category,
        type: type,
        image: selectedPostImage,
        date: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        comments: []
      };

      state.posts.unshift(newPost);
      renderPosts();

      // Form alanlarını sıfırla
      postInput.value = '';
      if (removeImgBtn) removeImgBtn.click();
    });
  }

  // Gönderileri Ekrana Çizme (Render)
  function renderPosts(filterCategory = 'all') {
    if (!postsContainer) return;

    let filteredPosts = state.posts;
    if (filterCategory !== 'all') {
      filteredPosts = state.posts.filter(p => p.category === filterCategory);
    }

    if (filteredPosts.length === 0) {
      postsContainer.innerHTML = `
        <div class="card" style="text-align: center; color: var(--text-muted); padding: 20px;">
          <i class="fa-solid fa-inbox" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
          Henüz hiç gönderi paylaşılmamış.
        </div>
      `;
      return;
    }

    postsContainer.innerHTML = filteredPosts.map(post => `
      <div class="card post-card" data-id="${post.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong>${post.author}</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${post.handle}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${post.date}</span>
        </div>
        <div style="margin-bottom: 10px; font-size: 0.9rem; line-height: 1.5;">${post.text}</div>
        ${post.image ? `<div style="margin-bottom: 10px; border-radius: 8px; overflow: hidden; max-height: 300px;"><img src="${post.image}" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>` : ''}
        <div style="display: flex; gap: 15px; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--card-border); padding-top: 10px; margin-top: 8px;">
          <span><i class="fa-regular fa-heart"></i> ${post.likes}</span>
          <span><i class="fa-regular fa-comment"></i> ${post.comments.length}</span>
          <span style="margin-left: auto; text-transform: uppercase; font-size: 0.7rem; background: var(--card-border); padding: 2px 6px; border-radius: 4px; color: var(--text-main);">${post.category}</span>
        </div>
      </div>
    `).join('');
  }

  // Kategori Filtre Butonları
  const catChips = document.querySelectorAll('.cat-chip');
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-cat');
      renderPosts(cat);
    });
  });

  // Başlangıçta Gönderileri Yükle
  renderPosts();
});
        
