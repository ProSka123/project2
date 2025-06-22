// Управление header при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    // Проверяем, находимся ли мы на главной секции (hero)
    function isOnHeroSection() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return false;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const currentScroll = window.pageYOffset + window.innerHeight;
        
        return currentScroll <= heroBottom;
    }
    
    // Обработчик прокрутки
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isOnHero = isOnHeroSection();
        
        if (isOnHero) {
            // На главной секции - скрываем header
            header.classList.add('header-hidden');
            header.classList.remove('header-visible', 'scrolled');
        } else {
            // Не на главной секции - показываем header
            header.classList.remove('header-hidden');
            header.classList.add('header-visible', 'scrolled');
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    // Добавляем обработчик прокрутки с throttling для производительности
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Вызываем функцию при загрузке для установки начального состояния
    handleScroll();
    
    // Обработчик для показа header при наведении мыши (только на десктопе)
    if (window.innerWidth > 768) {
        header.addEventListener('mouseenter', function() {
            if (header.classList.contains('header-hidden')) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
            }
        });
    }
}); 