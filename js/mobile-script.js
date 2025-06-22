// Скрипт для мобильной версии сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация слайдера и индикаторов
    initServicesSlider();
    
    // Инициализация модального окна для услуг
    initServiceModal();
    
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

// Инициализация слайдера и индикаторов
function initServicesSlider() {
    const track = document.querySelector('.services-track');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    if (!track || !indicatorsContainer) return;

    const cards = track.querySelectorAll('.service-card');
    let cardCount = cards.length;

    // Создаем индикаторы
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('slider-indicator');
        indicator.addEventListener('click', () => {
            const cardWidth = cards[i].offsetWidth;
            const scrollPosition = i * (cardWidth + 15); // 15px - это gap
            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
        indicatorsContainer.appendChild(indicator);
    }
    const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');

    function updateIndicators() {
        const scrollLeft = track.scrollLeft;
        const cardWidth = cards[0].offsetWidth;
        const gap = 15;
        let currentIndex = Math.round(scrollLeft / (cardWidth + gap));
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    track.addEventListener('scroll', updateIndicators, { passive: true });
    updateIndicators(); // Первоначальная установка
}

// Инициализация модального окна для услуг
function initServiceModal() {
    const modalContainer = document.getElementById('service-modal-container');
    if (!modalContainer) return;

    const overlay = modalContainer.querySelector('.service-modal-overlay');
    const closeButton = modalContainer.querySelector('.service-modal-close');
    const modalBody = modalContainer.querySelector('.modal-body');
    const openButtons = document.querySelectorAll('.service-button');

    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.service-card');
            const backContent = card.querySelector('.service-card-back');
            
            if (backContent) {
                modalBody.innerHTML = backContent.innerHTML;
                modalContainer.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Назначаем события для кнопок внутри модального окна
                const backButton = modalBody.querySelector('.back-button');
                if (backButton) {
                    backButton.addEventListener('click', closeModal);
                }
                const enrollButton = modalBody.querySelector('.enroll-button');
                if(enrollButton) {
                    enrollButton.addEventListener('click', () => {
                        closeModal();
                        
                        // Получаем название услуги из родительской карточки
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
                }
            }
        });
    });

    function closeModal() {
        modalContainer.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
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