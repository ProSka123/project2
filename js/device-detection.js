// Определение устройства и адаптация фона для мобильных
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация определения устройства и адаптации фона');
    
    // Функция определения мобильного устройства
    function isMobileDevice() {
        // Проверка по User Agent
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileByUA = mobileRegex.test(navigator.userAgent);
        
        // Проверка по ширине экрана
        const isMobileByWidth = window.innerWidth < 768;
        
        // Считаем устройство мобильным, если хотя бы один из критериев выполняется
        return isMobileByUA || isMobileByWidth;
    }
    
    // Функция адаптации фона hero секции
    function adaptHeroBackground() {
        const isMobile = isMobileDevice();
        console.log('Устройство определено как:', isMobile ? 'мобильное' : 'десктоп');
        
        // Получаем hero секцию
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) {
            console.error('Hero секция не найдена');
            return;
        }
        
        if (isMobile) {
            console.log('Применяем мобильные стили для hero секции');
            
            // Добавляем класс для мобильных устройств
            document.body.classList.add('mobile-device');
            
            // Заменяем фоновое изображение на серый фон
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = '#f5f5f5';
            
            // Адаптируем текст для лучшей видимости на сером фоне
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                // Меняем цвет текста на темный для лучшей читаемости
                heroContent.style.color = '#333333';
                
                // Находим и адаптируем заголовок и параграф
                const heading = heroContent.querySelector('h1');
                const paragraph = heroContent.querySelector('p');
                
                if (heading) {
                    heading.style.color = '#333333';
                    heading.style.textShadow = 'none';
                }
                
                if (paragraph) {
                    paragraph.style.color = '#333333';
                    paragraph.style.textShadow = 'none';
                }
            }
            
            // Убираем затемнение, если оно есть
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) {
                overlay.style.backgroundColor = 'transparent';
            }
            
            // Адаптируем стрелку прокрутки вниз
            const scrollDown = heroSection.querySelector('.scroll-down a');
            if (scrollDown) {
                scrollDown.style.color = '#333333';
            }
        } else {
            console.log('Применяем десктопные стили для hero секции');
            
            // Удаляем класс для мобильных устройств
            document.body.classList.remove('mobile-device');
            
            // Восстанавливаем оригинальные стили
            heroSection.style.backgroundImage = '';
            heroSection.style.backgroundColor = '';
            
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.color = '';
                
                const heading = heroContent.querySelector('h1');
                const paragraph = heroContent.querySelector('p');
                
                if (heading) {
                    heading.style.color = '';
                    heading.style.textShadow = '';
                }
                
                if (paragraph) {
                    paragraph.style.color = '';
                    paragraph.style.textShadow = '';
                }
            }
            
            // Восстанавливаем затемнение
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) {
                overlay.style.backgroundColor = '';
            }
            
            // Восстанавливаем стрелку прокрутки вниз
            const scrollDown = heroSection.querySelector('.scroll-down a');
            if (scrollDown) {
                scrollDown.style.color = '';
            }
        }
    }
    
    // Вызываем функцию при загрузке страницы
    adaptHeroBackground();
    
    // Вызываем функцию при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации производительности
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adaptHeroBackground, 250);
    });
    
    console.log('Инициализация определения устройства завершена');
});