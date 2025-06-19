document.addEventListener('DOMContentLoaded', function() {
    console.log('Отладочный скрипт загружен');
    
    // Проверяем наличие элементов карусели
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.review-dots .dot');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    
    console.log('Отзывы:', reviewCards.length);
    console.log('Точки:', dots.length);
    console.log('Кнопка "Предыдущий":', prevButton ? 'найдена' : 'не найдена');
    console.log('Кнопка "Следующий":', nextButton ? 'найдена' : 'не найдена');
    
    // Добавляем прямые обработчики событий для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            console.log('Клик по кнопке "Предыдущий"');
            alert('Нажата кнопка "Предыдущий"');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            console.log('Клик по кнопке "Следующий"');
            alert('Нажата кнопка "Следующий"');
        });
    }
});