// Улучшенная функция для мобильного меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (!menuToggle || !nav) return;

    // Кэшируем иконку для повторного использования
    const icon = menuToggle.querySelector('i');

    // Функция для переключения иконки меню
    function toggleMenuIcon(isActive) {
        if (!icon) return;

        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Функция для закрытия меню
    function closeMenu() {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        toggleMenuIcon(false);
    }

    // Обработчик для открытия/закрытия меню
    function handleMenuToggle() {
        const isActive = nav.classList.toggle('active');
        body.classList.toggle('menu-open');
        toggleMenuIcon(isActive);
    }

    // Обработчик клика вне меню
    function handleOutsideClick(event) {
        if (!nav.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            nav.classList.contains('active')) {
            closeMenu();
        }
    }

    // Добавляем обработчики событий
    menuToggle.addEventListener('click', handleMenuToggle);

    // Закрытие меню при клике на ссылку
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие меню при клике вне меню
    document.addEventListener('click', handleOutsideClick);

    // Возвращаем функцию для очистки обработчиков
    return function cleanup() {
        menuToggle.removeEventListener('click', handleMenuToggle);
        navLinks.forEach(link => {
            link.removeEventListener('click', closeMenu);
        });
        document.removeEventListener('click', handleOutsideClick);
    };
}

// Функция для оптимизации изображений на мобильных устройствах
function optimizeImagesForMobile() {
    try {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            const images = document.querySelectorAll('img[data-mobile-src]');
            images.forEach(img => {
                if (img.dataset.mobileSrc && img.src !== img.dataset.mobileSrc) {
                    img.src = img.dataset.mobileSrc;
                }
            });
        }
    } catch (error) {
        console.error('Ошибка при оптимизации изображений:', error);
    }
}

// Функция для инициализации свайпа в карусели отзывов
function initReviewsSwipe() {
    try {
        const carousel = document.querySelector('.reviews-carousel');
        if (!carousel) return;

        let startX = 0;
        let endX = 0;
        const threshold = 50; // Минимальное расстояние для свайпа

        // Кэшируем кнопки для лучшей производительности
        const nextButton = document.querySelector('.next-review');
        const prevButton = document.querySelector('.prev-review');

        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }

        function handleTouchEnd(e) {
            endX = e.changedTouches[0].clientX;

            // Определяем направление свайпа
            const swipeDistance = startX - endX;

            if (Math.abs(swipeDistance) > threshold) {
                if (swipeDistance > 0) {
                    // Свайп влево - следующий отзыв
                    if (nextButton) nextButton.click();
                } else {
                    // Свайп вправо - предыдущий отзыв
                    if (prevButton) prevButton.click();
                }
            }
        }

        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Возвращаем функцию для очистки обработчиков
        return function cleanup() {
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchend', handleTouchEnd);
        };
    } catch (error) {
        console.error('Ошибка при инициализации свайпа:', error);
        return null;
    }
}

// Функция для добавления разделителей между секциями на мобильных устройствах
function addMobileSectionDividers() {
    try {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            const sections = document.querySelectorAll('section');

            // Проверяем, не добавлены ли уже разделители
            const existingDividers = document.querySelectorAll('.mobile-section-divider');
            if (existingDividers.length > 0) return;

            sections.forEach((section, index) => {
                if (index > 0 && section.parentNode) { // Пропускаем первую секцию
                    // Создаем разделитель
                    const divider = document.createElement('div');
                    divider.className = 'mobile-section-divider';

                    // Вставляем разделитель перед текущей секцией
                    section.parentNode.insertBefore(divider, section);
                }
            });
        }
    } catch (error) {
        console.error('Ошибка при добавлении разделителей секций:', error);
    }
}

