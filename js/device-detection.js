// Определение устройства и адаптация интерфейса
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация адаптивного дизайна');
    
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
    
    // Функция адаптации интерфейса
    function adaptInterface() {
        const isMobile = isMobileDevice();
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
    function adaptHeroSection(isMobile) {
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) {
            console.error('Hero секция не найдена');
            return;
        }
        
        // Сохраняем оригинальный фон, если он еще не сохранен
        if (!heroSection.dataset.originalBg && heroSection.style.backgroundImage) {
            heroSection.dataset.originalBg = heroSection.style.backgroundImage;
            console.log('Сохранен оригинальный фон:', heroSection.dataset.originalBg);
        }
        
        if (isMobile) {
            console.log('Применяем мобильные стили для hero секции');
            
            // Заменяем фоновое изображение на темно-серый фон (#696969)
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = '#696969';
            
            // Адаптируем текст для лучшей видимости на темно-сером фоне
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                // Меняем цвет текста на светлый для лучшей читаемости на темном фоне
                heroContent.style.color = '#ffffff';
                
                // Находим и адаптируем заголовок и параграф
                const heading = heroContent.querySelector('h1');
                const paragraph = heroContent.querySelector('p');
                
                if (heading) {
                    heading.style.color = '#ffffff';
                    heading.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
                }
                
                if (paragraph) {
                    paragraph.style.color = '#f0f0f0';
                    paragraph.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
                }
            }
            
            // Убираем затемнение, если оно есть
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) {
                overlay.style.backgroundColor = 'transparent';
            }
        } else {
            console.log('Применяем десктопные стили для hero секции');
            
            // Восстанавливаем оригинальное фоновое изображение
            if (heroSection.dataset.originalBg) {
                heroSection.style.backgroundImage = heroSection.dataset.originalBg;
            } else {
                // Если оригинальный фон не был сохранен, используем значение из HTML
                heroSection.style.backgroundImage = 'url("images/hero-bg.jpg")';
            }
            
            // Убираем серый фон
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
    
    // 3. Функция адаптации раздела отзывов
    function adaptReviewsSection(isMobile) {
        const prevButton = document.querySelector('.prev-review');
        const nextButton = document.querySelector('.next-review');
        
        if (!prevButton || !nextButton) {
            console.log('Кнопки навигации отзывов не найдены');
            return;
        }
        
        if (isMobile) {
            console.log('Скрываем кнопки навигации отзывов на мобильных устройствах');
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            
            // Добавляем подсказку о свайпе
            const reviewsCarousel = document.querySelector('.reviews-carousel');
            if (reviewsCarousel && !reviewsCarousel.querySelector('.swipe-hint')) {
                const swipeHint = document.createElement('div');
                swipeHint.className = 'swipe-hint';
                swipeHint.textContent = '← Свайп →';
                swipeHint.style.textAlign = 'center';
                swipeHint.style.fontSize = '0.8rem';
                swipeHint.style.color = '#777';
                swipeHint.style.marginTop = '15px';
                swipeHint.style.opacity = '0.7';
                reviewsCarousel.appendChild(swipeHint);
            }
            
            // Исправляем количество индикаторов
            fixReviewIndicators();
        } else {
            console.log('Показываем кнопки навигации отзывов на десктопе');
            prevButton.style.display = '';
            nextButton.style.display = '';
            
            // Удаляем подсказку о свайпе, если она есть
            const swipeHint = document.querySelector('.swipe-hint');
            if (swipeHint) {
                swipeHint.remove();
            }
        }
    }
    
    // Функция для исправления количества индикаторов в разделе отзывов
    function fixReviewIndicators() {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        if (!reviewsCarousel) return;
        
        const reviewCards = reviewsCarousel.querySelectorAll('.review-card');
        const indicators = document.querySelectorAll('.indicator, .swipe-dot');
        
        if (!reviewCards.length || !indicators.length) return;
        
        console.log(`Найдено ${reviewCards.length} отзывов и ${indicators.length} индикаторов`);
        
        // Если индикаторов больше, чем отзывов, удаляем лишние
        if (indicators.length > reviewCards.length) {
            console.log(`Удаляем ${indicators.length - reviewCards.length} лишних индикаторов`);
            
            const indicatorsContainer = indicators[0].parentNode;
            
            // Удаляем все индикаторы
            indicators.forEach(indicator => indicator.remove());
            
            // Создаем новые индикаторы в правильном количестве
            for (let i = 0; i < reviewCards.length; i++) {
                const newIndicator = document.createElement('span');
                newIndicator.className = indicators[0].className.includes('swipe-dot') ? 'swipe-dot' : 'indicator';
                newIndicator.classList.toggle('active', i === 0);
                
                // Копируем стили из первого индикатора
                newIndicator.style.cssText = window.getComputedStyle(indicators[0]).cssText;
                
                indicatorsContainer.appendChild(newIndicator);
                
                // Добавляем обработчик клика для переключения на соответствующий отзыв
                newIndicator.addEventListener('click', function() {
                    // Если есть функция showReview, используем ее
                    if (typeof showReview === 'function') {
                        showReview(i);
                    } else {
                        // Иначе реализуем простое переключение
                        reviewCards.forEach(card => card.style.display = 'none');
                        reviewCards[i].style.display = 'flex';
                        
                        // Обновляем активный индикатор
                        document.querySelectorAll('.indicator, .swipe-dot').forEach((dot, index) => {
                            dot.classList.toggle('active', index === i);
                        });
                    }
                });
            }
        }
    }
    
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
    
    // Инициализация свайпа для отзывов на мобильных устройствах
    function initReviewsSwipe() {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        
        if (!reviewsCarousel) {
            console.error('Карусель отзывов не найдена');
            return;
        }
        
        const reviewCards = reviewsCarousel.querySelectorAll('.review-card');
        if (!reviewCards.length) {
            console.error('Карточки отзывов не найдены');
            return;
        }
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Находим текущий индекс
        reviewCards.forEach((card, index) => {
            if (card.classList.contains('active') || 
                card.style.display === 'flex' || 
                card.style.opacity === '1') {
                currentIndex = index;
            }
        });
        
        // Обработчики свайпа
        reviewsCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        reviewsCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            // Минимальное расстояние для регистрации свайпа
            if (Math.abs(swipeDistance) < 50) return;
            
            if (swipeDistance < 0) {
                // Свайп влево - следующий отзыв
                let newIndex = currentIndex + 1;
                if (newIndex >= reviewCards.length) newIndex = 0;
                
                // Вызываем существующую функцию showReview, если она есть
                if (typeof showReview === 'function') {
                    showReview(newIndex, 'next');
                } else {
                    // Простая реализация, если функция showReview не найдена
                    reviewCards.forEach(card => card.style.display = 'none');
                    reviewCards[newIndex].style.display = 'flex';
                    currentIndex = newIndex;
                    
                    // Обновляем индикаторы, если они есть
                    const indicators = document.querySelectorAll('.indicator, .swipe-dot');
                    if (indicators.length) {
                        indicators.forEach((dot, i) => {
                            dot.classList.toggle('active', i === newIndex);
                        });
                    }
                }
            } else {
                // Свайп вправо - предыдущий отзыв
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = reviewCards.length - 1;
                
                // Вызываем существующую функцию showReview, если она есть
                if (typeof showReview === 'function') {
                    showReview(newIndex, 'prev');
                } else {
                    // Простая реализация, если функция showReview не найдена
                    reviewCards.forEach(card => card.style.display = 'none');
                    reviewCards[newIndex].style.display = 'flex';
                    currentIndex = newIndex;
                    
                    // Обновляем индикаторы, если они есть
                    const indicators = document.querySelectorAll('.indicator, .swipe-dot');
                    if (indicators.length) {
                        indicators.forEach((dot, i) => {
                            dot.classList.toggle('active', i === newIndex);
                        });
                    }
                }
            }
        }
    }
    
    // Вызываем функцию адаптации при загрузке страницы
    adaptInterface();
    
    // Инициализируем свайп для отзывов
    if (isMobileDevice()) {
        initReviewsSwipe();
    }
    
    // Вызываем функцию адаптации при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации производительности
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            adaptInterface();
            
            // Если устройство стало мобильным, инициализируем свайп
            if (isMobileDevice()) {
                initReviewsSwipe();
            }
        }, 250);
    });
    
    console.log('Инициализация адаптивного дизайна завершена');
});



