/**
 * Файл для обработки мобильного меню на всех страницах сайта
 * Создан для обеспечения единообразной работы меню на всех страницах
 */

// Инициализация мобильного меню
function initMobileMenu() {
    // Получаем необходимые элементы
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Проверяем наличие элементов
    if (!menuToggle || !nav) return;
    
    // Обработчик клика по кнопке-гамбургер
    menuToggle.onclick = function(e) {
        // Предотвращаем стандартное поведение и всплытие события
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Переключаем классы для меню и body
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Получаем иконку и меняем её в зависимости от состояния меню
        const icon = this.querySelector('i');
        if (icon) {
            // Простое переключение между классами иконок
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times'; // Крестик
            } else {
                icon.className = 'fas fa-bars';  // Гамбургер
            }
        }
    };
    
    // Закрытие меню при клике на пункт меню
    const menuLinks = nav.querySelectorAll('ul li a');
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].onclick = function() {
            // Закрываем меню
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Возвращаем иконку гамбургера
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        };
    }
    
    // Закрытие меню при клике вне меню
    document.onclick = function(e) {
        // Проверяем, что меню открыто и клик был не по меню и не по кнопке
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            // Закрываем меню
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Возвращаем иконку гамбургера
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    };
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем мобильное меню
    initMobileMenu();
});

// Повторная инициализация при изменении размера окна
window.addEventListener('resize', function() {
    // Инициализируем мобильное меню
    initMobileMenu();
});
