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
    
    // Адаптация карточек услуг
    adaptServiceCards(isMobile);
    
    // Адаптация формы контактов
    adaptContactForm(isMobile);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', adaptInterface);

// Обновление при изменении размера окна
window.addEventListener('resize', adaptInterface);

// 1. Функция адаптации hero секции
function adaptHeroSection(isMobile) {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    if (isMobile) {
        // Мобильные стили
        heroSection.style.height = '100vh';
        heroSection.style.backgroundImage = 'none';
        heroSection.style.backgroundColor = '#696969';
        
        // Убираем затемнение
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) overlay.style.backgroundColor = 'transparent';
        
        // Настраиваем текст
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.paddingTop = '15%';
            heroContent.style.textAlign = 'center';
            
            // Настраиваем цвет текста
            const heading = heroContent.querySelector('h1');
            const paragraph = heroContent.querySelector('p');
            
            if (heading) {
                heading.style.color = '#ffffff';
                heading.style.fontSize = '2rem';
                heading.style.marginBottom = '1rem';
            }
            
            if (paragraph) {
                paragraph.style.color = '#ffffff';
                paragraph.style.fontSize = '1rem';
                paragraph.style.marginBottom = '2rem';
            }
            
            // Настраиваем кнопку
            const button = heroContent.querySelector('.primary-button');
            if (button) {
                button.style.width = '100%';
                button.style.maxWidth = '300px';
                button.style.padding = '15px 20px';
                button.style.fontSize = '1.1rem';
            }
        }
    } else {
        // Сбрасываем стили для десктопа
        heroSection.style = '';
        
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) overlay.style = '';
        
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style = '';
            
            const heading = heroContent.querySelector('h1');
            const paragraph = heroContent.querySelector('p');
            const button = heroContent.querySelector('.primary-button');
            
            if (heading) heading.style = '';
            if (paragraph) paragraph.style = '';
            if (button) button.style = '';
        }
    }
}

// 2. Функция адаптации стрелки прокрутки
function adaptScrollDown(isMobile) {
    const scrollDown = document.querySelector('.scroll-down');
    if (!scrollDown) return;
    
    scrollDown.style.display = isMobile ? 'none' : '';
}

// 3. Настройка поведения навигационной панели
function setupHeaderBehavior(isMobile) {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (isMobile) {
        // Фиксируем шапку для мобильных
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.zIndex = '1000';
        header.style.backgroundColor = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        // Возвращаем стандартное поведение для десктопа
        header.style = '';
    }
}

// 4. Оптимизация изображений
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

// 5. Настройка сенсорных событий для карусели отзывов
function setupTouchEvents(isMobile) {
    if (!isMobile) return;
    
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    if (!reviewsCarousel) return;
    
    // Удаляем существующие обработчики, если они есть
    reviewsCarousel.removeEventListener('touchstart', handleTouchStart);
    reviewsCarousel.removeEventListener('touchmove', handleTouchMove);
    reviewsCarousel.removeEventListener('touchend', handleTouchEnd);
    
    // Добавляем новые обработчики
    reviewsCarousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    reviewsCarousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    reviewsCarousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Добавляем визуальную подсказку о свайпе
    let swipeHint = reviewsCarousel.querySelector('.swipe-hint');
    if (!swipeHint) {
        swipeHint = document.createElement('div');
        swipeHint.className = 'swipe-hint';
        swipeHint.textContent = '← Свайп →';
        swipeHint.style.textAlign = 'center';
        swipeHint.style.fontSize = '0.8rem';
        swipeHint.style.color = '#888';
        swipeHint.style.marginTop = '10px';
        reviewsCarousel.appendChild(swipeHint);
    }
}

// Обработчики сенсорных событий
let startX, startY;
let isScrolling;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isScrolling = undefined;
}

function handleTouchMove(e) {
    if (!startX || !startY) return;
    
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const diffX = startX - x;
    const diffY = startY - y;
    
    // Определяем, является ли это вертикальной прокруткой
    if (isScrolling === undefined) {
        isScrolling = Math.abs(diffX) < Math.abs(diffY);
    }
    
    // Если это горизонтальный свайп, предотвращаем прокрутку страницы
    if (!isScrolling) {
        e.preventDefault();
    }
}

function handleTouchEnd(e) {
    if (!startX || !startY || isScrolling) return;
    
    const x = e.changedTouches[0].clientX;
    const diffX = startX - x;
    
    // Если свайп достаточно длинный, переключаем отзыв
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Свайп влево - следующий отзыв
            const nextButton = document.querySelector('.next-review');
            if (nextButton) nextButton.click();
        } else {
            // Свайп вправо - предыдущий отзыв
            const prevButton = document.querySelector('.prev-review');
            if (prevButton) prevButton.click();
        }
    }
    
    // Сбрасываем значения
    startX = null;
    startY = null;
    isScrolling = undefined;
}

// 6. Адаптация карточек услуг
function adaptServiceCards(isMobile) {
    const serviceCards = document.querySelectorAll('.service-card');
    if (!serviceCards.length) return;
    
    serviceCards.forEach(card => {
        if (isMobile) {
            // Увеличиваем размер карточки и интерактивных элементов
            card.style.padding = '20px';
            card.style.marginBottom = '20px';
            
            // Увеличиваем размер кнопок
            const buttons = card.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.padding = '12px 20px';
                button.style.fontSize = '1rem';
                button.style.minHeight = '44px'; // Минимальная высота для удобства касания
            });
        } else {
            // Сбрасываем стили для десктопа
            card.style = '';
            
            const buttons = card.querySelectorAll('button');
            buttons.forEach(button => {
                button.style = '';
            });
        }
    });
}

// 7. Адаптация формы контактов
function adaptContactForm(isMobile) {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    if (isMobile) {
        // Увеличиваем размер полей ввода для удобства на мобильных
        inputs.forEach(input => {
            input.style.padding = '15px';
            input.style.fontSize = '16px'; // Предотвращает масштабирование на iOS
            input.style.marginBottom = '15px';
            input.style.borderRadius = '8px';
        });
        
        // Настраиваем кнопку отправки
        const submitButton = contactForm.querySelector('.submit-button');
        if (submitButton) {
            submitButton.style.padding = '15px';
            submitButton.style.fontSize = '1.1rem';
            submitButton.style.width = '100%';
            submitButton.style.minHeight = '50px';
        }
    } else {
        // Сбрасываем стили для десктопа
        inputs.forEach(input => {
            input.style = '';
        });
        
        const submitButton = contactForm.querySelector('.submit-button');
        if (submitButton) {
            submitButton.style = '';
        }
    }
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

