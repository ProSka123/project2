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
                    const indicators = document.querySelectorAll('.indicator');
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
                    const indicators = document.querySelectorAll('.indicator');
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

