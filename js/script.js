document.addEventListener('DOMContentLoaded', function() {
    // Используем единую функцию определения устройства
    const isMobile = window.detectDevice ? window.detectDevice() : 
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
    
    // Применяем специфичные для устройства изменения
    if (isMobile) {
        applyMobileSpecificChanges();
    } else {
        applyDesktopSpecificChanges();
    }
    
    // Остальной код...
});

function applyMobileReviewsChanges() {
    // Функция удалена
}

function applyMobileAboutChanges() {
    // Дополнительные изменения для секции "Обо мне"
    const statItems = document.querySelectorAll('.stat-item');
    
    if (statItems.length > 0) {
        statItems.forEach(item => {
            // Увеличиваем контраст
            item.style.backgroundColor = 'white';
            item.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    }
}

function applyMobileButtonChanges() {
    // Изменения для кнопки "Мое образование и квалификация"
    const educationButton = document.querySelector('.secondary-button[href="education.html"]');
    
    if (educationButton) {
        // Удаляем иконку
        const icon = educationButton.querySelector('i');
        if (icon) {
            icon.remove();
        }
        
        // Увеличиваем размер кнопки
        educationButton.style.padding = '15px 20px';
        educationButton.style.fontSize = '1.1rem';
        educationButton.style.width = '100%';
        educationButton.style.textAlign = 'center';
    }
}

// Улучшенная функция для свайпа отзывов на мобильных устройствах - удалена
function fixMobileReviewsSwipe() {
    // Функция удалена
}

// Вызываем функцию после полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Даем время для инициализации других скриптов
    setTimeout(fixMobileReviewsSwipe, 500);
});

// Также вызываем функцию при изменении размера окна
window.addEventListener('resize', function() {
    setTimeout(fixMobileReviewsSwipe, 500);
});

// Функция для применения мобильных изменений
function applyMobileChanges() {
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Заменяем фоновое изображение в hero секции на серый фон
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            // Полностью удаляем фоновое изображение и устанавливаем серый фон
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = '#f5f5f5';
            
            // Убираем затемнение, если оно есть
            const overlay = heroSection.querySelector('.hero-overlay');
            if (overlay) {
                overlay.style.backgroundColor = 'transparent';
            }
        }
        
        // Смещаем контент выше
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.paddingTop = '15%';
        }
        
        // Удаляем инициализацию свайпа для отзывов
        // setTimeout(fixMobileReviewsSwipe, 500); - removed
    } else {
        document.body.classList.remove('mobile-device');
    }
}

// Вызываем функцию после полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    applyMobileChanges();
});

// Также вызываем функцию при изменении размера окна
window.addEventListener('resize', function() {
    applyMobileChanges();
});

// Добавляем функционал для кнопки "Подробнее" в отзывах
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки "Подробнее"
    const moreButtons = document.querySelectorAll('.review-more');
    
    // Добавляем обработчик события для каждой кнопки
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Находим текст отзыва, связанный с этой кнопкой
            const reviewText = this.previousElementSibling;
            
            // Переключаем класс expanded для текста отзыва
            reviewText.classList.toggle('expanded');
            
            // Меняем текст кнопки в зависимости от состояния
            if (reviewText.classList.contains('expanded')) {
                this.textContent = 'Свернуть';
            } else {
                this.textContent = 'Подробнее';
            }
        });
    });
    
    // Проверяем, нужно ли отображать кнопку "Подробнее" для каждого отзыва
    const reviewTexts = document.querySelectorAll('.review-text');
    reviewTexts.forEach(text => {
        // Если высота содержимого больше, чем максимальная высота в CSS
        if (text.scrollHeight > text.clientHeight) {
            // Если после текста нет кнопки "Подробнее", добавляем её
            if (!text.nextElementSibling || !text.nextElementSibling.classList.contains('review-more')) {
                const moreButton = document.createElement('div');
                moreButton.className = 'review-more';
                moreButton.textContent = 'Подробнее';
                
                // Добавляем обработчик события для новой кнопки
                moreButton.addEventListener('click', function() {
                    text.classList.toggle('expanded');
                    this.textContent = text.classList.contains('expanded') ? 'Свернуть' : 'Подробнее';
                });
                
                // Вставляем кнопку после текста отзыва
                text.parentNode.insertBefore(moreButton, text.nextSibling);
            }
        } else {
            // Если высота содержимого меньше максимальной высоты, скрываем кнопку "Подробнее"
            const nextElement = text.nextElementSibling;
            if (nextElement && nextElement.classList.contains('review-more')) {
                nextElement.style.display = 'none';
            }
        }
    });
});

// Также вызываем функцию при изменении размера окна
window.addEventListener('resize', function() {
    detectDevice();
});

// Функция для применения специфичных изменений для мобильных устройств
function applyMobileSpecificChanges() {
    // Проверяем, находимся ли мы на главной странице
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname.endsWith('/index.html');
    
    // Если мы на главной странице, настраиваем навигацию
    if (isHomePage) {
        // Находим ссылку на отзывы
        const reviewsLink = document.querySelector('.reviews-link');
        if (reviewsLink) {
            // Меняем ссылку на отдельную страницу для мобильных устройств
            reviewsLink.setAttribute('href', 'reviews.html');
        }
    }
    
    // Оптимизация для мобильных устройств
    document.querySelectorAll('img').forEach(img => {
        if (!img.dataset.src) return;
        
        // Если есть мобильная версия изображения, используем её
        if (img.dataset.mobileSrc) {
            img.src = img.dataset.mobileSrc;
        }
    });
}

