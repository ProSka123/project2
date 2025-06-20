/**
 * Файл для обработки мобильного меню на всех страницах сайта
 * Создан для обеспечения единообразной работы меню на всех страницах
 */

// Улучшенная функция инициализации мобильного меню
function initMobileMenu() {
    // Получаем элементы меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Проверяем, существуют ли эти элементы
    if (!menuToggle || !nav) {
        console.warn('Элементы мобильного меню не найдены');
        return;
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
        
        // Сохраняем позицию прокрутки при открытии меню
        if (document.body.classList.contains('menu-open')) {
            document.body.dataset.scrollY = window.scrollY;
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            // Восстанавливаем позицию прокрутки при закрытии меню
            const scrollY = document.body.dataset.scrollY || 0;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0'));
        }
        
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
            
            // Восстанавливаем прокрутку
            const scrollY = document.body.dataset.scrollY || 0;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0'));
            
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
            
            // Восстанавливаем прокрутку
            const scrollY = document.body.dataset.scrollY || 0;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0'));
            
            // Возвращаем иконку гамбургера
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    };
}

// Функция для добавления разделителей между секциями
function addMobileSectionDividers() {
    // Проверяем, что мы на мобильном устройстве
    if (window.innerWidth > 767) return;
    
    // Находим все секции на странице
    const sections = document.querySelectorAll('section');
    
    // Проходим по всем секциям, начиная со второй (индекс 1)
    for (let i = 1; i < sections.length; i++) {
        // Пропускаем секцию отзывов
        if (sections[i].id === 'reviews') continue;
        
        // Создаем разделитель
        const divider = document.createElement('div');
        divider.className = 'mobile-section-divider';
        
        // Вставляем разделитель перед текущей секцией
        sections[i].parentNode.insertBefore(divider, sections[i]);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на мобильном устройстве
    if (window.innerWidth <= 767) {
        // Инициализируем мобильное меню
        initMobileMenu();
        
        // Добавляем разделители между секциями
        addMobileSectionDividers();
        
        // Оптимизируем hero секцию
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.minHeight = '100vh';
            
            // Центрируем контент по вертикали
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.minHeight = '100vh';
                heroContent.style.display = 'flex';
                heroContent.style.flexDirection = 'column';
                heroContent.style.justifyContent = 'center';
                heroContent.style.alignItems = 'center';
                heroContent.style.padding = '0 20px';
            }
            
            // Оптимизируем кнопку
            const primaryButton = heroContent?.querySelector('.primary-button');
            if (primaryButton) {
                primaryButton.style.width = '100%';
                primaryButton.style.maxWidth = '300px';
                primaryButton.style.padding = '15px 24px';
                primaryButton.style.fontSize = '17px';
                primaryButton.style.fontWeight = '600';
                primaryButton.style.boxShadow = '0 4px 10px rgba(74, 144, 226, 0.25)';
            }
        }
    }
});

// Повторная инициализация при изменении размера окна
window.addEventListener('resize', function() {
    // Проверяем, изменился ли тип устройства
    const wasMobile = document.body.classList.contains('mobile-device');
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile !== wasMobile) {
        // Если тип устройства изменился, перезагружаем страницу
        location.reload();
    }

