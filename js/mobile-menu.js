/**
 * Файл для обработки мобильного меню на всех страницах сайта
 * Создан для обеспечения единообразной работы меню на всех страницах
 */

// Функция инициализации мобильного меню
function initMobileMenu() {
    // Получаем элементы
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Если элементы не найдены, выходим
    if (!menuToggle || !nav) {
        console.error('Элементы мобильного меню не найдены');
        return;
    }
    
    // Проверяем, является ли устройство мобильным
    const isMobile = window.innerWidth < 768;
    
    // Если устройство не мобильное, сбрасываем стили и выходим
    if (!isMobile) {
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Удаляем overlay, если он есть
        const existingOverlay = document.querySelector('.menu-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        return;
    }
    
    // Создаем overlay для затемнения фона при открытом меню, если его еще нет
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
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
        
        // Переключаем иконку гамбургера
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
        
        // Показываем/скрываем overlay
        if (nav.classList.contains('active')) {
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
            
            // Блокируем прокрутку страницы
            document.body.style.overflow = 'hidden';
            
            // Сохраняем позицию прокрутки
            document.body.dataset.scrollY = window.scrollY;
        } else {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
            
            // Разблокируем прокрутку страницы
            document.body.style.overflow = '';
            
            // Восстанавливаем позицию прокрутки
            const scrollY = document.body.dataset.scrollY || 0;
            window.scrollTo(0, scrollY);
        }
    };
    
    // Закрытие меню при клике на overlay
    overlay.onclick = function() {
        menuToggle.click();
    };
    
    // Закрытие меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.onclick = function() {
            // Закрываем меню только на мобильных устройствах
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    menuToggle.click();
                }, 100);
            }
        };
    });
    
    // Закрытие меню при клике вне меню
    document.onclick = function(e) {
        // Проверяем, что меню открыто и клик был не по меню и не по кнопке
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            // Закрываем меню
            menuToggle.click();
        }
    };
    
    // Закрытие меню при изменении ориентации устройства
    window.addEventListener('orientationchange', function() {
        if (nav.classList.contains('active')) {
            setTimeout(() => {
                menuToggle.click();
            }, 100);
        }
    });
    
    // Добавляем тактильную обратную связь для ссылок в меню
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });
        
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });
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

