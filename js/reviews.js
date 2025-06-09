document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен, инициализируем карусель отзывов');
    
    // Получаем все элементы
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.review-dots .dot');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    
    console.log('Найдено отзывов:', reviewCards.length);
    console.log('Найдено точек:', dots.length);
    
    // Проверяем, есть ли элементы на странице
    if (reviewCards.length === 0 || dots.length === 0) {
        console.error('Элементы карусели отзывов не найдены');
        return;
    }
    
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
        reviewCards[index].classList.add('active');
        reviewCards[index].style.display = 'block';
        dots[index].classList.add('active');
        
        // Обновляем текущий индекс
        currentIndex = index;
    }
    
    // Инициализация: показываем первый отзыв
    showReview(0);
    
    // Обработчики для кнопок
    prevButton.addEventListener('click', function() {
        console.log('Нажата кнопка "Предыдущий"');
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = reviewCards.length - 1;
        showReview(newIndex);
    });
    
    nextButton.addEventListener('click', function() {
        console.log('Нажата кнопка "Следующий"');
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewCards.length) newIndex = 0;
        showReview(newIndex);
    });
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log('Нажата точка с индексом:', index);
            showReview(index);
        });
    });
    
    // Улучшение секции отзывов для мобильных устройств
    function enhanceMobileReviews() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            const reviewsCarousel = document.querySelector('.reviews-carousel');
            const reviewCards = document.querySelectorAll('.review-card');
            
            if (reviewsCarousel && reviewCards.length) {
                // Создаем индикатор свайпа, если его нет
                if (!document.querySelector('.swipe-indicator')) {
                    const swipeIndicator = document.createElement('div');
                    swipeIndicator.className = 'swipe-indicator';
                    
                    // Добавляем точки по количеству отзывов
                    for (let i = 0; i < reviewCards.length; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'swipe-dot' + (i === 0 ? ' active' : '');
                        swipeIndicator.appendChild(dot);
                    }
                    
                    // Добавляем индикатор после карусели
                    reviewsCarousel.parentNode.appendChild(swipeIndicator);
                }
                
                // Добавляем обработчики свайпа
                let touchStartX = 0;
                let touchEndX = 0;
                
                reviewsCarousel.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, {passive: true});
                
                reviewsCarousel.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, {passive: true});
                
                function handleSwipe() {
                    if (touchEndX < touchStartX - 30) {
                        // Свайп влево - следующий отзыв
                        let newIndex = currentIndex + 1;
                        if (newIndex >= reviewCards.length) newIndex = 0;
                        showReview(newIndex);
                    } else if (touchEndX > touchStartX + 30) {
                        // Свайп вправо - предыдущий отзыв
                        let newIndex = currentIndex - 1;
                        if (newIndex < 0) newIndex = reviewCards.length - 1;
                        showReview(newIndex);
                    }
                }
            }
        }
    }

    // Вызываем функцию после загрузки DOM
    document.addEventListener('DOMContentLoaded', enhanceMobileReviews);
    
    // Автоматическая смена отзывов
    let reviewInterval = setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewCards.length) newIndex = 0;
        showReview(newIndex);
    }, 5000);
    
    // Остановка автоматической смены при наведении
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
    
    // Кнопка "Больше отзывов"
    const moreReviewsButton = document.querySelector('.more-reviews-button');
    moreReviewsButton.addEventListener('click', function() {
        alert('Здесь будут показаны дополнительные отзывы или произойдет переход на страницу с отзывами');
    });
});


