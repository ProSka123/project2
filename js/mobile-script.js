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
    let isScrolling = false;
    let startX, startScrollLeft;
    
    // Обновление индикаторов
    function updateIndicators() {
        if (!indicators.length) return;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Плавная прокрутка к карточке
    function scrollToCard(index) {
        if (isScrolling || index < 0 || index >= cards.length) return;
        
        isScrolling = true;
        currentIndex = index;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 20; // Отступ между карточками
        const scrollPosition = index * (cardWidth + gap);
        
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateIndicators();
        
        // Сброс флага после завершения анимации
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
    
    // Обработчик события прокрутки
    track.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        const scrollPosition = track.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const cardFullWidth = cardWidth + gap;
        
        // Определяем текущую карточку на основе позиции прокрутки
        const newIndex = Math.round(scrollPosition / cardFullWidth);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
            currentIndex = newIndex;
            updateIndicators();
        }
    });
    
    // Обработчики для свайпа
    track.addEventListener('touchstart', function(e) {
        if (isScrolling) return;
        
        startX = e.touches[0].clientX;
        startScrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!startX || isScrolling) return;
        
        e.preventDefault();
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        // Плавная прокрутка во время свайпа
        track.scrollLeft = startScrollLeft + diff;
    });
    
    track.addEventListener('touchend', function(e) {
        if (!startX || isScrolling) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // Минимальное расстояние для свайпа
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Свайп влево - следующая карточка
                scrollToCard(Math.min(currentIndex + 1, cards.length - 1));
            } else {
                // Свайп вправо - предыдущая карточка
                scrollToCard(Math.max(currentIndex - 1, 0));
            }
        } else {
            // Возвращаемся к текущей карточке если свайп был недостаточным
            scrollToCard(currentIndex);
        }
        
        startX = null;
        startScrollLeft = null;
    });
    
    // Клик по индикаторам
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                scrollToCard(index);
            });
        });
    }
    
    // Автоматическое выравнивание при загрузке
    setTimeout(() => {
        scrollToCard(0);
    }, 100);
    
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