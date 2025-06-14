// Определение устройства и адаптация интерфейса
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация адаптивного дизайна');
    
    // Функция определения мобильного устройства
    function detectDevice() {
        const isMobile = window.innerWidth < 768;
        console.log('Определение устройства: ' + (isMobile ? 'мобильное' : 'десктоп'), 'Ширина экрана:', window.innerWidth);
        return isMobile;
    }

    // Функция адаптации интерфейса
    function adaptInterface() {
        const isMobile = detectDevice();
        console.log('Устройство определено как:', isMobile ? 'мобильное' : 'десктоп');
        
        // Добавляем/удаляем класс для мобильных устройств
        document.body.classList.toggle('mobile-device', isMobile);
        
        // 1. Адаптация hero секции
        adaptHeroSection(isMobile);
        
        // 2. Адаптация стрелки прокрутки
        adaptScrollDown(isMobile);
        
        // 3. Адаптация раздела отзывов
        adaptReviewsSection(isMobile);
        
        // 4. Настройка поведения навигационной панели
        setupHeaderBehavior(isMobile);
    }
    
    // 1. Функция адаптации hero секции
    function adaptHeroSection() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Определяем тип устройства
        const isMobile = window.innerWidth < 768;
        
        // Применяем соответствующие стили
        if (isMobile) {
            // Мобильные стили
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = '#696969';
            
            // Убираем затемнение
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) overlay.style.backgroundColor = 'transparent';
            
            // Смещаем контент выше
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) heroContent.style.paddingTop = '10%';
        } else {
            // Десктопные стили
            heroSection.style.backgroundImage = "url('../images/hero-bg.jpg')";
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            
            // Восстанавливаем затемнение
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
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
});

// Вызываем функцию при загрузке и изменении размера окна
document.addEventListener('DOMContentLoaded', adaptHeroSection);
window.addEventListener('resize', adaptHeroSection);