// Функция для применения специфичных изменений для десктопных устройств
function applyDesktopSpecificChanges() {
    // Проверяем, находимся ли мы на главной странице
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' || 
                       window.location.pathname.endsWith('/index.html');
    
    // Если мы на главной странице, настраиваем навигацию
    if (isHomePage) {
        // Находим ссылку на отзывы
        const reviewsLink = document.querySelector('.reviews-link');
        if (reviewsLink) {
            // Убеждаемся, что ссылка ведет на якорь на текущей странице
            reviewsLink.setAttribute('href', '#reviews');
        }
    }
}

// Функция определения устройства и применения соответствующих изменений
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Добавляем класс к body для CSS-стилизации
    document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
    
    console.log('Устройство пользователя:', isMobile ? 'Мобильное' : 'ПК');
    
    // Применяем специфичные для устройства изменения
    if (isMobile) {
        applyMobileSpecificChanges();
    } else {
        applyDesktopSpecificChanges();
    }
    
    return isMobile;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен');
    
    // Определяем устройство
    const isMobile = detectDevice();
    console.log('Тип устройства определен:', isMobile ? 'мобильное' : 'десктоп');
    
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Другие инициализации...
});

// Обновление при изменении размера окна
window.addEventListener('resize', function() {
    console.log('Изменение размера окна, ширина:', window.innerWidth);
    detectDevice();
});

// Функция для обеспечения отображения разделителей на мобильных устройствах
function ensureMobileDividersVisibility() {
    // Проверяем ширину экрана
    const isMobile = window.innerWidth <= 768;
    
    // Находим все разделители
    const dividers = document.querySelectorAll('.mobile-section-divider');
    
    // Устанавливаем стили в зависимости от устройства
    dividers.forEach(divider => {
        if (isMobile) {
            divider.style.display = 'block';
            divider.style.width = '80%';
            divider.style.height = '1px';
            divider.style.margin = '2rem auto';
            divider.style.background = 'linear-gradient(to right, transparent, var(--primary-dark, #3a7bc8), transparent)';
            divider.style.position = 'relative';
            
            // Добавляем декоративный элемент через JavaScript
            if (!divider.querySelector('.divider-dot')) {
                const dot = document.createElement('span');
                dot.className = 'divider-dot';
                dot.style.position = 'absolute';
                dot.style.top = '50%';
                dot.style.left = '50%';
                dot.style.transform = 'translate(-50%, -50%)';
                dot.style.width = '6px';
                dot.style.height = '6px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = 'var(--primary, #4a90e2)';
                divider.appendChild(dot);
            }
        } else {
            divider.style.display = 'none';
        }
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', ensureMobileDividersVisibility);

// Вызываем функцию при изменении размера окна
window.addEventListener('resize', ensureMobileDividersVisibility);

// Добавляем функцию для улучшения мобильного опыта
function enhanceMobileExperience() {
    // Проверяем, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
        // Добавляем мета-тег viewport, если его нет
        if (!document.querySelector('meta[name="viewport"]')) {
            const metaViewport = document.createElement('meta');
            metaViewport.name = 'viewport';
            metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0';
            document.head.appendChild(metaViewport);
        }
        
        // Улучшаем обработку касаний для карусели отзывов
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        if (reviewsCarousel) {
            let startX, moveX;
            let isScrolling;
            
            reviewsCarousel.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                isScrolling = undefined;
            }, { passive: true });
            
            reviewsCarousel.addEventListener('touchmove', function(e) {
                if (!startX) return;
                
                moveX = e.touches[0].clientX;
                const diffX = startX - moveX;
                
                // Определяем, является ли это вертикальной прокруткой
                if (isScrolling === undefined) {
                    isScrolling = Math.abs(diffX) < Math.abs(e.touches[0].clientY - e.touches[0].clientY);
                }
                
                // Если это горизонтальный свайп, предотвращаем прокрутку страницы
                if (!isScrolling) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            reviewsCarousel.addEventListener('touchend', function(e) {
                if (!startX || !moveX || isScrolling) return;
                
                const diffX = startX - moveX;
                
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
                moveX = null;
                isScrolling = undefined;
            }, { passive: true });
        }
        
        // Улучшаем обработку касаний для всех кнопок
        document.querySelectorAll('button, .primary-button, .secondary-button, .more-reviews-button')
            .forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                }, { passive: true });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                }, { passive: true });
            });
        
        // Добавляем активное состояние для ссылок навигации
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            }, { passive: true });
            
            link.addEventListener('touchend', function() {
                this.style.opacity = '1';
            }, { passive: true });
        });
    }
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    enhanceMobileExperience();
    
    // Добавляем обработчик для закрытия мобильного меню при клике на ссылку
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    
                    // Также убираем overlay, если он есть
                    const overlay = document.querySelector('.menu-overlay');
                    if (overlay) {
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    }
});

// Обновляем при изменении размера окна
window.addEventListener('resize', enhanceMobileExperience);
