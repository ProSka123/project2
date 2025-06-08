document.addEventListener('DOMContentLoaded', function() {
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
                    top: targetPosition - headerHeight - 20, // Дополнительный отступ
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
    
    // Карусель отзывов
    initReviewsCarousel();
    
    function initReviewsCarousel() {
        const reviewCards = document.querySelectorAll('.review-card');
        const dots = document.querySelectorAll('.review-dots .dot');
        const prevButton = document.querySelector('.prev-review');
        const nextButton = document.querySelector('.next-review');
        
        // Проверяем, есть ли элементы на странице
        if (reviewCards.length === 0 || dots.length === 0) {
            console.error('Элементы карусели отзывов не найдены');
            return;
        }
        
        console.log('Инициализация карусели отзывов');
        console.log('Найдено отзывов:', reviewCards.length);
        console.log('Найдено точек:', dots.length);
        
        let currentIndex = 0;
        
        // Функция для отображения отзыва по индексу
        function showReview(index) {
            console.log('Показываем отзыв с индексом:', index);
            
            // Скрываем все отзывы
            reviewCards.forEach(card => {
                card.classList.remove('active');
                card.style.display = 'none';
            });
            
            // Убираем активный класс у всех точек
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Показываем нужный отзыв и активируем соответствующую точку
            if (reviewCards[index]) {
                reviewCards[index].classList.add('active');
                reviewCards[index].style.display = 'block';
                
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
                
                // Обновляем текущий индекс
                currentIndex = index;
            } else {
                console.error('Отзыв с индексом', index, 'не найден');
            }
        }
        
        // Инициализация: показываем первый отзыв
        showReview(0);
        
        // Обработчики для кнопок
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                console.log('Нажата кнопка "Предыдущий"');
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = reviewCards.length - 1;
                showReview(newIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                console.log('Нажата кнопка "Следующий"');
                let newIndex = currentIndex + 1;
                if (newIndex >= reviewCards.length) newIndex = 0;
                showReview(newIndex);
            });
        }
        
        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                console.log('Нажата точка с индексом:', index);
                showReview(index);
            });
        });
        
        // Добавляем свайп для мобильных устройств
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        
        if (reviewsCarousel) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            reviewsCarousel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            reviewsCarousel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                if (touchEndX < touchStartX) {
                    // Свайп влево - следующий отзыв
                    let newIndex = currentIndex + 1;
                    if (newIndex >= reviewCards.length) newIndex = 0;
                    showReview(newIndex);
                } else if (touchEndX > touchStartX) {
                    // Свайп вправо - предыдущий отзыв
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = reviewCards.length - 1;
                    showReview(newIndex);
                }
            }
        }
        
        // Автоматическая смена отзывов
        let reviewInterval = setInterval(function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= reviewCards.length) newIndex = 0;
            showReview(newIndex);
        }, 5000);
        
        // Остановка автоматической смены при наведении
        if (reviewsCarousel) {
            reviewsCarousel.addEventListener('mouseenter', function() {
                clearInterval(reviewInterval);
            });
            
            reviewsCarousel.addEventListener('mouseleave', function() {
                reviewInterval = setInterval(function() {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= reviewCards.length) newIndex = 0;
                    showReview(newIndex);
                }, 5000);
            });
        }
        
        // Кнопка "Больше отзывов"
        const moreReviewsButton = document.querySelector('.more-reviews-button');
        if (moreReviewsButton) {
            moreReviewsButton.addEventListener('click', function() {
                alert('Здесь будут показаны дополнительные отзывы или произойдет переход на страницу с отзывами');
            });
        }
    }
});












