document.addEventListener('DOMContentLoaded', function() {
    // Определение устройства пользователя
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Добавляем класс к body для CSS-стилизации
        document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
        
        console.log('Устройство пользователя:', isMobile ? 'Мобильное' : 'ПК');
        
        // Применяем специфичные для устройства изменения
        if (isMobile) {
            applyMobileSpecificChanges();
        }
        
        return isMobile;
    }
    
    // Вызываем функцию определения устройства
    const isMobile = detectDevice();
    
    // Проверка загрузки логотипа
    const logoImg = new Image();
    logoImg.onload = function() {
        console.log('Логотип успешно загружен');
    };
    logoImg.onerror = function() {
        console.error('Ошибка загрузки логотипа. Проверьте путь: images/logo.png');
    };
    logoImg.src = 'images/logo.png';
    
    // Проверка загрузки фонового изображения
    const img = new Image();
    img.onload = function() {
        console.log('Фоновое изображение успешно загружено');
    };
    img.onerror = function() {
        console.error('Ошибка загрузки фонового изображения. Проверьте путь и имя файла.');
    };
    img.src = 'images/hero-bg.jpg';
    
    // Скрытие/показ шапки при прокрутке
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    let heroHeight = 0;
    
    if (heroSection) {
        heroHeight = heroSection.offsetHeight;
        // Скрываем шапку при загрузке страницы
        header.classList.add('header-hidden');
    }
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Показываем/скрываем шапку в зависимости от позиции прокрутки
        if (scrollPosition > heroHeight * 0.7) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        } else {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
        }
        
        // Анимация при скролле
        checkScroll();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Вызываем обработчик при загрузке страницы
    handleScroll();
    
    // Улучшенная работа мобильного меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Открытие/закрытие меню
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Закрытие меню при клике на пункт меню
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Плавная прокрутка к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight, // Убираем дополнительный отступ
                    behavior: 'smooth'
                });
                
                // Закрыть мобильное меню после клика
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Анимация при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверка при загрузке и скролле
    checkScroll();
    
    // Переключение карточек услуг
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Инициализация переключения карточек услуг');
        
        const serviceButtons = document.querySelectorAll('.service-button');
        const backButtons = document.querySelectorAll('.back-button');
        
        console.log('Найдено кнопок "Подробнее":', serviceButtons.length);
        console.log('Найдено кнопок "Назад":', backButtons.length);
        
        // Обработчики для кнопок "Подробнее"
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Предотвращаем стандартное поведение кнопки
                
                const serviceType = this.getAttribute('data-service');
                console.log('Нажата кнопка "Подробнее" для услуги:', serviceType);
                
                const card = document.getElementById(`service-${serviceType}`);
                
                if (card) {
                    console.log('Переворачиваем карточку:', `service-${serviceType}`);
                    card.classList.add('flipped');
                } else {
                    console.error('Карточка не найдена:', `service-${serviceType}`);
                }
            });
        });
        
        // Обработчики для кнопок "Назад"
        backButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Предотвращаем стандартное поведение кнопки
                
                console.log('Нажата кнопка "Назад"');
                const card = this.closest('.service-card');
                
                if (card) {
                    console.log('Возвращаем карточку в исходное положение:', card.id);
                    card.classList.remove('flipped');
                } else {
                    console.error('Родительская карточка не найдена');
                }
            });
        });
        
        // Проверка структуры карточек
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            console.log('Проверка карточки:', card.id);
            const front = card.querySelector('.service-card-front');
            const back = card.querySelector('.service-card-back');
            
            if (!front) console.error('Отсутствует передняя часть карточки:', card.id);
            if (!back) console.error('Отсутствует задняя часть карточки:', card.id);
        });
    });
    
    // Удаляем перенаправление для ссылок на отзывы - удалено
    
    // Кнопка "Больше отзывов" должна вести на внешний сайт - удалено
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

