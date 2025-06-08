// Минималистичная карусель отзывов
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    
    if (!reviewCards.length || !indicators.length) {
        console.error('Элементы карусели не найдены');
        return;
    }
    
    let currentIndex = 0;
    
    // Функция для отображения отзыва
    function showReview(index) {
        // Скрываем все отзывы и деактивируем индикаторы
        reviewCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none';
        });
        
        indicators.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем нужный отзыв и активируем индикатор
        reviewCards[index].classList.add('active');
        reviewCards[index].style.display = 'flex';
        
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Инициализация
    showReview(0);
    
    // Обработчики для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = reviewCards.length - 1;
            showReview(newIndex);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= reviewCards.length) newIndex = 0;
            showReview(newIndex);
        });
    }
    
    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showReview(index);
        });
    });
    
    // Автоматическая смена отзывов
    let autoplayInterval = setInterval(function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewCards.length) newIndex = 0;
        showReview(newIndex);
    }, 6000);
    
    // Остановка автоматической смены при наведении
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        reviewsSlider.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        
        reviewsSlider.addEventListener('mouseleave', function() {
            autoplayInterval = setInterval(function() {
                let newIndex = currentIndex + 1;
                if (newIndex >= reviewCards.length) newIndex = 0;
                showReview(newIndex);
            }, 6000);
        });
    }
    
    // Обработка кнопки "Больше отзывов"
    // const moreReviewsButton = document.querySelector('.more-reviews-button');
    // if (moreReviewsButton) {
    //     moreReviewsButton.addEventListener('click', function() {
    //         alert('Здесь будут показаны дополнительные отзывы');
    //     });
    // }
});

