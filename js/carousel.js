// Карусель отзывов с улучшенной анимацией перелистывания
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация карусели отзывов с улучшенной анимацией');
    
    // Получаем элементы из существующей структуры
    const reviewCards = document.querySelectorAll('.review-card');
    const indicators = document.querySelectorAll('.indicator');
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    
    console.log('Найдено отзывов:', reviewCards.length);
    
    // Проверяем наличие необходимых элементов
    if (!reviewCards.length || !reviewsCarousel) {
        console.error('Необходимые элементы карусели не найдены');
        return;
    }
    
    // Определяем, является ли устройство мобильным
    const isMobile = window.innerWidth < 768;
    console.log('Мобильное устройство:', isMobile ? 'Да' : 'Нет');
    
    // Текущий индекс и флаг анимации
    let currentIndex = 0;
    let isAnimating = false;
    
    // Настраиваем контейнер карусели
    reviewsCarousel.style.position = 'relative';
    reviewsCarousel.style.overflow = 'hidden';
    reviewsCarousel.style.minHeight = '300px';
    reviewsCarousel.style.margin = '0 auto';
    reviewsCarousel.style.maxWidth = '800px';
    
    // Настраиваем все карточки отзывов
    reviewCards.forEach((card, idx) => {
        // Устанавливаем базовые стили
        card.style.position = 'absolute';
        card.style.top = '0';
        card.style.left = '0';
        card.style.right = '0';
        card.style.margin = '0 auto';
        card.style.maxWidth = isMobile ? '100%' : '700px'; // Полная ширина на мобильных
        
        // Показываем только первый отзыв
        if (idx === 0) {
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
            card.style.zIndex = '2';
            card.style.display = 'flex';
            card.classList.add('active');
        } else {
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
            card.style.zIndex = '1';
            card.style.display = 'none';
            card.classList.remove('active');
        }
    });
    
    // Устанавливаем высоту контейнера по первой карточке
    function updateCarouselHeight() {
        if (reviewCards[currentIndex]) {
            const activeCardHeight = reviewCards[currentIndex].offsetHeight;
            reviewsCarousel.style.height = (activeCardHeight + 20) + 'px';
            console.log('Обновлена высота контейнера:', (activeCardHeight + 20) + 'px');
        }
    }
    
    // Вызываем функцию обновления высоты
    setTimeout(updateCarouselHeight, 100);
    
    // Функция для показа отзыва с улучшенной анимацией
    function showReview(index, direction = 'next') {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        
        console.log('Показываем отзыв с индексом:', index, 'направление:', direction);
        
        // Получаем текущую и следующую карточки
        const currentCard = reviewCards[currentIndex];
        const nextCard = reviewCards[index];
        
        if (!currentCard || !nextCard) {
            console.error('Не удалось найти карточки для переключения');
            isAnimating = false;
            return;
        }
        
        // Удаляем все классы анимации
        currentCard.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        nextCard.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        
        // Подготавливаем следующую карточку
        nextCard.style.display = 'flex';
        nextCard.style.opacity = '0';
        nextCard.style.zIndex = '2';
        
        // Определяем классы анимации в зависимости от направления
        const currentOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const nextInClass = direction === 'next' ? 'slide-in-left' : 'slide-in-right';
        
        // Добавляем классы анимации
        currentCard.classList.add(currentOutClass);
        nextCard.classList.add(nextInClass);
        
        // Обновляем индикаторы
        if (indicators.length) {
            indicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Определяем время анимации в зависимости от устройства
        const animationDuration = isMobile ? 400 : 600; // мс
        
        // После завершения анимации
        setTimeout(() => {
            // Скрываем предыдущую карточку
            currentCard.style.display = 'none';
            currentCard.style.zIndex = '1';
            currentCard.classList.remove('active');
            
            // Обновляем активную карточку
            nextCard.classList.add('active');
            
            // Обновляем текущий индекс
            currentIndex = index;
            
            // Обновляем высоту контейнера для нового отзыва
            updateCarouselHeight();
            
            // Снимаем флаг анимации
            isAnimating = false;
            
            console.log('Анимация завершена, текущий индекс:', currentIndex);
        }, animationDuration);
    }
    
    // Обработчики для кнопок (только для десктопа)
    if (!isMobile) {
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                console.log('Нажата кнопка "Предыдущий"');
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = reviewCards.length - 1;
                showReview(newIndex, 'prev');
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                console.log('Нажата кнопка "Следующий"');
                let newIndex = currentIndex + 1;
                if (newIndex >= reviewCards.length) newIndex = 0;
                showReview(newIndex, 'next');
            });
        }
    }
    
    // Обработчики для индикаторов (для всех устройств)
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                console.log('Нажат индикатор с индексом:', index);
                // Определяем направление для анимации
                const direction = index > currentIndex ? 'next' : 'prev';
                showReview(index, direction);
            });
        });
    }
    
    // Улучшенный обработчик свайпа для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    
    reviewsCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, {passive: true});
    
    reviewsCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Передаем длительность касания для определения скорости свайпа
        handleSwipe(touchDuration);
    }, {passive: true});
    
    function handleSwipe(touchDuration) {
        const swipeDistance = touchEndX - touchStartX;
        const swipeSpeed = Math.abs(swipeDistance) / touchDuration;
        
        console.log('Свайп:', swipeDistance, 'px, скорость:', swipeSpeed.toFixed(2), 'px/ms');
        
        // Минимальное расстояние для регистрации свайпа
        // Для быстрых свайпов можно уменьшить минимальное расстояние
        const minDistance = swipeSpeed > 0.5 ? 30 : 50;
        
        if (Math.abs(swipeDistance) < minDistance) return;
        
        if (swipeDistance < 0) {
            // Свайп влево - следующий отзыв
            let newIndex = currentIndex + 1;
            if (newIndex >= reviewCards.length) newIndex = 0;
            showReview(newIndex, 'next');
        } else {
            // Свайп вправо - предыдущий отзыв
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = reviewCards.length - 1;
            showReview(newIndex, 'prev');
        }
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        
        // Если изменился тип устройства, обновляем настройки
        if (newIsMobile !== isMobile) {
            location.reload(); // Перезагружаем страницу для применения новых настроек
        } else {
            // Просто обновляем высоту контейнера
            updateCarouselHeight();
        }
    });
    
    console.log('Инициализация карусели завершена');
});


