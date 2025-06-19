// Плавная прокрутка для всех якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок, указывающих на якоря
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                console.log('Целевой элемент найден:', targetId);
                
                // Получаем высоту шапки (она может быть фиксированной)
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Вычисляем позицию элемента с учетом прокрутки
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // Прокручиваем точно к началу секции, вычитая только высоту шапки
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню, если оно открыто
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            } else {
                console.error('Целевой элемент не найден:', targetId);
            }
        });
    });
});




