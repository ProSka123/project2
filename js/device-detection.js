// Улучшенная функция определения устройства
function detectDevice() {
    try {
        // Проверяем как по User Agent, так и по ширине экрана
        const isMobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isMobileByWidth = window.innerWidth < 768;
        const isMobile = isMobileByUA || isMobileByWidth;

        // Добавляем класс к body для CSS-стилизации
        if (document.body) {
            document.body.classList.toggle('mobile-device', isMobile);
            document.body.classList.toggle('desktop-device', !isMobile);
        }

        console.log('Устройство определено как:', isMobile ? 'мобильное' : 'десктоп');

        return isMobile;
    } catch (error) {
        console.error('Error in detectDevice:', error);
        return false; // Возвращаем false как безопасное значение по умолчанию
    }
}

// Экспортируем функцию для использования в других скриптах
window.detectDevice = detectDevice;

// Функция для адаптации интерфейса
function adaptInterface() {
    try {
        const isMobile = detectDevice();

        if (isMobile) {
            // Адаптация hero секции
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.backgroundImage = 'none';
                heroSection.style.backgroundColor = '#696969';

                // Убираем затемнение
                const overlay = heroSection.querySelector('.hero-overlay');
                if (overlay) overlay.style.backgroundColor = 'transparent';

                // Смещаем контент выше
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) heroContent.style.paddingTop = '15%';
            }

            // Адаптация кнопок
            const buttons = document.querySelectorAll('.primary-button');
            buttons.forEach(button => {
                if (button) {
                    button.style.width = '100%';
                    button.style.maxWidth = '280px';
                    button.style.padding = '12px 24px';
                    button.style.fontSize = '1rem';
                }
            });

            // Адаптация статистики
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                if (item) {
                    item.style.backgroundColor = 'white';
                    item.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }
            });

            // Настройка ссылок для мобильной версии
            const reviewsLink = document.querySelector('.reviews-link');
            if (reviewsLink) {
                reviewsLink.setAttribute('href', 'reviews.html');
            }
        }
    } catch (error) {
        console.error('Error in adaptInterface:', error);
    }
}

// Функция debounce для оптимизации обработчика resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    try {
        adaptInterface();

        // Обработчик изменения размера окна с debounce
        const debouncedAdaptInterface = debounce(adaptInterface, 250);
        window.addEventListener('resize', debouncedAdaptInterface);

        console.log('Device detection initialized successfully');
    } catch (error) {
        console.error('Error initializing device detection:', error);
    }
});