// Функция для адаптации hero секции на мобильных устройствах
function adaptHeroSection() {
    try {
        const isMobile = window.innerWidth < 768;
        const heroSection = document.querySelector('.hero');

        if (!heroSection || !isMobile) return;

        // Применяем стили для мобильной версии
        Object.assign(heroSection.style, {
            backgroundImage: 'none',
            backgroundColor: '#696969',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            margin: '0'
        });

        // Убираем затемнение
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) {
            overlay.style.backgroundColor = 'transparent';
        }

        // Оптимизируем контент
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            Object.assign(heroContent.style, {
                padding: '0 20px',
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            });
            
            // Оптимизируем заголовок
            const heading = heroContent.querySelector('h1');
            if (heading) {
                Object.assign(heading.style, {
                    fontSize: '2.2rem',
                    lineHeight: '1.2',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                });
            }
            
            // Оптимизируем параграф
            const paragraph = heroContent.querySelector('p');
            if (paragraph) {
                Object.assign(paragraph.style, {
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    textAlign: 'center'
                });
            }
            
            // Оптимизируем кнопку
            const button = heroContent.querySelector('.primary-button');
            if (button) {
                Object.assign(button.style, {
                    width: '100%',
                    maxWidth: '300px',
                    padding: '15px 24px',
                    fontSize: '17px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(74, 144, 226, 0.25)'
                });
            }
        }
    } catch (error) {
        console.error('Ошибка при адаптации hero секции:', error);
    }
}

// Функция для скрытия секции отзывов на мобильных устройствах
function hideReviewsOnMobile() {
    try {
        const isMobile = window.innerWidth < 768;
        const reviewsSection = document.getElementById('reviews');
        
        if (!reviewsSection || !isMobile) return;
        
        // Скрываем секцию отзывов
        reviewsSection.style.display = 'none';
    } catch (error) {
        console.error('Ошибка при скрытии секции отзывов:', error);
    }
}

// Функция для оптимизации шапки на мобильных устройствах
function optimizeHeaderForMobile() {
    try {
        const isMobile = window.innerWidth < 768;
        
        if (!isMobile) return;
        
        // Находим элементы шапки
        const menuToggle = document.querySelector('.menu-toggle i');
        const logoText = document.querySelector('.logo-text');
        const mobileLogo = document.querySelector('.mobile-logo-text');
        
        // Меняем цвет иконки меню
        if (menuToggle) {
            menuToggle.style.color = 'var(--primary)';
            menuToggle.style.fontSize = '24px';
        }
        
        // Скрываем текст логотипа
        if (logoText) logoText.style.display = 'none';
        if (mobileLogo) mobileLogo.style.display = 'none';
    } catch (error) {
        console.error('Ошибка при оптимизации шапки:', error);
    }
}

// Функция для применения всех мобильных оптимизаций
function applyMobileOptimizations() {
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-device');

        // Инициализируем мобильное меню
        initMobileMenu();

        // Оптимизируем изображения
        optimizeImagesForMobile();

        // Адаптируем hero секцию
        adaptHeroSection();

        // Добавляем разделители между секциями
        addMobileSectionDividers();

        // Скрываем секцию отзывов
        hideReviewsOnMobile();
        
        // Оптимизируем шапку
        optimizeHeaderForMobile();

        // Настраиваем ссылки для мобильной версии
        const reviewsLink = document.querySelector('.reviews-link');
        if (reviewsLink) {
            reviewsLink.setAttribute('href', 'reviews.html');
        }
    }
}

// Дебаунс функция для оптимизации обработчика resize
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    applyMobileOptimizations();

    // Оптимизированный обработчик изменения размера окна
    const handleResize = debounce(function() {
        try {
            const wasMobile = document.body.classList.contains('mobile-device');
            const isMobile = window.innerWidth < 768;

            // Если изменился тип устройства, перезагружаем страницу
            if (wasMobile !== isMobile) {
                // Очищаем обработчики перед перезагрузкой
                if (window.mobileMenuCleanup && typeof window.mobileMenuCleanup === 'function') {
                    window.mobileMenuCleanup();
                }
                location.reload();
            }
        } catch (error) {
            console.error('Ошибка при обработке изменения размера окна:', error);
        }
    }, 250);

    window.addEventListener('resize', handleResize);
});
