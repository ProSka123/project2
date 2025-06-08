// Плавная прокрутка для всех якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружен скрипт smooth-scroll.js');
    
    // Обработка всех ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Клик по якорной ссылке:', targetId);
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // Специальная обработка для разных типов ссылок
                let offset = headerHeight + 20; // Стандартный отступ
                
                // Если это стрелка с главного экрана (ссылка на #about)
                if (targetId === '#about' && this.closest('.scroll-down')) {
                    offset = 0; // Убираем отступ для точного позиционирования
                }
                
                // Если это ссылка из верхней панели навигации
                if (this.closest('header nav')) {
                    // Разные отступы для разных секций
                    if (targetId === '#about') {
                        offset = 0; // Точно к началу секции "Обо мне"
                    } else if (targetId === '#services') {
                        offset = 10; // Небольшой отступ для секции "Услуги"
                    } else if (targetId === '#reviews') {
                        offset = 20; // Больший отступ для секции "Отзывы"
                    } else if (targetId === '#contact') {
                        offset = 30; // Еще больший отступ для секции "Контакты"
                    } else {
                        offset = 0; // Для всех остальных секций
                    }
                }
                
                console.log('Прокручиваем к элементу:', targetId, 'на позицию:', targetPosition - offset);
                
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            } else {
                console.error('Целевой элемент не найден:', targetId);
            }
        });
    });
});


