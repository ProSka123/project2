// Унифицированная функция определения устройства
function detectDevice() {
    // Проверяем как по User Agent, так и по ширине экрана
    const isMobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobileByWidth = window.innerWidth < 768;
    const isMobile = isMobileByUA || isMobileByWidth;
    
    // Добавляем класс к body для CSS-стилизации
    document.body.classList.toggle('mobile-device', isMobile);
    document.body.classList.toggle('desktop-device', !isMobile);
    
    console.log('Устройство определено как:', isMobile ? 'мобильное' : 'десктоп');
    
    return isMobile;
}

// Экспортируем функцию для использования в других скриптах
window.detectDevice = detectDevice;

// Функция адаптации интерфейса
function adaptInterface() {
    const isMobile = detectDevice();
    
    // Адаптация hero секции
    adaptHeroSection(isMobile);
    
    // Адаптация стрелки прокрутки
    adaptScrollDown(isMobile);
    
    // Настройка поведения навигационной панели
    setupHeaderBehavior(isMobile);
    
    // Оптимизация изображений
    optimizeImages(isMobile);
    
    // Настройка сенсорных событий для карусели отзывов
    setupTouchEvents(isMobile);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', adaptInterface);

// Обновление при изменении размера окна
window.addEventListener('resize', adaptInterface);

// 1. Функция адаптации hero секции
function adaptHeroSection() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Определяем тип устройства
    const isMobile = window.innerWidth < 768;
    
    // Применяем соответствующие стили только для мобильных
    if (isMobile) {
        // Мобильные стили
        heroSection.style.backgroundImage = 'none';
        heroSection.style.backgroundColor = '#696969';
        
        // Убираем затемнение
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) overlay.style.backgroundColor = 'transparent';
        
        // Настраиваем текст
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.paddingTop = '15%';
            
            // Настраиваем цвет текста
            const heading = heroContent.querySelector('h1');
            const paragraph = heroContent.querySelector('p');
            
            if (heading) heading.style.color = '#ffffff';
            if (paragraph) paragraph.style.color = '#ffffff';
        }
    }
}

// 2. Функция адаптации стрелки прокрутки
function adaptScrollDown(isMobile) {
    const scrollDown = document.querySelector('.scroll-down');
    
    if (!scrollDown) {
        console.error('Стрелка прокрутки не найдена');
        return;
    }
    
    if (isMobile) {
        console.log('Скрываем стрелку прокрутки на мобильных устройствах');
        scrollDown.style.display = 'none';
    } else {
        console.log('Показываем стрелку прокрутки на десктопе');
        scrollDown.style.display = '';
    }
}

// 3. Функция адаптации раздела отзывов - удалена

// Функция для исправления количества индикаторов в разделе отзывов - удалена

// 4. Настройка поведения навигационной панели
function setupHeaderBehavior(isMobile) {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (!header || !heroSection) {
        console.error('Не найдены необходимые элементы для настройки поведения шапки');
        return;
    }
    
    // Добавляем CSS для анимации
    if (!document.getElementById('header-animation-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'header-animation-styles';
        styleElement.textContent = `
            header {
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            .header-hidden {
                transform: translateY(-100%);
                opacity: 0;
            }
            .header-visible {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Скрываем шапку при загрузке страницы
    header.classList.add('header-hidden');
    
    // Функция обработки прокрутки
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Показываем/скрываем шапку в зависимости от позиции прокрутки
        if (scrollPosition > heroHeight * 0.7) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        } else {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
        }
    }
    
    // Удаляем существующий обработчик, если он есть
    window.removeEventListener('scroll', window.headerScrollHandler);
    
    // Добавляем новый обработчик
    window.headerScrollHandler = handleScroll;
    window.addEventListener('scroll', window.headerScrollHandler);
    
    // Вызываем обработчик сразу для установки начального состояния
    handleScroll();
}

// Инициализация свайпа для отзывов на мобильных устройствах - удалена

// Вызываем функцию адаптации при загрузке страницы
adaptInterface();

// Инициализируем свайп для отзывов
if (detectDevice()) {
    initReviewsSwipe();
}

// Вызываем функцию адаптации при изменении размера окна
window.addEventListener('resize', function() {
    adaptInterface();
    
    // Если устройство стало мобильным, инициализируем свайп
    if (detectDevice()) {
        initReviewsSwipe();
    }
});

console.log('Инициализация адаптивного дизайна завершена');

// Вызываем функцию при загрузке и изменении размера окна
document.addEventListener('DOMContentLoaded', adaptHeroSection);
window.addEventListener('resize', adaptHeroSection);

// Функция оптимизации изображений
function optimizeImages(isMobile) {
    document.querySelectorAll('img[data-src]').forEach(img => {
        if (isMobile && img.dataset.mobileSrc) {
            img.src = img.dataset.mobileSrc;
        } else {
            img.src = img.dataset.src;
        }
        
        // Добавляем атрибуты для оптимизации загрузки
        img.loading = 'lazy';
        
        // Добавляем размеры для предотвращения смещения макета
        if (img.dataset.width && img.dataset.height) {
            img.width = img.dataset.width;
            img.height = img.dataset.height;
        }
    });
}

// Настройка сенсорных событий для карусели
function setupTouchEvents(isMobile) {
    if (!isMobile) return;
    
    const carousels = document.querySelectorAll('.reviews-carousel');
    
    carousels.forEach(carousel => {
        let startX, moveX;
        let threshold = 100; // Минимальное расстояние для свайпа
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', () => {
            if (!startX || !moveX) return;
            
            const diff = startX - moveX;
            
            if (Math.abs(diff) > threshold) {
                // Свайп влево (следующий отзыв)
                if (diff > 0) {
                    const nextBtn = document.querySelector('.next-review');
                    if (nextBtn) nextBtn.click();
                }
                // Свайп вправо (предыдущий отзыв)
                else {
                    const prevBtn = document.querySelector('.prev-review');
                    if (prevBtn) prevBtn.click();
                }
            }
            
            // Сбрасываем значения
            startX = null;
            moveX = null;
        }, { passive: true });
    });
}

