// Скрипт для мобильной версии сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация слайдера услуг
    initServicesSlider();
    
    // Плавная прокрутка для якорных ссылок
    initSmoothScroll();
});

// Инициализация мобильного меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuToggle || !mobileMenu || !menuOverlay) return;
    
    // Обработчик клика по кнопке меню
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Обработчик клика по оверлею
    menuOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Обработчик клика по ссылкам меню
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Инициализация слайдера услуг
function initServicesSlider() {
    const track = document.querySelector('.services-track');
    const cards = document.querySelectorAll('.service-card');
    const indicators = document.querySelectorAll('.slider-indicator');
    
    if (!track || !cards.length) return;
    
    let currentIndex = 0;
    let startX, moveX;
    
    // Обновление индикаторов
    function updateIndicators() {
        if (!indicators.length) return;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Обработчик события прокрутки
    track.addEventListener('scroll', function() {
        if (!cards.length || !track) return;
        
        const scrollPosition = track.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 20; // Ширина карточки + отступ
        currentIndex = Math.round(scrollPosition / cardWidth);
        
        if (currentIndex >= cards.length) {
            currentIndex = cards.length - 1;
        }
        
        updateIndicators();
    });
    
    // Обработчики для свайпа
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!startX) return;
        moveX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', function() {
        if (!startX || !moveX) return;
        
        const diff = startX - moveX;
        const threshold = 50; // Минимальное расстояние для свайпа
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Свайп влево - следующая карточка
                currentIndex = Math.min(currentIndex + 1, cards.length - 1);
            } else {
                // Свайп вправо - предыдущая карточка
                currentIndex = Math.max(currentIndex - 1, 0);
            }
            
            const scrollPosition = currentIndex * (cards[0].offsetWidth + 20);
            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        startX = null;
        moveX = null;
    });
    
    // Клик по индикаторам
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                const scrollPosition = currentIndex * (cards[0].offsetWidth + 20);
                
                track.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                
                updateIndicators();
            });
        });
    }
    
    // Инициализация
    updateIndicators();
}

// Плавная прокрутка для якорных ссылок
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}