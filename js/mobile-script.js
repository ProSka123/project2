// Скрипт для мобильной версии сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация слайдера услуг
    initServicesSlider();
    
    // Инициализация карточек услуг
    initServiceCards();
    
    // Плавная прокрутка для якорных ссылок
    initSmoothScroll();
});

// Инициализация мобильного меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuToggle || !mobileMenu || !menuOverlay) return;
    
    // Обработчик клика по кнопке меню
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Обработчик клика по оверлею
    menuOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Обработчик клика по ссылкам меню
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Инициализация слайдера услуг
function initServicesSlider() {
    const track = document.querySelector('.services-track');
    if (!track) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isScrolling = false;

    // Блокировка стандартного поведения скролла для предотвращения конфликтов
    track.addEventListener('scroll', (e) => {
        if (isScrolling) {
            e.preventDefault();
        }
    }, { passive: false });

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('active');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('active');
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('active');
        snapToNearest();
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; // Увеличиваем скорость скролла
        track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        isDown = false;
        snapToNearest();
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = x - startX;
        track.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    function snapToNearest() {
        if (isScrolling) return;

        isScrolling = true;

        const cards = Array.from(track.querySelectorAll('.service-card'));
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let closestCard = null;
        let smallestDistance = Infinity;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestCard = card;
            }
        });

        if (closestCard) {
            const scrollTarget = closestCard.offsetLeft - (track.offsetWidth - closestCard.offsetWidth) / 2;
            
            track.scrollTo({
                left: scrollTarget,
                behavior: 'smooth'
            });
        }
        
        // Даем время на завершение анимации
        setTimeout(() => {
            isScrolling = false;
        }, 500); // 500ms должно быть достаточно для плавной прокрутки
    }
}

// Плавная прокрутка для якорных ссылок
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация карточек услуг
function initServiceCards() {
    // Находим все кнопки "Подробнее" и "Назад"
    const serviceButtons = document.querySelectorAll('.service-button');
    const backButtons = document.querySelectorAll('.back-button');
    
    // Добавляем обработчики для кнопок "Подробнее"
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service');
            
            const card = document.getElementById(`service-${serviceType}`);
            if (card) {
                card.classList.add('flipped');
            }
        });
    });
    
    // Добавляем обработчики для кнопок "Назад"
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.service-card');
            if (card) {
                card.classList.remove('flipped');
            }
        });
    });
    
    // Добавляем обработчики для кнопок "Записаться"
    const enrollButtons = document.querySelectorAll('.enroll-button');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем название услуги из родительской карточки
            const card = this.closest('.service-card');
            const serviceName = card ? card.querySelector('h3').textContent : 'Услуга';
            
            // Находим секцию контактов
            const contactSection = document.getElementById('contact');
            if (!contactSection) {
                return;
            }
            
            // Находим форму и поле сообщения
            const contactForm = contactSection.querySelector('form');
            const messageField = contactSection.querySelector('#message, [name="message"], textarea');
            
            // Прокручиваем к форме контактов
            const contactPosition = contactSection.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: contactPosition - 20,
                behavior: 'smooth'
            });
            
            // Заполняем поле сообщения информацией об услуге
            if (messageField) {
                messageField.value = `Здравствуйте! Хочу записаться на услугу "${serviceName}".`;
                
                // Небольшая задержка перед установкой фокуса
                setTimeout(() => {
                    messageField.focus();
                }, 800);
            }
            
            // Добавляем подсветку формы
            if (contactForm) {
                contactForm.classList.add('highlight-form');
                setTimeout(() => {
                    contactForm.classList.remove('highlight-form');
                }, 2000);
            }
        });
    });
}